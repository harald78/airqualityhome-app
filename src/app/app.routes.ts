import { Routes } from '@angular/router';
import {DashboardHomeComponent} from "./features/dashboard/ui/dashboard-home/dashboard-home.component";
import {NotificationsHomeComponent} from "./features/notifications/ui/notifications-home/notifications-home.component";
import {AccountHomeComponent} from "./features/account/ui/account-home/account-home.component";
import {SettingsHomeComponent} from "./features/settings/ui/settings-home/settings-home.component";
import {isAuthenticated} from "./core/guards/auth.guard";
import {LoginComponent} from "./features/login/ui/login.component";
import {RegisterBaseComponent} from "./features/settings/ui/register-base/register-base.component";
import { ChangeAccountComponent } from './features/account/ui/change-account/change-account.component';
import { ChangePasswordComponent } from './features/account/ui/change-password/change-password.component';
import { SensorSettingsComponent } from './features/settings/ui/sensor-settings/sensor-settings.component';
import {DashboardOverviewComponent} from "./features/dashboard/ui/dashboard-overview/dashboard-overview.component";
import {DashboardDetailComponent} from "./features/dashboard/ui/dashboard-detail/dashboard-detail.component";

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardHomeComponent, canActivate: [isAuthenticated], children: [
      {path: "", component: DashboardOverviewComponent, canActivate: [isAuthenticated]},
      {path: "sensor/:id", component: DashboardDetailComponent, canActivate: [isAuthenticated]},
    ]},
  { path: 'notifications', component: NotificationsHomeComponent, canActivate: [isAuthenticated] },
  { path: 'account', component: AccountHomeComponent, canActivate: [isAuthenticated], children: [
      {path: '', component: ChangeAccountComponent, canActivate: [isAuthenticated] },
      {path: 'change-pw', component: ChangePasswordComponent, canActivate: [isAuthenticated] },
    ]},
  { path: 'settings', component: SettingsHomeComponent, canActivate: [isAuthenticated], children: [
    {path: '', component: SensorSettingsComponent, canActivate: [isAuthenticated] },
    {path: 'register', component: RegisterBaseComponent, canActivate: [isAuthenticated] },
    ]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard' }
];
