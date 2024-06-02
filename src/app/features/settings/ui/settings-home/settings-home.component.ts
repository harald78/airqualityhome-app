import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-settings-home',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './settings-home.component.html',
  styleUrl: './settings-home.component.scss'
})
export class SettingsHomeComponent {

  private readonly router = inject(Router);

  async register() {
    await this.router.navigate(['/register'], { relativeTo: null });
  }
}
