import {Component, inject, Signal} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {RegisterRequest} from "../../model/register-request.model";

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
