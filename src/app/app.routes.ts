import { Routes } from '@angular/router';
import {DashboardHomeComponent} from "./features/dashboard/ui/dashboard-home/dashboard-home.component";
import {NotificationsHomeComponent} from "./features/notifications/ui/notifications-home/notifications-home.component";
import {AccountHomeComponent} from "./features/account/ui/account-home/account-home.component";
import {SettingsHomeComponent} from "./features/settings/ui/settings-home/settings-home.component";

export const routes: Routes = [
  {path: '', component: DashboardHomeComponent},
  {path: 'notifications', component: NotificationsHomeComponent},
  {path: 'account', component: AccountHomeComponent},
  {path: 'settings', component: SettingsHomeComponent},
  {path: '**', redirectTo: '/'}
];
