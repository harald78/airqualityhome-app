import { Routes } from '@angular/router';
import {DashboardHomeComponent} from "./features/dashboard/ui/dashboard-home/dashboard-home.component";
import {NotificationsHomeComponent} from "./features/notifications/ui/notifications-home/notifications-home.component";
import {AccountHomeComponent} from "./features/account/ui/account-home/account-home.component";
import {SettingsHomeComponent} from "./features/settings/ui/settings-home/settings-home.component";

export const routes: Routes = [
  {path: '', component: DashboardHomeComponent, canActivate: [() => true]},
  {path: 'notifications', component: NotificationsHomeComponent, canActivate: [() => true]},
  {path: 'account', component: AccountHomeComponent, canActivate: [() => true]},
  {path: 'settings', component: SettingsHomeComponent, canActivate: [() => true]},
  // {path: 'ui', component: LoginComponent},
  {path: '**', redirectTo: '/'}
];
