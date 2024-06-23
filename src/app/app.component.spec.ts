import {fakeAsync, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import {AuthService} from "./core/auth/service/auth.service";
import { routesMock } from '../../mock/routes.mock';
import {SwUpdate} from "@angular/service-worker";


describe('AppComponent', () => {
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot(routesMock)],
      providers: [MockProvider(ActivatedRoute), MockProvider(AuthService), MockProvider(SwUpdate)]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'AirQuality@Home' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('AirQuality@Home');
  });

  it('should call loadUserProfile onInit', fakeAsync(async () => {
    const authServiceSpy = jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(undefined);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(authServiceSpy).toHaveBeenCalled();
  }));
});
