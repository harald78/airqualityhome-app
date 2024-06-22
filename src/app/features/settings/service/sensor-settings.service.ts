import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Toast, ToastService } from "../../../shared/components/toast/toast.service";
import { AuthState } from "../../../core/auth/+state/auth.state";
import { ErrorResponseService } from "../../../shared/services/error-response.service";
import {firstValueFrom, of, tap} from "rxjs";
import { catchError } from "rxjs/operators";
import { mdiAlert, mdiCheck } from "@mdi/js";
import { AppSettingsState } from "../../../core/app-settings/+state/app-settings.state";
import { Sensor, SENSOR_SETTINGS_KEY } from "../model/sensor.model";

@Injectable({
  providedIn: 'root'
})
export class SensorSettingsService {

  private readonly httpService = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly authState = inject(AuthState);
  private readonly errorStatusService = inject(ErrorResponseService);
  private readonly appSettingsState: AppSettingsState = inject(AppSettingsState);

  getAvailableSensors(): Promise<Sensor[]> {
    const userId = this.authState.user().id;
    return firstValueFrom(this.httpService.get<Sensor[]>(`${this.appSettingsState.baseUrl()}/settings/${userId}`)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = { classname: "bg-danger text-light", header: 'Could not load available sensors',
          id: "settings-error",
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white" };
        this.toastService.show(errorToast);
        return of([]);
      })));
  }

  saveSensorToServer(sensor: Sensor): Promise<Sensor> {
    return firstValueFrom(this.httpService.post<Sensor>(`${this.appSettingsState.baseUrl()}/settings/`, sensor)
      .pipe( tap(()=>{
          const successToast: Toast = { classname: "bg-success text-light", header: '',
            id: "settings-success",
            body: "Saved sensor settings successfully", icon: mdiCheck, iconColor: "white" };
          this.toastService.show(successToast);
      }),
        catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = { classname: "bg-danger text-light", header: 'Could not load available sensors',
          id: "settings-error",
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white" };
        this.toastService.show(errorToast);
        return of();
      })));

  }

}
