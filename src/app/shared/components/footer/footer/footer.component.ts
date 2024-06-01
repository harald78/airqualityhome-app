import {Component} from '@angular/core';
import {IconComponent} from "../../icon/icon/icon.component";
import {RouterLink} from "@angular/router";
import {mdiAccount, mdiBell, mdiCog, mdiTabletDashboard} from '@mdi/js';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    IconComponent,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  iconDashboard: string = mdiTabletDashboard;
  iconNotification: string = mdiBell;
  iconAccount: string = mdiAccount;
  iconSettings: string = mdiCog;
}
