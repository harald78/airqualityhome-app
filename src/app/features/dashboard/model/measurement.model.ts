
export interface LatestMeasurement {
  id: number;
  uuid: string;
  sensorBaseName: string;
  sensorName: string;
  sensorType: string;
  location: string;
  alarmMax: number;
  alarmMin: number;
  timestamp: Date;
  unit: string;
  value: number;
  [key: string]: any;
}
