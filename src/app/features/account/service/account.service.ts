import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PasswordChangeRequest, User, UserChangeRequest } from '../../../shared/model/user.model';
import { finalize, firstValueFrom, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Toast, ToastService } from '../../../shared/components/toast/toast.service';
import { mdiAlert } from '@mdi/js';
import { ErrorResponseService } from '../../../shared/services/error-response.service';
import { AuthState } from '../../../core/auth/+state/auth.state';
import { OverlayService } from '../../../shared/services/overlay.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly errorStatusService: ErrorResponseService = inject(ErrorResponseService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly authState: AuthState = inject(AuthState);
  private readonly overlayService: OverlayService = inject(OverlayService);

  saveUserData(userChangeRequest: UserChangeRequest): Promise<User> {
    this.overlayService.show();
    return firstValueFrom(this.httpClient.post<User>(`${environment.baseUrl}/user/save`, userChangeRequest).pipe(
      catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not save user data',
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of(this.authState.user());
      }),
      finalize(() => this.overlayService.hide())));
  }

  savePassword(passwordChangeRequest: PasswordChangeRequest): Promise<User> {
    this.overlayService.show()
    return firstValueFrom(this.httpClient.post<User>(`${environment.baseUrl}/user/save-password`, passwordChangeRequest).pipe(
      catchError(err => {
        const statusText = this.errorStatusService.getHttpErrorResponseTextByStatus(err.status);
        const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not change password',
          body: `${err.status} ${statusText}`, icon: mdiAlert, iconColor: "white"};
        this.toastService.show(errorToast);
        return of(this.authState.user());
      }),
      finalize(() => this.overlayService.hide())));
  }

}
