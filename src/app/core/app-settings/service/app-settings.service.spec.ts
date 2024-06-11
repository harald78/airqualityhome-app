import { TestBed } from '@angular/core/testing';

import { AppSettingsService } from './app-settings.service';
import {Toast, ToastService} from "../../../shared/components/toast/toast.service";
import {APP_SETTINGS_KEY, AppSettings, SettingsType} from "../model/app-settings.model";
import {mdiCheck} from "@mdi/js";

describe('AppSettingsService', () => {
  let service: AppSettingsService;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({

    });
    service = TestBed.inject(AppSettingsService);
    toastService = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('save settings to local storage', () => {
    const settings: AppSettings = {
      host: 'any-host',
      port: 4200,
      api: '/api/app',
      https: false,
      tokenRefreshInterval: 1000 * 60 * 4.5,
      dashboardRefreshInterval: 1000 * 60,
      darkMode: false,
      type: SettingsType.CUSTOM
    };
    const expectedToast: Toast = {classname: "bg-success text-light", header: '',
      id: "settings-success",
      body: "Saved app settings successfully", icon: mdiCheck, iconColor: "white"};
    const expectedString = JSON.stringify(settings);
    const toastSpy = jest.spyOn(toastService, 'show');
    const storageSpy = jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.getItem = jest.fn();

    // when
    service.saveSettingsToLocalStorage(settings);

    // then
    expect(storageSpy).toHaveBeenCalledWith(APP_SETTINGS_KEY, expectedString);
    expect(toastSpy).toHaveBeenCalledWith(expectedToast);
  });
});
