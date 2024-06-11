import {FormControl} from "@angular/forms";

export enum SettingsType {
  INITIAL,
  CUSTOM
}

export interface AppSettings {
  host: string;
  port: number;
  api: string;
  https: boolean;
  tokenRefreshInterval: number;
  dashboardRefreshInterval: number;
  darkMode: boolean;
  type: SettingsType;
}

export interface AppSettingsForm {
  host: FormControl<string>;
  port: FormControl<number>;
  api: FormControl<string>;
  https: FormControl<boolean>;
  tokenRefreshInterval: FormControl<number>;
  dashboardRefreshInterval: FormControl<number>;
  darkMode: FormControl<boolean>;
}

export const APP_SETTINGS_KEY = 'app_settings';
