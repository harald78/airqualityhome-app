import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { MockProvider } from 'ng-mocks';
import {AuthService} from "./core/auth/service/auth.service";
import { routesMock } from '../../mock/routes.mock';
import {SwUpdate} from "@angular/service-worker";
import {of} from "rxjs";


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let swUpdateMock: any;
  let originalLocation: Location;

  beforeEach(async () => {
    swUpdateMock = {
      isEnabled: true,
      versionUpdates: of({ type: 'VERSION_DETECTED' })
    };

    originalLocation = window.location;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    delete (window as any).location;
    (window as any).location = { reload: jest.fn() };
    (window as any).confirm = jest.fn();

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot(routesMock)],
      providers: [MockProvider(ActivatedRoute),
        MockProvider(AuthService),
        {provide: SwUpdate, useValue: swUpdateMock}]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'AirQuality@Home' title`, () => {
    expect(component.title).toEqual('AirQuality@Home');
  });

  it('should call loadUserProfile onInit', fakeAsync(async () => {
    const authServiceSpy = jest.spyOn(authService, 'tryRefresh').mockResolvedValue(undefined);
    const loadProfileSpy = jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(undefined);
    const startRefreshSpy = jest.spyOn(authService, 'setRefreshTimeout').mockResolvedValue(undefined);

    await component.ngOnInit();

    expect(authServiceSpy).toHaveBeenCalled();
    expect(loadProfileSpy).toHaveBeenCalled();
    expect(startRefreshSpy).toHaveBeenCalled();
  }));

  it('should reload the page when a new version is detected and confirmed', fakeAsync(() => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    component.ngOnInit();

    expect(window.confirm).toHaveBeenCalledWith('New version available. Load New Version?');
    expect(window.location.reload).toHaveBeenCalled();
  }));

  it('should not reload the page when the new version is detected but not confirmed', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    jest.spyOn(window.location, 'reload').mockImplementation(() => {});

    component.ngOnInit();

    expect(window.confirm).toHaveBeenCalledWith('New version available. Load New Version?');
    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it('should not subscribe to versionUpdates if swUpdate is not enabled', () => {
    swUpdateMock.isEnabled = false;
    const versionUpdatesSpy = jest.spyOn(swUpdateMock.versionUpdates, 'subscribe');

    component.ngOnInit();

    expect(versionUpdatesSpy).not.toHaveBeenCalled();
  });


});
