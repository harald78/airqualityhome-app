import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSettingsComponent } from './app-settings.component';
import { AppSettingsState } from '../../+state/app-settings.state';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router, RoutesRecognized} from '@angular/router';
import { AppSettings, SettingsType } from '../../model/app-settings.model';
import { signal, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';
import {DeepSignal} from "@ngrx/signals/src/deep-signal";

describe('AppSettingsComponent', () => {
  let component: AppSettingsComponent;
  let fixture: ComponentFixture<AppSettingsComponent>;
  let mockAppSettingsState: Partial<AppSettingsState>;
  let mockModalService: Partial<NgbModal>;
  let mockRouter: Partial<Router>;
  let eventsSubject: Subject<RoutesRecognized>;

  beforeEach(() => {
    const appSettingsSignal: WritableSignal<AppSettings> = signal({
      host: 'localhost',
      port: 8080,
      api: '/api/v1',
      https: true,
      tokenRefreshInterval: 3600,
      dashboardRefreshInterval: 600,
      darkMode: true,
      type: SettingsType.CUSTOM
    });

    mockAppSettingsState = {
      appSettings: appSettingsSignal as unknown as DeepSignal<AppSettings>,
      isCustomSetting: signal(true),
      saveAppSettings: jest.fn(),
      restoreDefaultSettings: jest.fn()
    };

    eventsSubject = new Subject<RoutesRecognized>();

    mockRouter = {
      navigateByUrl: jest.fn(),
      navigate: jest.fn(),
      events: eventsSubject.asObservable()
    };

    mockModalService = {
      open: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [AppSettingsComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AppSettingsState, useValue: mockAppSettingsState },
        { provide: Router, useValue: mockRouter },
        { provide: NgbModal, useValue: mockModalService }
      ]
    });

    fixture = TestBed.createComponent(AppSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    const settings = {
      host: 'localhost',
      port: 8080,
      api: '/api/v1',
      https: true,
      tokenRefreshInterval: 3.6,
      dashboardRefreshInterval: 0.6,
      darkMode: true
    };
    expect(component.appSettingsForm.value).toEqual(settings);
  });

  it('form should be valid when required fields are filled', () => {
    component.appSettingsForm.setValue({
      host: 'localhost',
      port: 8080,
      api: '/api/v1',
      https: true,
      tokenRefreshInterval: 3600,
      dashboardRefreshInterval: 600,
      darkMode: true
    });
    expect(component.appSettingsForm.valid).toBe(true);
  });

  it('should detect form value changes', () => {
    component.valueChange();

    component.appSettingsForm.setValue({
      host: 'localhost',
      port: 3000,
      api: '/api/v2',
      https: false,
      tokenRefreshInterval: 3600,
      dashboardRefreshInterval: 600,
      darkMode: false
    });

    component.valueChange();

    expect(component.buttonDisabled).toBe(false);
  });

  it('should save data correctly', async () => {
    component.appSettingsForm.setValue({
      host: 'localhost',
      port: 8080,
      api: '/api/v1',
      https: true,
      tokenRefreshInterval: 3600,
      dashboardRefreshInterval: 600,
      darkMode: true
    });

    await component.saveData();

    expect(mockAppSettingsState.saveAppSettings).toHaveBeenCalledWith({
      host: 'localhost',
      port: 8080,
      api: '/api/v1',
      https: true,
      tokenRefreshInterval: 3600000,
      dashboardRefreshInterval: 600000,
      darkMode: true,
      type: SettingsType.CUSTOM
    });
  });

  it('should handle error messages correctly', () => {
    component.appSettingsForm.setErrors({ 'invalid': true });
    expect(component.appSettingsForm.invalid).toBeTruthy();
  });

  it('should restore data correctly', async () => {
    (mockModalService.open as jest.Mock).mockReturnValue({
      componentInstance: {},
      result: Promise.resolve(true)
    });

    await component.restoreData();

    expect(mockAppSettingsState.restoreDefaultSettings).toHaveBeenCalled();
  });

  it('should navigate back correctly', () => {
    component.previousUrl = '/dashboard';
    component.navigateBack();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should navigate to login if no previous URL', () => {
    component.previousUrl = '';
    component.navigateBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  /*it('should set previousUrl correctly from router events', () => {
    eventsSubject.next(new RoutesRecognized(1, 'dummyUrl', 'dummyUrlAfter', {} as RouterStateSnapshot));
    fixture.detectChanges(); // This will trigger ngOnInit
    expect(component.previousUrl).toBe('dummyUrlAfter');
  });*/
});
