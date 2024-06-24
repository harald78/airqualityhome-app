import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {mdiBell, mdiCog, mdiMapMarker, mdiUpdate} from "@mdi/js";
import {DatePipe} from "@angular/common";
import {IconComponent} from "../../../../shared/components/icon/icon/icon.component";
import {UnitPipe} from "../../../../shared/pipes/unit.pipe";

@Component({
  imports: [
    DatePipe,
    IconComponent,
    UnitPipe
  ],
  selector: 'app-sensor-tile',
  standalone: true,
  styleUrl: './sensor-tile.component.scss',
  templateUrl: './sensor-tile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
    alarmMin: InputSignal<number> = input(0.0);
    alarmMax: InputSignal<number> = input(0.0);
  protected readonly mdiCog = mdiCog;
}
