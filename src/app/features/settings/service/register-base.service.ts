import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {SensorBase} from "../../../shared/model/sensor-base.model";
import {Toast, ToastService} from "../../../shared/components/toast/toast.service";
import {catchError} from "rxjs/operators";
import {mdiAlert} from "@mdi/js";
import {firstValueFrom, Observable, of, throwError} from "rxjs";
import {AuthState} from "../../../core/auth/+state/auth.state";
import {RegisterRequest} from "../model/register-request.model";
import {ErrorResponseService} from "../../../shared/services/error-response.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterBaseService {

  private readonly httpService = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly authState = inject(AuthState);
  private readonly errorStatusService = inject(ErrorResponseService);


  getAvailableSensorBases(): Observable<SensorBase[]> {
    return this.httpService.get<SensorBase[]>(`${environment.baseUrl}/register/sensorBase`)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not load available sensor bases',
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of([]);
      }));
  }

  getActiveRegistrationsByUser(): Promise<RegisterRequest | undefined> {
    const user = this.authState.user();
    return firstValueFrom(this.httpService.get<RegisterRequest | undefined>(`${environment.baseUrl}/register/requests/${user.id}`)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not load active registration requests',
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of(undefined);
      })));
  }

  sendRegisterRequest(registerRequest: RegisterRequest): Promise<RegisterRequest | undefined> {
    return firstValueFrom(this.httpService.post<RegisterRequest>(`${environment.baseUrl}/register/sensor`, registerRequest)
        .pipe(catchError(err => {
          const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
          const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could register sensor base',
            body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
          this.toastService.show(errorToast);
          return of(undefined);
        }))
      );
  }

  cancelRegisterRequest(registerRequest: RegisterRequest): Promise<RegisterRequest | undefined> {
    return firstValueFrom(this.httpService.post<RegisterRequest>(`${environment.baseUrl}/register/sensor/cancel`, registerRequest)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could register sensor base',
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of(undefined);
      }))
    );
  }
}
