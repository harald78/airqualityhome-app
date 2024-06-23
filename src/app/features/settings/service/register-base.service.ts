import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SensorBase} from "../model/sensor-base.model";
import {Toast, ToastService} from "../../../shared/components/toast/toast.service";
import {catchError} from "rxjs/operators";
import {mdiAlert} from "@mdi/js";
import {firstValueFrom, Observable, of} from "rxjs";
import {AuthState} from "../../../core/auth/+state/auth.state";
import {RegisterRequest} from "../model/register-request.model";
import {ErrorResponseService} from "../../../shared/services/error-response.service";
import {AppSettingsState} from "../../../core/app-settings/+state/app-settings.state";

@Injectable({
  providedIn: 'root'
})
export class RegisterBaseService {

  private readonly httpService = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly authState = inject(AuthState);
  private readonly errorStatusService = inject(ErrorResponseService);
  private readonly appSettingsState: AppSettingsState = inject(AppSettingsState);


  getAvailableSensorBases(): Observable<SensorBase[]> {
    return this.httpService.get<SensorBase[]>(`${this.appSettingsState.baseUrl()}/register/sensorBase`)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not load available sensor bases',
          id: "settings-error",
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of([]);
      }));
  }

  getActiveRegistrationsByUser(): Promise<RegisterRequest | undefined> {
    const user = this.authState.user();
    return firstValueFrom(this.httpService.get<RegisterRequest | undefined>(`${this.appSettingsState.baseUrl()}/register/requests/${user.id}`)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not load active registration requests',
          id: "settings-error",
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of(undefined);
      })));
  }

  sendRegisterRequest(registerRequest: RegisterRequest): Promise<RegisterRequest | undefined> {
    return firstValueFrom(this.httpService.post<RegisterRequest>(`${this.appSettingsState.baseUrl()}/register/sensor`, registerRequest)
        .pipe(catchError(err => {
          const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
          const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could register sensor base',
            id: "settings-error",
            body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
          this.toastService.show(errorToast);
          return of(undefined);
        }))
      );
  }

  cancelRegisterRequest(registerRequest: RegisterRequest): Promise<RegisterRequest | undefined> {
    return firstValueFrom(this.httpService.post<RegisterRequest>(`${this.appSettingsState.baseUrl()}/register/sensor/cancel`, registerRequest)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could register sensor base',
          id: "settings-error",
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of(undefined);
      }))
    );
  }
}
