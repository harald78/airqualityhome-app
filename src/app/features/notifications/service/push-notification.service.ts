import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {SwPush} from "@angular/service-worker";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AppSettingsState} from "../../../core/app-settings/+state/app-settings.state";
import {Toast, ToastService} from "../../../shared/components/toast/toast.service";
import {mdiAlert, mdiCheck} from "@mdi/js";
import {AuthState} from "../../../core/auth/+state/auth.state";

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  private vapidPublicKey = '';
  public pushSubscription$: BehaviorSubject<PushSubscription | null> = new BehaviorSubject<PushSubscription | null>(null);
  public activatedPush: WritableSignal<boolean> = signal(false);

  private readonly swPush: SwPush = inject(SwPush);
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly settingsState: AppSettingsState = inject(AppSettingsState);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly authState: AuthState = inject(AuthState);

  constructor() {
    this.swPush.subscription
      .pipe(takeUntilDestroyed())
      .subscribe(sub => {
        if (sub) {
          this.activatedPush.set(true);
        } else {
          this.activatedPush.set(false);
        }
        this.pushSubscription$.next(sub);
      });
  }

  public async subscribeToNotifications() {
    if (!this.activatedPush()) {

      await this.getVapidPublicKey().catch(err => this.showError(err));
      this.swPush.requestSubscription({
        serverPublicKey: this.vapidPublicKey
      }).then(async (sub) => {
        if (sub) {
          await this.sendSubscriptionToServer(sub);
          this.showSuccess();
        }
      }).catch(err => this.showError(err));
    }

    if (this.swPush.isEnabled) {
      this.swPush.messages.subscribe(message => console.log(message));
    }
  }

  public sendSubscriptionToServer(sub: PushSubscription) {
    return firstValueFrom(this.httpClient.post<string>(`${this.settingsState.baseUrl()}/notifications/subscribe/${this.authState.user().id}`, sub, {responseType: 'text' as 'json'}))
  }

  public async getVapidPublicKey(): Promise<void> {
    this.vapidPublicKey = await firstValueFrom(this.httpClient.get<string>(`${this.settingsState.baseUrl()}/notifications/vapidPublicKey`, {responseType: 'text' as 'json'}));
  }

  private showError(err: any): void {
    const errorToast: Toast = {classname: "bg-danger text-light", header: 'Could not subscribe to push notifications',
      body: `${err.message}`, icon: mdiAlert, iconColor: "white"};
    this.toastService.show(errorToast);
  }

  private showSuccess(): void {
    const successToast: Toast = {classname: "bg-success text-light", icon: mdiCheck, header: '',
      body: `Successfully subscribed to push notifications`, iconColor: "white"};
    this.toastService.show(successToast);
  }
}
