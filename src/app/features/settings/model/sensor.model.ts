import { PhysicalType } from "../../../shared/model/sensor-type.model";
import { FormControl } from "@angular/forms";



export interface Sensor {
  id: number;
  uuid: string;
  sensorBase: string;
  sensorType: PhysicalType;
  sensorName: string;
  sensorBaseSensorTypeId: number;
  userId: number;
  location: string;
  alarmMin: number;
  alarmMax: number;
  alarmActive: boolean;
  warningThreshold: number;
  linearCorrectionValue: number;
  updated: Date;
  created: Date;
}

export interface SensorSettingsForm {
  location: FormControl<string>;
  alarmMin: FormControl<number | string>;
  alarmMax: FormControl<number | string>;
  alarmActive: FormControl<boolean>;
  warningThreshold: FormControl<number | string>;
  linearCorrectionValue: FormControl<number | string>;
}

export const SENSOR_SETTINGS_KEY = 'sensor_settings';
