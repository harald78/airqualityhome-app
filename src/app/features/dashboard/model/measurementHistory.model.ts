export interface MeasurementHistory {
  sensorId: number;
  unit: string;
  data: MeasurementHistorySensor[];
}

export interface MeasurementHistorySensor{
  name: string;
  series: MeasurementHistorySeries[];
}

export interface MeasurementHistorySeries{
  value: number;
  name: Date;
  min: number;
  max: number;
}
