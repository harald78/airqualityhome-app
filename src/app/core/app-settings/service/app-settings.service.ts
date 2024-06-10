import {inject, Injectable} from '@angular/core';
import {APP_SETTINGS_KEY, AppSettings, SettingsType} from "../model/app-settings.model";
import {Toast, ToastService} from "../../../shared/components/toast/toast.service";
import {mdiCheck} from "@mdi/js";
import {INITIAL_SETTINGS} from "../+state/app-settings.state";

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private readonly toastService: ToastService = inject(ToastService);

  constructor() { }

  saveSettingsToLocalStorage(appSettings: AppSettings): void {
    const serializedSettings = JSON.stringify(appSettings);
    localStorage.setItem(APP_SETTINGS_KEY, serializedSettings);
    const successToast: Toast = {classname: "bg-success text-light", header: '',
      body: "Saved app settings successfully", icon: mdiCheck, iconColor: "white"};
    this.toastService.show(successToast);
  }

  loadAppSettings(): AppSettings {
    const serializedSettings = localStorage.getItem(APP_SETTINGS_KEY) ?? JSON.stringify(INITIAL_SETTINGS);
    const deserializedSettings = JSON.parse(serializedSettings);
    if (deserializedSettings.type === SettingsType.INITIAL) {
      const warningToast: Toast = {classname: "bg-warning text-light", header: '',
        body: "No custom settings saved. Use initial settings", icon: mdiCheck, iconColor: "white"};
      this.toastService.show(warningToast);
    }
    return deserializedSettings;
  }

  deleteLocalStoredSettings(): void {
    localStorage.removeItem(APP_SETTINGS_KEY);
    const successToast: Toast = {classname: "bg-success text-light", header: '',
      body: "Restored settings successfully", icon: mdiCheck, iconColor: "white"};
    this.toastService.show(successToast);
  }

}
