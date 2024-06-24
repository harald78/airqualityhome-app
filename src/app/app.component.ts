import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer/footer.component";
import {ToastsContainerComponent} from "./shared/components/toast/toasts-container.component";
import {AuthService} from "./core/auth/service/auth.service";
import { OverlayComponent } from './shared/components/overlay/overlay.component';
import {SwUpdate} from "@angular/service-worker";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastsContainerComponent, OverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  title = 'AirQuality@Home';
  private readonly authService = inject(AuthService);
  private readonly swUpdate: SwUpdate = inject(SwUpdate);
  private readonly router: Router = inject(Router);


  async ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === "VERSION_DETECTED" && confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }

    await this.authService.tryRefresh();
    await this.authService.loadUserProfile();
    await this.authService.setRefreshTimeout();
    await this.router.navigate(['dashboard']);
  }

}
