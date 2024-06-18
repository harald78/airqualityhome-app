import {Component, inject, Signal} from '@angular/core';
import {SensorSettingsState} from "../../+state/sensor.state";
import {Sensor} from "../../model/sensor.model";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-sensor-settings',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './sensor-settings.component.html',
  styleUrl: './sensor-settings.component.scss'
})
export class SensorSettingsComponent {
   private readonly sensorState: SensorSettingsState = inject(SensorSettingsState);
   selectedSensor: Signal<Sensor | undefined> = this.sensorState.selectedSensor;
}
