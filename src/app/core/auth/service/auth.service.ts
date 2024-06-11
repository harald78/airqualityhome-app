import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../shared/model/user.model";
import {environment} from "../../../../environments/environment";
import {catchError, finalize, firstValueFrom, throwError} from "rxjs";
import {AuthRequestDto} from "../model/auth-request.model";
import {JwtDto, RefreshTokenRequestDto} from "../model/jtw.model";
import {ToastService} from "../../../shared/components/toast/toast.service";
import { mdiAlert } from "@mdi/js";
import { AuthState } from "../+state/auth.state";
import {Router} from "@angular/router";
import { OverlayService } from '../../../shared/services/overlay.service';
import {AppSettingsState} from "../../app-settings/+state/app-settings.state";


@Injectable({
  providedIn: 'root'
}) export class AuthService {


  private readonly toastService: ToastService = inject(ToastService);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  private readonly authState = inject(AuthState);
  private readonly overlayService: OverlayService = inject(OverlayService);
  private readonly appSettingsState: AppSettingsState = inject(AppSettingsState);


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
        this.toastService.show({classname: "bg-danger text-light", header: '', body: "Username or Password not correct", icon: mdiAlert, iconColor: "white"});
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
      await this.router.navigate(['']);
    }
  }

  async refreshToken(token: string) {
    const refreshTokenDto: RefreshTokenRequestDto = {token: token};
    const jwt = await firstValueFrom(this.http.post<JwtDto>(`${this.appSettingsState.baseUrl()}/user/refreshToken`, refreshTokenDto));

    if (jwt) {
      localStorage.setItem("access_token", jwt.accessToken);
      localStorage.setItem("token", jwt.token);
      await this.setRefreshTimeout();
    }
  }

  async logout(): Promise<void> {
    this.logUserOut();
    await this.router.navigate(['login']);
  }

  async showSettings(): Promise<void> {
    this.logUserOut();
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
    const interval = environment.tokenRefreshInterval;
    const token = localStorage.getItem("token");
    if (token) {
      setTimeout(async () => {
        await this.refreshToken(token);
      }, interval);
    }
  }

  private logUserOut(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    this.authState.logout();
  }
}
