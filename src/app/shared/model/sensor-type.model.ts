export enum PhysicalType {
  HUMIDITY = 'HUMIDITY',
  TEMPERATURE = 'TEMPERATURE',
  VOC = 'VOC',
  H2 = 'H2',
  CO = 'CO',
  LPG = 'LPG',
  ALCOHOL = 'ALCOHOL',
  PROPANE = 'PROPANE',
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


