import {Component, inject} from '@angular/core';
import {IconComponent} from "../../icon/icon/icon.component";
import {Router, RouterModule} from "@angular/router";
import {mdiAccount, mdiBell, mdiCog, mdiTabletDashboard} from '@mdi/js';
import {AuthState} from "../../../../core/auth/+state/auth.state";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    IconComponent,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  readonly authState = inject(AuthState);
  readonly router = inject(Router);

  iconDashboard: string = mdiTabletDashboard;
  iconNotification: string = mdiBell;
  iconAccount: string = mdiAccount;
  iconSettings: string = mdiCog;
}
