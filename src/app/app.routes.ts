import { Routes } from '@angular/router';
import {isAuthenticated} from "./core/guards/auth.guard";
import {LoginComponent} from "./features/login/ui/login.component";
import {RegisterBaseComponent} from "./features/settings/ui/register-base/register-base.component";
import { ChangeAccountComponent } from './features/account/ui/change-account/change-account.component';
import { ChangePasswordComponent } from './features/account/ui/change-password/change-password.component';
import { SensorsOverviewComponent } from './features/settings/ui/sensors-overview/sensors-overview.component';
import { SensorSettingsComponent } from './features/settings/ui/sensor-settings/sensor-settings.component';
import {DashboardOverviewComponent} from "./features/dashboard/ui/dashboard-overview/dashboard-overview.component";
import {DashboardDetailComponent} from "./features/dashboard/ui/dashboard-detail/dashboard-detail.component";

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/ui/dashboard-home/dashboard-home.component')
      .then(m => m.DashboardHomeComponent), canActivate: [isAuthenticated], children: [
      {path: "", component: DashboardOverviewComponent, canActivate: [isAuthenticated]},
      {path: "sensor/:id", component: DashboardDetailComponent, canActivate: [isAuthenticated]},
    ]},
  { path: 'notifications', loadComponent: () => import('./features/notifications/ui/notifications-home/notifications-home.component')
      .then(m => m.NotificationsHomeComponent), canActivate: [isAuthenticated] },
  { path: 'account', loadComponent: () => import('./features/account/ui/account-home/account-home.component')
      .then(m => m.AccountHomeComponent), canActivate: [isAuthenticated], children: [
      {path: '', component: ChangeAccountComponent, canActivate: [isAuthenticated] },
      {path: 'change-pw', component: ChangePasswordComponent, canActivate: [isAuthenticated] },
    ]},
  { path: 'settings', loadComponent: () => import('./features/settings/ui/settings-home/settings-home.component')
      .then(m => m.SettingsHomeComponent), canActivate: [isAuthenticated], children: [
      {path: '', component: SensorsOverviewComponent, canActivate: [isAuthenticated] },
      {path: 'sensor/:id', component: SensorSettingsComponent, canActivate: [isAuthenticated] },
    {path: 'register', component: RegisterBaseComponent, canActivate: [isAuthenticated] },
    ]},
  { path: 'login', component: LoginComponent },
  { path: 'general-settings', loadComponent: () => import('./core/app-settings/ui/app-settings/app-settings.component')
      .then(m => m.AppSettingsComponent) },
  { path: '**', redirectTo: 'dashboard' }
];
