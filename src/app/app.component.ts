import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer/footer.component";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'airqualityhome-app';

  constructor(public oidcSecurityService: OidcSecurityService) {

  }

  ngOnInit() {
    this.oidcSecurityService.checkAuth()
      .subscribe((loginResponse) => {
        const { isAuthenticated, userData, accessToken, idToken, configId } =
          loginResponse;
          console.log(loginResponse);
      });
  }
}
