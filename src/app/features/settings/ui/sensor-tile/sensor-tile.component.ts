import {Component, input, InputSignal} from '@angular/core';
import {mdiBell, mdiMapMarker, mdiUpdate} from "@mdi/js";
import {DatePipe} from "@angular/common";
import {IconComponent} from "../../../../shared/components/icon/icon/icon.component";

@Component({
  selector: 'app-sensor-tile',
  standalone: true,
  imports: [
    DatePipe,
    IconComponent
  ],
  templateUrl: './sensor-tile.component.html',
  styleUrl: './sensor-tile.component.scss'
})
export class SensorTileComponent {

    protected readonly updateIcon = mdiUpdate;
    protected readonly mdiBell = mdiBell;
    protected readonly mapMarkerIcon = mdiMapMarker;

    sensorType: InputSignal<string> = input.required();
    sensorName: InputSignal<string>= input.required();
    sensorBase: InputSignal<string> = input.required();
    location: InputSignal<string> = input.required();
    updated: InputSignal<Date> = input.required();
    alarmActive: InputSignal<boolean> = input.required();
}
