import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer/footer.component";
import {ToastsContainerComponent} from "./shared/components/toast/toasts-container.component";
import {AuthService} from "./core/auth/service/auth.service";
import {AuthState} from "./core/auth/+state/auth.state";
import { OverlayComponent } from './shared/components/overlay/overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastsContainerComponent, OverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'AirQuality@Home';
  authService = inject(AuthService);
  authState = inject(AuthState);

  private readonly router = inject(Router);

  async ngOnInit() {
    await this.authService.loadUserProfile();
    await this.router.navigate(['dashboard']);
  }

}
