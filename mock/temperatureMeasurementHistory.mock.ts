import {MeasurementHistory} from "../src/app/features/dashboard/model/measurementHistory.model";
import {PhysicalType} from "../src/app/shared/model/sensor-type.model";

export const temperatureMeasurementsHistory: MeasurementHistory[] = [
    {
      baseId: 1,
      baseName: "AZEnvy",
      location: "Wohnzimmer",
      data: [{
        type: "TEMPERATURE" as PhysicalType,
        sensorName: "SHT30",
        unit: "CELSIUS",
        name: "",
        minAlarm: 18.0,
        maxAlarm: 35.0,
        sensorMinValue: -40.0,
        sensorMaxValue: 120.0,
        series: [
          {
            "value": 28,
            "name": new Date("2016-09-21T08:48:49.119Z"),
          },
          {
            "value": 29,
            "name": new Date("2016-09-22T09:39:07.247Z"),
          },
          {
            "value": 30,
            "name": new Date("2016-09-22T22:36:56.888Z"),
          },
          {
            "value": 25,
            "name": new Date("2016-09-18T12:34:52.431Z"),
          },
          {
            "value": 30,
            "name": new Date("2016-09-13T16:33:43.344Z"),
          }
        ]
      }]
    }
  ]
;
