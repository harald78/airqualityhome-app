import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Toast, ToastService } from '../../../shared/components/toast/toast.service';
import { AuthState } from '../../../core/auth/+state/auth.state';
import { ErrorResponseService } from '../../../shared/services/error-response.service';
import { LatestMeasurement } from '../model/measurement.model';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { mdiAlert } from '@mdi/js';
import { firstValueFrom, of } from 'rxjs';
import {MeasurementHistory} from "../model/measurementHistory.model";

@Injectable({providedIn: 'root'})
export class MeasurementService {

  private readonly httpService = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly authState = inject(AuthState);
  private readonly errorStatusService = inject(ErrorResponseService);

  getLatestMeasurements(): Promise<LatestMeasurement[]> {
    return firstValueFrom(this.httpService.get<LatestMeasurement[]>(`${environment.baseUrl}/measurements/user/${this.authState.user().id}`)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not load latest measurements',
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of([]);
      })));
  }

  getMeasurementHistory(id: number): Promise<MeasurementHistory> {
    return firstValueFrom(this.httpService.get<MeasurementHistory>(`${environment.baseUrl}/measurements/sensor/${id}`)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not load measurements history',
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of();
      })));
  }

}
