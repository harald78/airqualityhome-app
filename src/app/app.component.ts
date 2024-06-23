import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
  private readonly router = inject(Router);
  private readonly swUpdate: SwUpdate = inject(SwUpdate);

  async ngOnInit() {
    await this.authService.loadUserProfile();
    await this.router.navigate(['dashboard']);

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === "VERSION_DETECTED" && confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
  }

}
