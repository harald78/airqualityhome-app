import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

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

}
