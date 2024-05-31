import {SensorType} from "./sensor-type.model";

export interface SensorBase {
  id: number;
  name: string;
  sensorTypes: SensorType[];
}
