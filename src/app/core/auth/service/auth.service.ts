import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../shared/model/user.model";
import { catchError, filter, finalize, firstValueFrom, map, of, Subject, Subscription, switchMap, takeUntil, tap, throwError } from 'rxjs';
import {AuthRequestDto} from "../model/auth-request.model";
import {JwtDto, RefreshTokenRequestDto} from "../model/jtw.model";
import {ToastService} from "../../../shared/components/toast/toast.service";
import { mdiAlert } from "@mdi/js";
import { AuthState } from "../+state/auth.state";
import {Router} from "@angular/router";
import { OverlayService } from '../../../shared/services/overlay.service';
import {AppSettingsState} from "../../app-settings/+state/app-settings.state";
import {interval} from "rxjs";

@Injectable({
  providedIn: 'root'
}) export class AuthService {

  private readonly toastService: ToastService = inject(ToastService);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  private readonly authState = inject(AuthState);
  private readonly overlayService: OverlayService = inject(OverlayService);
  private readonly appSettingsState: AppSettingsState = inject(AppSettingsState);
  private logout$: Subject<boolean> = new Subject<boolean>();
  private intervalSubscription: Subscription;


  async loadUserProfile(): Promise<void> {
    const user = await firstValueFrom(this.http.get<User>(`${this.appSettingsState.baseUrl()}/user/profile`));
    if (user) {
      await this.authState.setUser(user);
      await this.tryRefresh();
    }
  }

  async login(authRequest: AuthRequestDto): Promise<void> {
    this.authState.loading(true);
    this.overlayService.show();
    const jwt = await firstValueFrom(this.http.post<JwtDto>(`${this.appSettingsState.baseUrl()}/user/login`, authRequest)
      .pipe(catchError((err) => {
        this.toastService.show({classname: "bg-danger text-light", header: '',
          id: "login-error",
          body: "Username or Password not correct", icon: mdiAlert, iconColor: "white"});
        return throwError(() => err);
      }), finalize(() => {
        this.authState.loading(false);
        this.overlayService.hide();
      })));

    if (jwt) {
      localStorage.setItem("access_token", jwt.accessToken);
      localStorage.setItem("token", jwt.token);
      await this.loadUserProfile();
      await this.setRefreshTimeout();
      await this.router.navigate(['dashboard']);
    }
  }

  async serverLogout(): Promise<User> {
    return firstValueFrom(this.http.post<User>(`${this.appSettingsState.baseUrl()}/user/logout`, {})
      .pipe(catchError((err) => {
      this.toastService.show({classname: "bg-danger text-light", header: '',
        id: "logout-error", delay: 1000,
        body: "Unauthorized", icon: mdiAlert, iconColor: "white"});
      return throwError(() => err);
    })));
  }

  async refreshToken(token: string) {
    const refreshTokenDto: RefreshTokenRequestDto = {token: token};
    const jwt = await firstValueFrom(this.http.post<JwtDto>(`${this.appSettingsState.baseUrl()}/user/refreshToken`, refreshTokenDto));

    if (jwt) {
      localStorage.setItem("access_token", jwt.accessToken);
      localStorage.setItem("token", jwt.token);
    }
  }

  async logout(): Promise<void> {
    await this.logUserOut();
    await this.router.navigate(['login']);
  }

  async showSettings(): Promise<void> {
    await this.router.navigate(['general-settings']);
  }

  public isLoading(): boolean {
    return this.authState.isLoading();
  }

  async tryRefresh(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token) {
      await this.refreshToken(token);
    }
  }

  async setRefreshTimeout(): Promise<void> {
    const intervalValue = this.appSettingsState.appSettings().tokenRefreshInterval;
    this.intervalSubscription = interval(intervalValue).pipe(
      map(() => localStorage.getItem('token')),
      filter((token) => token !== null),
      tap((token) => this.refreshToken(token!))
    ).subscribe();
  }

  private async logUserOut(): Promise<void> {
    this.serverLogout();
    this.logout$.next(true);
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
    this.authState.logout();
  }
}
