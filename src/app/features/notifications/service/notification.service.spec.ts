import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationService } from './notification.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ErrorResponseService } from '../../../shared/services/error-response.service';
import { mdiAlert, mdiCheck } from '@mdi/js';
import {AppSettingsState} from "../../../core/app-settings/+state/app-settings.state";

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;
  let toastService: ToastService;
  let errorResponseService: ErrorResponseService;
  let appState: AppSettingsState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService, ToastService, ErrorResponseService]
    }).compileComponents();

    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService);
    errorResponseService = TestBed.inject(ErrorResponseService);
    appState = TestBed.inject(AppSettingsState);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return notifications on success', async () => {
    const mockNotifications = [{ id: 1, message: 'Test Notification' }];
    const userId = 1;

    const promise = service.getNotifications(userId);

    const req = httpMock.expectOne(`${appState.baseUrl()}/notifications/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNotifications, {status: 200, statusText: "OK"});

    const notifications = await promise;
    expect(notifications).toEqual(mockNotifications);
  });

  it('should show error toast on failure', async () => {
    const userId = 1;
    jest.spyOn(toastService, 'show');

    const promise = service.getNotifications(userId);

    const req = httpMock.expectOne(`${appState.baseUrl()}/notifications/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    const notifications = await promise;
    expect(notifications).toEqual([]);
    expect(toastService.show).toHaveBeenCalledWith({
      classname: 'bg-danger text-light',
      header: 'Could not load notifications',
      body: 'INTERNAL SERVER ERROR',
      icon: mdiAlert,
      iconColor: 'white'
    });
  });

  it('should successfully set read notification', async () => {
    const mockNotification = { id: 1, message: 'Test Notification', read: true, readAt: new Date()};
    const notificationId = 1;

    const promise = service.readNotification(notificationId);

    const req = httpMock.expectOne(`${appState.baseUrl()}/notifications/read/${notificationId}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockNotification, {status: 200, statusText: "OK"});

    const notifications = await promise;
    expect(notifications).toEqual(mockNotification);
  });

  it('should handle error on read notification', async () => {
    const notificationId = 1;
    jest.spyOn(toastService, 'show');
    const expectedToast = {classname: "bg-danger text-light", header: 'Could set status read',
      body: `INTERNAL SERVER ERROR`, icon: mdiAlert, iconColor: "white"};

    const promise = service.readNotification(notificationId);

    const req = httpMock.expectOne(`${appState.baseUrl()}/notifications/read/${notificationId}`);
    expect(req.request.method).toBe('POST');
    req.flush(null, { status: 500, statusText: 'Server Error' });

    await expect(promise).rejects.toEqual(new Error('Could not set read on notification'));
    expect(toastService.show).toHaveBeenCalledWith(expectedToast);
  });


  it('should show success toast on delete success', async () => {
    const userId = 1;
    jest.spyOn(toastService, 'show');

    const promise = service.sendDeleteNotification(userId);

    const req = httpMock.expectOne(`${appState.baseUrl()}/notifications/user/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}, {status: 200, statusText: 'OK'});

    await promise;
    expect(toastService.show).toHaveBeenCalledWith({
      classname: 'bg-success text-light',
      header: '',
      body: 'Deleted all notifications successfully',
      icon: mdiCheck,
      iconColor: 'white'
    });
  });

  it('should show error toast on delete failure', async () => {
    const userId = 1;
    jest.spyOn(toastService, 'show');
    jest.spyOn(errorResponseService, 'getHttpErrorResponseTextByStatus').mockReturnValue('Error');

    const promise = service.sendDeleteNotification(userId);

    const req = httpMock.expectOne(`${appState.baseUrl()}/notifications/user/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    await promise.catch(e => e); // Handle the rejection to avoid unhandled promise rejection

    expect(toastService.show).toHaveBeenCalledWith({
      classname: 'bg-danger text-light',
      header: 'Could not delete notifications',
      body: 'Error',
      icon: mdiAlert,
      iconColor: 'white'
    });
  });
});
