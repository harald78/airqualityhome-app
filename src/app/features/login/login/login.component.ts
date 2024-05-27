import {Component, inject} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly oidcSecurityService = inject(OidcSecurityService);

  login() {
    this.oidcSecurityService.authorize();
  }
}
