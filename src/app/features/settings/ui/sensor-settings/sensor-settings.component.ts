import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-sensor-settings',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './sensor-settings.component.html',
  styleUrl: './sensor-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorSettingsComponent {

  private readonly router = inject(Router);

  async register() {
    await this.router.navigate(['/settings/register'], { relativeTo: null });
  }
}
