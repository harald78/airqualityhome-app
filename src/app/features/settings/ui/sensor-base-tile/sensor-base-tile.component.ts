import {Component, computed, EventEmitter, input, InputSignal, Output} from '@angular/core';
import { mdiBell, mdiMapMarker, mdiUpdate } from '@mdi/js';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';
import { UnitPipe } from '../../../../shared/pipes/unit.pipe';
import { DatePipe } from '@angular/common';
import {SensorBase, SensorRange, SensorTypeGroup} from '../../model/sensor-base.model';
import { RegisterRequest } from '../../model/register-request.model';
import {PhysicalType, SensorType} from "../../../../shared/model/sensor-type.model";

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

  sensorTypes = computed(() => {
    return this.sensorBase().sensorTypes.reduce((prev, current) => {
      const sensorTypeGroup = prev.find(p => p.name === current.name);

      if (sensorTypeGroup) {
        this.computeSensorRanges(sensorTypeGroup.sensorRanges, current);
        sensorTypeGroup.types.push(current.type);

      } else {
        prev.push({name: current.name, types: [current.type], sensorRanges: this.computeSensorRanges([], current)});
      }

      return prev;
    }, [] as SensorTypeGroup[]);
  });

  @Output() cancelRequest: EventEmitter<SensorBase> = new EventEmitter<SensorBase>();
  @Output() openModal: EventEmitter<SensorBase> = new EventEmitter<SensorBase>();

  cancel(sensorBase: SensorBase) {
    this.cancelRequest.emit(sensorBase);
  }

  request(sensorBase: SensorBase) {
    this.openModal.emit(sensorBase);
  }

  computeSensorRanges(ranges: SensorRange[], sensorType: SensorType): SensorRange[] {
    switch (sensorType.type) {
      case PhysicalType.TEMPERATURE:
      case PhysicalType.HUMIDITY:
        return this.mayBeAddRange(ranges, sensorType);
      case PhysicalType.VOC:
        return this.mayBeAddRange(ranges, sensorType);
      default:
        return ranges;
    }
  }

  mayBeAddRange(ranges: SensorRange[], sensorType: SensorType): SensorRange[] {
    const range = ranges.find(r => r.alarmType === sensorType.type);
    if (range) {
      return ranges;
    }
    const newRange: SensorRange = {
      minAlarm: sensorType.minValue,
      maxAlarm: sensorType.maxValue,
      alarmType: sensorType.type
    };
    ranges.push(newRange);
    return ranges;
  }
}
