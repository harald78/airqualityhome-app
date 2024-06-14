import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { mdiBell, mdiMapMarker, mdiUpdate } from '@mdi/js';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';
import { UnitPipe } from '../../../../shared/pipes/unit.pipe';
import { DatePipe } from '@angular/common';
import { SensorBase } from '../../../../shared/model/sensor-base.model';
import { RegisterRequest } from '../../model/register-request.model';

@Component({
  selector: 'app-sensor-base-tile',
  standalone: true,
  imports: [
    IconComponent,
    UnitPipe,
    DatePipe
  ],
  templateUrl: './sensor-base-tile.component.html',
  styleUrl: './sensor-base-tile.component.scss'
})
export class SensorBaseTileComponent {

  protected readonly mdiBell = mdiBell;
  protected readonly mdiUpdate = mdiUpdate;
  protected readonly mdiMapMarker = mdiMapMarker;

  sensorBase: InputSignal<SensorBase> = input.required();
  activeRequest: InputSignal<RegisterRequest | undefined> = input.required();

  @Output() cancelRequest: EventEmitter<SensorBase> = new EventEmitter<SensorBase>();
  @Output() openModal: EventEmitter<SensorBase> = new EventEmitter<SensorBase>();

  cancel(sensorBase: SensorBase) {
    this.cancelRequest.emit(sensorBase);
  }

  request(sensorBase: SensorBase) {
    this.openModal.emit(sensorBase);
  }
}
