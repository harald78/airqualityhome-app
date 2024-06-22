import {SensorBase} from "../src/app/shared/model/sensor-base.model";
import {PhysicalType} from "../src/app/shared/model/sensor-type.model";

export const availableSensorBaseMock: SensorBase[] = [
  {
    "id": 1,
    "name": "EZ-Envy",
    "sensorTypes": [
      {
        "id": 1,
        "name": "SHT30",
        "type": "TEMPERATURE" as PhysicalType,
        "minValue": -40.0,
        "maxValue": 120.0
      },
      {
        "id": 2,
        "name": "MQ-2",
        "type": "VOC" as PhysicalType,
        "minValue": 100.0,
        "maxValue": 10000.0
      }
    ]
  }
];
