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

  register() {
    this.router.navigate(['', 'register']);
  }
}
