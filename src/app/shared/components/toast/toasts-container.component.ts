import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from './toast.service';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { IconComponent } from '../icon/icon/icon.component';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet, IconComponent],
  template: `
		@for (toast of toastService.toast(); track toast) {
			<ngb-toast aria-label="aq-toast" [id]="toast.id"
				[class]="toast.classname"
				[autohide]="true"
        [header]="toast.header"
				[delay]="toast.delay || 5000"
				(hidden)="toastService.remove(toast)">
        @if(toast.icon) {
          <span><app-icon [path]="toast.icon" [color]="toast.iconColor"></app-icon>{{toast.body}}</span>
        } @else {
          <span>{{ toast.body }}</span>
        }
      </ngb-toast> }
	`,
  styles: [`
    :host {
      position: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 10px;
      z-index: 1200;
    }
    span > app-icon {
      margin-right: 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ToastsContainerComponent {
  toastService = inject(ToastService);
}
