import {Component, inject} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly oAuthService = inject(OAuthService);

  login() {
    this.oAuthService.initCodeFlow();
  }
}
