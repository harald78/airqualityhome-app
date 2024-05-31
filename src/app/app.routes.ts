import { Routes } from '@angular/router';
import {DashboardHomeComponent} from "./features/dashboard/ui/dashboard-home/dashboard-home.component";
import {NotificationsHomeComponent} from "./features/notifications/ui/notifications-home/notifications-home.component";
import {AccountHomeComponent} from "./features/account/ui/account-home/account-home.component";
import {SettingsHomeComponent} from "./features/settings/ui/settings-home/settings-home.component";
import {isAuthenticated} from "./core/guards/auth.guard";
import {LoginComponent} from "./features/login/ui/login.component";
import {RegisterBaseComponent} from "./features/settings/ui/register-base/register-base.component";

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardHomeComponent, canActivate: [isAuthenticated]},
  {path: 'notifications', component: NotificationsHomeComponent, canActivate: [isAuthenticated]},
  {path: 'account', component: AccountHomeComponent, canActivate: [isAuthenticated]},
  {path: 'settings', component: SettingsHomeComponent, canActivate: [isAuthenticated]},
  {path: 'register', component: RegisterBaseComponent, canActivate: [isAuthenticated]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/'}
];
