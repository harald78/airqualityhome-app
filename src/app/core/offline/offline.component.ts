import { Component } from '@angular/core';
import {IconComponent} from "../../shared/components/icon/icon/icon.component";
import {mdiWifiOff} from "@mdi/js";

@Component({
  selector: 'app-offline',
  standalone: true,
  imports: [
    IconComponent
  ],
  templateUrl: './offline.component.html',
  styleUrl: './offline.component.scss'
})
export class OfflineComponent {
  offline = mdiWifiOff;
}
