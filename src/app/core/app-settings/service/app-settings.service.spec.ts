import { TestBed } from '@angular/core/testing';
import { AppSettingsService } from './app-settings.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { APP_SETTINGS_KEY, AppSettings, SettingsType } from '../model/app-settings.model';
import { INITIAL_SETTINGS } from '../+state/app-settings.state';
import { mdiCheck } from '@mdi/js';

describe('AppSettingsService', () => {
  let service: AppSettingsService;
  let toastService: ToastService;

  beforeEach(() => {
    const toastServiceMock = {
      show: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AppSettingsService,
        { provide: ToastService, useValue: toastServiceMock }
      ]
    });

    service = TestBed.inject(AppSettingsService);
    toastService = TestBed.inject(ToastService);

    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');
  });

  afterEach(() => {
    localStorage.removeItem(APP_SETTINGS_KEY);
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save settings to localStorage and show success toast', () => {
    const mockSettings: AppSettings = {
      host: 'localhost',
      port: 8080,
      api: '/api/v1',
      https: true,
      tokenRefreshInterval: 3600,
      dashboardRefreshInterval: 600,
      darkMode: true,
      type: SettingsType.CUSTOM
    };

    service.saveSettingsToLocalStorage(mockSettings);

    expect(localStorage.setItem).toHaveBeenCalledWith(APP_SETTINGS_KEY, JSON.stringify(mockSettings));
    expect(toastService.show).toHaveBeenCalledWith({
      classname: "bg-success text-light",
      header: '',
      id: "settings-success",
      body: "Saved app settings successfully",
      icon: mdiCheck,
      iconColor: "white"
    });
  });

  it('should load settings from localStorage and show warning toast if initial settings are used', () => {
    localStorage.getItem = jest.fn().mockReturnValueOnce(JSON.stringify(INITIAL_SETTINGS));
    const loadedSettings = service.loadAppSettings();

    expect(loadedSettings).toEqual(INITIAL_SETTINGS);
    expect(toastService.show).toHaveBeenCalledWith({
      classname: "bg-warning text-light",
      header: '',
      id: "settings-warning",
      body: "No custom settings saved. Use initial settings",
      icon: mdiCheck,
      iconColor: "white"
    });
  });

  it('should load settings from localStorage without showing warning toast if custom settings are used', () => {
    const customSettings: AppSettings = {
      host: 'localhost',
      port: 8080,
      api: '/api/v1',
      https: true,
      tokenRefreshInterval: 3600,
      dashboardRefreshInterval: 600,
      darkMode: true,
      type: SettingsType.CUSTOM
    };

    // Simuliere das Speichern der benutzerdefinierten Einstellungen
    service.saveSettingsToLocalStorage(customSettings);

    // Mock die getItem-Methode, um die gespeicherten benutzerdefinierten Einstellungen zurückzugeben
    localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify(customSettings));
    const loadedSettings = service.loadAppSettings();

    expect(loadedSettings).toEqual(customSettings);
    expect(toastService.show).not.toHaveBeenCalledWith({
      classname: "bg-warning text-light",
      header: '',
      id: "settings-warning",
      body: "No custom settings saved. Use initial settings",
      icon: mdiCheck,
      iconColor: "white"
    });
  });

  it('should delete settings from localStorage and show success toast', () => {
    service.deleteLocalStoredSettings();

    expect(localStorage.removeItem).toHaveBeenCalledWith(APP_SETTINGS_KEY);
    expect(toastService.show).toHaveBeenCalledWith({
      classname: "bg-success text-light",
      header: '',
      id: "settings-success",
      body: "Restored settings successfully",
      icon: mdiCheck,
      iconColor: "white"
    });
  });
});
