import {AppSettings, SettingsType} from '../model/app-settings.model';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {AppSettingsService} from "../service/app-settings.service";
import {computed, inject} from "@angular/core";

export const INITIAL_SETTINGS: AppSettings = {
  host: 'localhost',
  port: 8080,
  api: '/api/app',
  https: false,
  tokenRefreshInterval: 1000 * 60 * 4.5,
  dashboardRefreshInterval: 1000 * 60,
  darkMode: false,
  type: SettingsType.INITIAL
}

export const AppSettingsState = signalStore(
  {providedIn: 'root'},
  withState({
    appSettings: INITIAL_SETTINGS,
  }),
  withMethods((store) => {
    const appSettingsService: AppSettingsService = inject(AppSettingsService);
    return {
      async loadAppSettings() {
        const appSettings = appSettingsService.loadAppSettings();
        patchState(store, {appSettings: appSettings});
      },
      async saveAppSettings(appSettings: AppSettings) {
        appSettingsService.saveSettingsToLocalStorage(appSettings);
        patchState(store, {appSettings: appSettings});
      },
      async restoreDefaultSettings() {
        appSettingsService.deleteLocalStoredSettings();
        patchState(store, {appSettings: INITIAL_SETTINGS});
      }
    }
  }),
  withComputed(({appSettings}) => ({
    isCustomSetting: computed(() => appSettings().type === SettingsType.CUSTOM)
  })),
  withHooks({
    onInit(store) {
      store.loadAppSettings();
    }})
);

export type AppSettingsState = InstanceType<typeof AppSettingsState>;
