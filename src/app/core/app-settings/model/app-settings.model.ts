export enum SettingsType {
  INITIAL,
  SAVED
}

export interface AppSettings {
  serverBaseUrl: string;
  tokenRefreshMillis: number;
  dashboardRefreshMillis: number;
  darkMode: boolean;
  type: SettingsType;
}
