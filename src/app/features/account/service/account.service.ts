import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PasswordChangeRequest, User, UserChangeRequest } from '../../../shared/model/user.model';
import { finalize, firstValueFrom, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Toast, ToastService } from '../../../shared/components/toast/toast.service';
import { mdiAlert, mdiCheck } from '@mdi/js';
import { ErrorResponseService } from '../../../shared/services/error-response.service';
import { AuthState } from '../../../core/auth/+state/auth.state';
import { OverlayService } from '../../../shared/services/overlay.service';
import {AppSettingsState} from "../../../core/app-settings/+state/app-settings.state";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly errorStatusService: ErrorResponseService = inject(ErrorResponseService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly authState: AuthState = inject(AuthState);
  private readonly overlayService: OverlayService = inject(OverlayService);
  private readonly appSettingsState: AppSettingsState = inject(AppSettingsState);

  saveUserData(userChangeRequest: UserChangeRequest): Promise<User> {
    this.overlayService.show();
    return firstValueFrom(this.httpClient.post<User>(`${this.appSettingsState.baseUrl()}/user/save`, userChangeRequest).pipe(
      tap(() => {
        const successToast: Toast = {classname: "bg-success text-light", header: '',
          id: "account-success",
          body: "Saved changes successfully", icon: mdiCheck, iconColor: "white"};
        this.toastService.show(successToast);
      }),
      catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not save user data',
          id: "account-error",
          body: `${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of(this.authState.user());
      }),
      finalize(() => this.overlayService.hide())));
  }

  savePassword(passwordChangeRequest: PasswordChangeRequest): Promise<User> {
    this.overlayService.show()
    return firstValueFrom(this.httpClient.post<User>(`${this.appSettingsState.baseUrl()}/user/save-password`, passwordChangeRequest).pipe(
      tap(() => {
        const successToast: Toast = {classname: "bg-success text-light", header: '',
          id: "account-success",
          body: "Password changed successfully", icon: mdiCheck, iconColor: "white"};
        this.toastService.show(successToast);
      }),
      catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Password could not be changed',
          id: "account-error",
          body: `${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of(this.authState.user());
      }),
      finalize(() => this.overlayService.hide())));
  }

}
