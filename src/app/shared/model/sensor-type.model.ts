export enum PhysicalType {
  HUMIDITY = 'HUMIDITY',
  TEMPERATURE = 'TEMPERATURE',
  GAS = 'GAS',
  PARTICLE = 'PARTICLE',
  PRESSURE = 'PRESSURE',
  LIGHT = 'LIGHT'
}

export interface SensorType {
  id: number;
  name: string;
  type: PhysicalType;
  maxValue: number;
  minValue: number;
}


