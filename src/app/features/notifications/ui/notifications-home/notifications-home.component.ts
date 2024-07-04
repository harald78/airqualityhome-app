import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {mdiTrashCanOutline} from '@mdi/js';
import {IconComponent} from "../../../../shared/components/icon/icon/icon.component";
import {NgClass, NgIf} from "@angular/common";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Notification} from "../../model/notification.model";
import {NotificationService} from "../../service/notification.service";
import {AuthState} from "../../../../core/auth/+state/auth.state";
import { NotificationTileComponent } from '../notification-tile/notification-tile.component';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import {PushNotificationService} from "../../service/push-notification.service";

@Component({
  selector: 'app-notifications-home',
  standalone: true,
  imports: [
    FormsModule,
    IconComponent,
    NgClass,
    DeleteModalComponent,
    NgIf,
    NotificationTileComponent,
    IconButtonComponent
  ],
  templateUrl: './notifications-home.component.html',
  styleUrl: './notifications-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsHomeComponent implements OnInit {

  protected readonly notificationService = inject(NotificationService);
  protected readonly trashIcon = mdiTrashCanOutline;
  private readonly modalService = inject(NgbModal);
  private readonly authState = inject(AuthState);
  private readonly pushService = inject(PushNotificationService);

  notifications: WritableSignal<Notification[]> = signal([]);

  async ngOnInit() {
    await this.loadNotifications();
    await this.subscribeToNotifications();
  }

  async readNotification(id: number): Promise<void> {
    const notification = await this.notificationService.readNotification(id);
    if (notification) {
      await this.loadNotifications();
    }
  }

  private async loadNotifications(): Promise<void> {
    const notifications = await this.notificationService.getNotifications(this.authState.user().id!);
    this.notifications.set(notifications);
  }


  async openDeleteModal() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.message = "Do you really want to delete all notifications?";
    await modalRef.result.then( async (result) => {
      if (result) {
        await this.notificationService.sendDeleteNotification(this.authState.user().id!);
        this.notifications.set([]);
      }
    });
  }

  async subscribeToNotifications() {
    await this.pushService.subscribeToNotifications();
  }
}


