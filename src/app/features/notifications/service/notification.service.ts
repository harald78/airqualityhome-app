import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, of, tap, throwError} from "rxjs";
import {Notification} from "../model/notification.model";
import {Toast, ToastService} from "../../../shared/components/toast/toast.service";
import {catchError} from "rxjs/operators";
import {mdiAlert, mdiCheck} from "@mdi/js";
import {ErrorResponseService} from "../../../shared/services/error-response.service";
import { AppSettingsState } from '../../../core/app-settings/+state/app-settings.state';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly httpService = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly errorStatusService = inject(ErrorResponseService);
  private readonly appSettingsState = inject(AppSettingsState);

  getNotifications(id:number): Promise<Notification[]> {
    return firstValueFrom(this.httpService.get<Notification[]>(`${this.appSettingsState.baseUrl()}/notifications/user/${id}`)
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not load notifications',
          body: `${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of([]);
      })));
  }

  readNotification(id: number): Promise<Notification> {
    return firstValueFrom(this.httpService.post<Notification>(`${this.appSettingsState.baseUrl()}/notifications/read/${id}`, {})
      .pipe(catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could set status read',
          body: `${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return throwError(() => new Error("Could not set read on notification"));
      })));
  }

  sendDeleteNotification(id:number): Promise<void> {
    return firstValueFrom(this.httpService.delete<void>(`${this.appSettingsState.baseUrl()}/notifications/user/${id}`)
      .pipe(tap(() => {
          const successToast: Toast = {classname: "bg-success text-light", header: '',
            body: "Deleted all notifications successfully", icon: mdiCheck, iconColor: "white"};
          this.toastService.show(successToast);
        }),
        catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not delete notifications',
          body: `${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of();
      }))
    );
  }

}
