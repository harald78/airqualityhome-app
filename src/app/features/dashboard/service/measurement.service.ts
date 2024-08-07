import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Toast, ToastService } from '../../../shared/components/toast/toast.service';
import { AuthState } from '../../../core/auth/+state/auth.state';
import { ErrorResponseService } from '../../../shared/services/error-response.service';
import { LatestMeasurement } from '../model/measurement.model';
import { catchError } from 'rxjs/operators';
import { mdiAlert } from '@mdi/js';
import {firstValueFrom, of, throwError} from 'rxjs';
import {AppSettingsState} from "../../../core/app-settings/+state/app-settings.state";
import {MeasurementHistory} from "../model/measurementHistory.model";

@Injectable({providedIn: 'root'})
export class MeasurementService {

  private readonly httpService = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly authState = inject(AuthState);
  private readonly errorStatusService = inject(ErrorResponseService);
  private readonly appSettingsState: AppSettingsState = inject(AppSettingsState);

  getLatestMeasurements(): Promise<LatestMeasurement[]> {
    return firstValueFrom(this.httpService.get<LatestMeasurement[]>(`${this.appSettingsState.baseUrl()}/measurements/user/${this.authState.user().id}`)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not load latest measurements',
          id: "dashboard-error",
          body: `${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of([]);
      })));
  }

  getMeasurementHistory(id: number, from: Date, to: Date, allData: boolean): Promise<MeasurementHistory> {
    const midUrl = allData ? 'base' : 'sensor';
    return firstValueFrom(this.httpService.get<MeasurementHistory>(`${this.appSettingsState.baseUrl()}/measurements/${midUrl}/${id}?from=${from.toISOString()}&to=${to.toISOString()}`)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not load measurements history',
          id: 'dashboard-error',
          body: `${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return throwError(() => new Error('Could not load history data'));
      })));
  }

}
