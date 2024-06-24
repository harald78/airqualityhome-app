import { Component, inject } from '@angular/core';
import {IconComponent} from "../../icon/icon/icon.component";
import { Router, RouterModule } from '@angular/router';
import {mdiAccount, mdiBell, mdiCog, mdiTabletDashboard} from '@mdi/js';
import {AuthState} from "../../../../core/auth/+state/auth.state";
import {NetworkStatusService} from "../../../../core/offline/service/network-status.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    IconComponent,
    RouterModule,
    AsyncPipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  readonly authState = inject(AuthState);
  readonly router = inject(Router);
  private readonly networkService: NetworkStatusService = inject(NetworkStatusService);
  online$: Observable<boolean>;

  iconDashboard: string = mdiTabletDashboard;
  iconNotification: string = mdiBell;
  iconAccount: string = mdiAccount;
  iconSettings: string = mdiCog;

  constructor() {
    this.networkService.checkNetworkStatus();
    this.online$ = this.networkService.networkStatus$;
  }

}
