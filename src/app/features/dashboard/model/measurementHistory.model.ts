import {PhysicalType} from "../../../shared/model/sensor-type.model";

export interface MeasurementHistory{
  name: PhysicalType;
  series: MeasurementHistorySeries[]
}

export interface MeasurementHistorySeries{
  value: number,
  name: Date,
  min: number,
  max: number
}
