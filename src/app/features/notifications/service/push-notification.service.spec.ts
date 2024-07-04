import { PushNotificationService } from './push-notification.service';
import { of } from 'rxjs';
import {fakeAsync,TestBed} from "@angular/core/testing";
import {SwPush} from "@angular/service-worker";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AppSettingsState} from "../../../core/app-settings/+state/app-settings.state";
import {ToastService} from "../../../shared/components/toast/toast.service";
import {AuthState} from "../../../core/auth/+state/auth.state";
import {mdiAlert, mdiCheck} from "@mdi/js";
import {MockProvider} from "ng-mocks";

// Mocks
class MockSwPush {
  subscription = of(null);
  isEnabled = true;
  requestSubscription() {
    return Promise.resolve({ endpoint: 'dummy-endpoint' });
  }
  messages = of({});
}

class MockAppSettingsState {
  baseUrl() {
    return 'http://dummy-url';
  }
}

class MockAuthState {
  user() {
    return { id: 'dummy-user-id' };
  }
}

describe('PushNotificationService', () => {
  let service: PushNotificationService;
  let httpClient: HttpTestingController;
  let settingsState: MockAppSettingsState;
  let authState: MockAuthState;
  let toastService: ToastService;
  let swPush: MockSwPush;

    beforeEach(() => {
    swPush = new MockSwPush();
    authState = new MockAuthState();
    settingsState  = new MockAppSettingsState();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockProvider(MockSwPush),
        MockProvider(MockAppSettingsState),
        MockProvider(MockAuthState),
        { provide: SwPush, useValue: swPush },
        { provide: AppSettingsState, useValue: settingsState },
        { provide: AuthState, useValue: authState }
      ]
    }).compileComponents();

    service = TestBed.inject(PushNotificationService);
    swPush = TestBed.inject(MockSwPush);
    httpClient = TestBed.inject(HttpTestingController);
    settingsState = TestBed.inject(MockAppSettingsState);
    toastService = TestBed.inject(ToastService);
    authState = TestBed.inject(MockAuthState);
  });

  it('should create PushNotificationService', () => {
    expect(service).toBeTruthy();
  });

  describe('subscribeToNotifications', () => {
    it('should subscribe to notifications if not activated', fakeAsync( async () => {
      const getVapidPublicKeySpy = jest.spyOn(service, 'getVapidPublicKey').mockResolvedValue(undefined);
      jest.spyOn(swPush, 'requestSubscription').mockResolvedValue({} as any);
      const sendSubscriptionToServerSpy = jest.spyOn(service, 'sendSubscriptionToServer').mockResolvedValue('dummy-response' as string);

      await service.subscribeToNotifications();

      expect(getVapidPublicKeySpy).toHaveBeenCalled();
      expect(sendSubscriptionToServerSpy).toHaveBeenCalled();
    }));

    it('should not subscribe if already activated', async () => {
      service['activatedPush'].set(true);

      const getVapidPublicKeySpy = jest.spyOn(service, 'getVapidPublicKey').mockResolvedValue(undefined);
      const requestSubscriptionSpy = jest.spyOn(swPush, 'requestSubscription').mockResolvedValue({} as any);
      const sendSubscriptionToServerSpy = jest.spyOn(service, 'sendSubscriptionToServer').mockResolvedValue('dummy-response' as any);
      const showSuccessSpy = jest.spyOn(service as any, 'showSuccess');

      await service.subscribeToNotifications();

      expect(getVapidPublicKeySpy).not.toHaveBeenCalled();
      expect(requestSubscriptionSpy).not.toHaveBeenCalled();
      expect(sendSubscriptionToServerSpy).not.toHaveBeenCalled();
      expect(showSuccessSpy).not.toHaveBeenCalled();
    });

    it('should handle errors during subscription', async () => {
      const error = new Error('Subscription failed');
      jest.spyOn(service, 'getVapidPublicKey').mockRejectedValue(error);
      const showErrorSpy = jest.spyOn(service as any, 'showError');

      await service.subscribeToNotifications();

      expect(showErrorSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('sendSubscriptionToServer', () => {
    it('should send subscription to server', async () => {
      const sub = { endpoint: 'dummy-endpoint' } as any;

      const promise = service.sendSubscriptionToServer(sub);
      const req = httpClient.expectOne('http://dummy-url/notifications/subscribe/dummy-user-id');
      expect(req.request.method).toBe("POST");
      req.flush("OK", {status: 200, statusText: "OK"});

      const result = await promise

      expect(result).toEqual("OK");
    });
  });

  describe('getVapidPublicKey', () => {
    it('should get VAPID public key', async () => {

      const promise = service.getVapidPublicKey();
      const req = httpClient.expectOne('http://dummy-url/notifications/vapidPublicKey');
      expect(req.request.method).toEqual("GET");
      req.flush("dummy-vapid-key", {status: 200, statusText: "OK"});

      await promise;

      expect(service['vapidPublicKey']).toEqual('dummy-vapid-key');
    });
  });

  describe('showError', () => {
    it('should show error toast', () => {
      const toastSpy = jest.spyOn(toastService, 'show');
      const error = new Error('Test error');
      const expectedErrorToast = {classname: "bg-danger text-light", header: 'Could not subscribe to push notifications',
        body: `Test error`, icon: mdiAlert, iconColor: "white"};

      service['showError'](error);

      expect(toastSpy).toHaveBeenCalled();
      expect(toastSpy).toHaveBeenCalledWith(expectedErrorToast);
    });
  });

  describe('showSuccess', () => {
    it('should show success toast', () => {
      const toastSpy = jest.spyOn(toastService, 'show');
      const successToast = {classname: "bg-success text-light", icon: mdiCheck, header: '',
        body: `Successfully subscribed to push notifications`, iconColor: "white"};

      service['showSuccess']();

      expect(toastSpy).toHaveBeenCalled();
      expect(toastSpy).toHaveBeenCalledWith(successToast);
    });
  });
});
