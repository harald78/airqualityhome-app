import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer/footer.component";
import {ToastsContainer} from "./shared/components/toast/toasts-container.component";
import {AuthService} from "./core/auth/service/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastsContainer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'airqualityhome-app';
  authService = inject(AuthService);

  async ngOnInit() {
    await this.authService.loadUserProfile();
  }

}
