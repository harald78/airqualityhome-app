import {Component, input, InputSignal} from '@angular/core';
import { mdiBell, mdiMapMarker, mdiUpdate } from '@mdi/js';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';
import {DatePipe} from "@angular/common";
import {UnitPipe} from "../../../../shared/pipes/unit.pipe";

@Component({
  selector: 'app-measurement-tile',
  standalone: true,
  imports: [
    IconComponent,
    DatePipe,
    UnitPipe
  ],
  templateUrl: './measurement-tile.component.html',
  styleUrl: './measurement-tile.component.scss'
})
export class MeasurementTileComponent {
  protected readonly mdiBell = mdiBell;
  protected readonly mdiUpdate = mdiUpdate;
  protected readonly mdiMapMarker = mdiMapMarker;

  value: InputSignal<number> = input(0.0);
  unit: InputSignal<string> = input('');
  type: InputSignal<string> = input('');
  name: InputSignal<string> = input('');
  base: InputSignal<string> = input('');
  alarmMin: InputSignal<number> = input(0.0);
  alarmMax: InputSignal<number> = input(0.0);
  timestamp: InputSignal<Date> = input(new Date());
  location: InputSignal<string> = input('');
}
