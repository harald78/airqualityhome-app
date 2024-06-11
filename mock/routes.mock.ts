import { Routes } from '@angular/router';
import { DashboardHomeComponent } from '../src/app/features/dashboard/ui/dashboard-home/dashboard-home.component';
import { isAuthenticated } from '../src/app/core/guards/auth.guard';
import { DashboardOverviewComponent } from '../src/app/features/dashboard/ui/dashboard-overview/dashboard-overview.component';
import { NotificationsHomeComponent } from '../src/app/features/notifications/ui/notifications-home/notifications-home.component';
import { AccountHomeComponent } from '../src/app/features/account/ui/account-home/account-home.component';
import { ChangeAccountComponent } from '../src/app/features/account/ui/change-account/change-account.component';
import { ChangePasswordComponent } from '../src/app/features/account/ui/change-password/change-password.component';
import { SettingsHomeComponent } from '../src/app/features/settings/ui/settings-home/settings-home.component';
import { SensorSettingsComponent } from '../src/app/features/settings/ui/sensor-settings/sensor-settings.component';
import { RegisterBaseComponent } from '../src/app/features/settings/ui/register-base/register-base.component';
import { LoginComponent } from '../src/app/features/login/ui/login.component';
import { AppSettingsComponent } from '../src/app/core/app-settings/ui/app-settings/app-settings.component';
import { MockComponent } from 'ng-mocks';
import { DashBoardMockComponent } from './dummy.component';

export const routesMock: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MockComponent(DashboardHomeComponent), canActivate: [isAuthenticated], children: [
      {path: "", component: MockComponent(DashboardOverviewComponent), canActivate: [isAuthenticated]},
      {path: "sensor", component: MockComponent(DashBoardMockComponent), canActivate: [isAuthenticated]},
    ]},
  { path: 'notifications', component: MockComponent(NotificationsHomeComponent), canActivate: [isAuthenticated] },
  { path: 'account', component: MockComponent(AccountHomeComponent), canActivate: [isAuthenticated], children: [
      {path: '', component: MockComponent(ChangeAccountComponent), canActivate: [isAuthenticated] },
      {path: 'change-pw', component: MockComponent(ChangePasswordComponent), canActivate: [isAuthenticated] },
    ]},
  { path: 'settings', component: MockComponent(SettingsHomeComponent), canActivate: [isAuthenticated], children: [
      {path: '', component: MockComponent(SensorSettingsComponent), canActivate: [isAuthenticated] },
      {path: 'register', component: MockComponent(RegisterBaseComponent), canActivate: [isAuthenticated] },
    ]},
  { path: 'login', component: MockComponent(LoginComponent) },
  { path: 'general-settings', component: MockComponent(AppSettingsComponent) },
  { path: '**', redirectTo: 'dashboard' }
];
