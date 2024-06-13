import { Component, input } from '@angular/core';
import { mdiBell, mdiMapMarker, mdiUpdate } from '@mdi/js';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification-tile',
  standalone: true,
  imports: [
    IconComponent,
    DatePipe
  ],
  templateUrl: './notification-tile.component.html',
  styleUrl: './notification-tile.component.scss'
})
export class NotificationTileComponent {

  protected readonly mapMarkerIcon = mdiMapMarker;
  protected readonly updateIcon = mdiUpdate;

  sensorType = input('');
  sensorName = input('');
  sensorBase = input('');
  location = input('');
  message = input('');
  acknowledged = input(false);
  timestamp = input(new Date())

  protected readonly mdiBell = mdiBell;
}
