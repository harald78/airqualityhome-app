import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { RegisterBaseComponent } from './register-base.component';
import {RegisterBaseService} from "../../service/register-base.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {availableSensorBaseMock} from "../../../../../../mock/sensor-base.mock";
import {activeRegisterRequest, canceledRegisterRequest} from "../../../../../../mock/register-request.mock";
import {AuthState} from "../../../../core/auth/+state/auth.state";
import {userMock} from "../../../../../../mock/user-mock";
import {RegisterModalComponent} from "../register-modal/register-modal.component";
import {ConfirmModalComponent} from "../../../../shared/components/confirm-modal/confirm-modal.component";
import { Router, RouterModule } from '@angular/router';
import { NgZone } from '@angular/core';
import { routes } from '../../../../app.routes';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { mdiCheck } from '@mdi/js';

describe('RegisterBaseComponent', () => {
  let component: RegisterBaseComponent;
  let fixture: ComponentFixture<RegisterBaseComponent>;
  let registerBaseService: RegisterBaseService;
  let modalService: NgbModal;
  let authState: AuthState;
  let router: Router;
  let ngZone: NgZone;
  let toastService: ToastService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBaseComponent, HttpClientTestingModule, RouterModule.forRoot(routes)],
      providers: [RegisterBaseService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBaseComponent);
    registerBaseService = TestBed.inject(RegisterBaseService);
    modalService = TestBed.inject(NgbModal);
    authState = TestBed.inject(AuthState);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    toastService = TestBed.inject(ToastService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set undefined at ngOnInit', fakeAsync(async () => {
    jest.spyOn(registerBaseService, 'getActiveRegistrationsByUser').mockResolvedValue(undefined);

    await fixture.componentInstance.ngOnInit();

    expect(component.activeRequest()).toBeUndefined();
  }));

  it('should handle register request correctly', async () => {
    const modalRef = {
      componentInstance: { name: '' },
      result: Promise.resolve('Test Location')
    };
    await authState.setUser(userMock);
    jest.spyOn(modalService, 'open').mockReturnValue(modalRef as NgbModalRef);
    jest.spyOn(registerBaseService, 'sendRegisterRequest')
      .mockReturnValue(Promise.resolve(activeRegisterRequest));
    jest.spyOn(toastService, 'show');
    const expectedToast = {classname: "bg-success text-light", header: '',
      body: "Created register request successfully", icon: mdiCheck, iconColor: "white"};
    const sensorBase = availableSensorBaseMock[0];
    const activeRequestSpy = jest.spyOn(component.activeRequest, 'set');

    await component.openModal(sensorBase);

    expect(modalService.open).toHaveBeenCalledWith(RegisterModalComponent);
    expect(modalRef.componentInstance.name).toEqual(sensorBase.name);

    expect(registerBaseService.sendRegisterRequest).toHaveBeenCalledWith({
      location: "Test Location",
      sensorBaseId: sensorBase.id,
      userId: authState.user().id
    });

    expect(activeRequestSpy).toHaveBeenCalledWith(activeRegisterRequest);
    expect(toastService.show).toHaveBeenCalledWith(expectedToast);
  });

  it('should handle dismiss request correctly', async () => {
    const modalRef = {
      componentInstance: { name: '' },
      result: Promise.resolve(null)
    };
    await authState.setUser(userMock);
    jest.spyOn(modalService, 'open').mockReturnValue(modalRef as NgbModalRef);
    jest.spyOn(registerBaseService, 'sendRegisterRequest');
    const sensorBase = availableSensorBaseMock[0];
    const activeRequestSpy = jest.spyOn(component.activeRequest, 'set');

    await component.openModal(sensorBase);

    expect(modalService.open).toHaveBeenCalledWith(RegisterModalComponent);
    expect(modalRef.componentInstance.name).toEqual(sensorBase.name);

    expect(registerBaseService.sendRegisterRequest).not.toHaveBeenCalled();
    expect(activeRequestSpy).not.toHaveBeenCalled();
  });

  it('should handle cancel request correctly', async () => {
    const modalRef = {
      componentInstance: { message: 'Do you really want to cancel this registration?' },
      result: Promise.resolve(true)
    };
    await authState.setUser(userMock);
    jest.spyOn(modalService, 'open').mockReturnValue(modalRef as NgbModalRef);
    jest.spyOn(registerBaseService, 'cancelRegisterRequest')
      .mockReturnValue(Promise.resolve(canceledRegisterRequest));
    jest.spyOn(toastService, 'show');
    const expectedToast = {classname: "bg-success text-light", header: '',
      body: "Canceled register request successfully", icon: mdiCheck, iconColor: "white"};
    const sensorBase = availableSensorBaseMock[0];
    const activeRequestSpy = jest.spyOn(component.activeRequest, 'set');

    await component.cancelRequest(sensorBase);

    expect(modalService.open).toHaveBeenCalledWith(ConfirmModalComponent);
    expect(modalRef.componentInstance.message).toEqual('Do you really want to cancel this registration?');

    expect(registerBaseService.cancelRegisterRequest).toHaveBeenCalledWith({
      location: "",
      sensorBaseId: sensorBase.id,
      userId: authState.user().id
    });

    expect(activeRequestSpy).toHaveBeenCalledWith(canceledRegisterRequest);
    expect(toastService.show).toHaveBeenCalledWith(expectedToast);
  });

  it('should handle dismiss cancel request correctly', async () => {
    const modalRef = {
      componentInstance: { message: 'Do you really want to cancel this registration?' },
      result: Promise.resolve(false)
    };
    await authState.setUser(userMock);
    jest.spyOn(modalService, 'open').mockReturnValue(modalRef as NgbModalRef);
    jest.spyOn(registerBaseService, 'cancelRegisterRequest');
    const sensorBase = availableSensorBaseMock[0];
    const activeRequestSpy = jest.spyOn(component.activeRequest, 'set');

    await component.cancelRequest(sensorBase);

    expect(modalService.open).toHaveBeenCalledWith(ConfirmModalComponent);
    expect(modalRef.componentInstance.message).toEqual('Do you really want to cancel this registration?');

    expect(registerBaseService.cancelRegisterRequest).not.toHaveBeenCalled();

    expect(activeRequestSpy).not.toHaveBeenCalled();
  });

  it('should navigate back to settings section', async () => {
    // given
    jest.spyOn(router, 'navigate');

    // when
    await ngZone.run(async () => component.navigateBack());

    // then
    expect(router.navigate).toHaveBeenCalledWith(['/settings']);
  });

});
