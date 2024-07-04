import { TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';
import { UnitPipe } from '../../../shared/pipes/unit.pipe';
import {SensorMeasurementHistory} from "../model/measurementHistory.model";
import {PhysicalType} from "../../../shared/model/sensor-type.model";

describe('ChartService Test', () => {
  let service: ChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitPipe]
    });
    service = TestBed.inject(ChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct min value of data series', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: "TEMPERATURE" as PhysicalType,
        sensorName: '',
        name: '',
        unit: '',
        minAlarm: 18.0,
        maxAlarm: 0,
        sensorMinValue: 0,
        sensorMaxValue: 0,
        series: [
          {
            value: 10.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 12.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 8.0,
            name: new Date(2024, 5, 16, 12, 0)
          }
        ]
      },
      {
        type: "HUMIDITY" as PhysicalType,
        sensorName: '',
        name: '',
        unit: '',
        minAlarm: 35.0,
        maxAlarm: 0,
        sensorMinValue: 0,
        sensorMaxValue: 0,
        series: [
          {
            value: 55.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 45.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 65.0,
            name: new Date(2024, 5, 16, 12, 0)
          }
        ]
      }
    ];

    // when
    const result = service.calculateYScaleMin(data);

    // then
    expect(result).toEqual(8.0);
  });

  it('should return the correct min value of minValue', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: "TEMPERATURE" as PhysicalType,
        sensorName: '',
        name: '',
        unit: '',
        minAlarm: 5.0,
        maxAlarm: 0,
        sensorMinValue: 0,
        sensorMaxValue: 0,
        series: [
          {
            value: 10.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 12.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 8.0,
            name: new Date(2024, 5, 16, 12, 0)
          }
        ]
      },
      {
        type: "HUMIDITY" as PhysicalType,
        sensorName: '',
        name: '',
        unit: '',
        minAlarm: 35.0,
        maxAlarm: 0,
        sensorMinValue: 0,
        sensorMaxValue: 0,
        series: [
          {
            value: 55.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 45.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 65.0,
            name: new Date(2024, 5, 16, 12, 0)
          }
        ]
      }
    ];

    // when
    const result = service.calculateYScaleMin(data);

    // then
    expect(result).toEqual(5.0);
  });

  it('should return the correct max value of data series', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: "TEMPERATURE" as PhysicalType,
        sensorName: '',
        name: '',
        unit: '',
        minAlarm: 18.0,
        maxAlarm: 25.0,
        sensorMinValue: 0,
        sensorMaxValue: 0,
        series: [
          {
            value: 10.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 12.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 32.0,
            name: new Date(2024, 5, 16, 12, 0)
          }
        ]
      },
      {
        type: "HUMIDITY" as PhysicalType,
        sensorName: '',
        name: '',
        unit: '',
        minAlarm: 35.0,
        maxAlarm: 0,
        sensorMinValue: 0,
        sensorMaxValue: 0,
        series: [
          {
            value: 55.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 45.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 65.0,
            name: new Date(2024, 5, 16, 12, 0)
          }
        ]
      }
    ];

    // when
    const result = service.calculateYScaleMax(data);

    // then
    expect(result).toEqual(65.0);
  });

  it('should return the correct max value of maxValue', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: "TEMPERATURE" as PhysicalType,
        sensorName: '',
        name: '',
        unit: '',
        minAlarm: 5.0,
        maxAlarm: 0,
        sensorMinValue: 0,
        sensorMaxValue: 0,
        series: [
          {
            value: 10.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 12.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 8.0,
            name: new Date(2024, 5, 16, 12, 0)
          }
        ]
      },
      {
        type: "HUMIDITY" as PhysicalType,
        sensorName: '',
        name: '',
        unit: '',
        minAlarm: 35.0,
        maxAlarm: 75.0,
        sensorMinValue: 0,
        sensorMaxValue: 0,
        series: [
          {
            value: 55.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 45.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 50.0,
            name: new Date(2024, 5, 16, 12, 0)
          }
        ]
      }
    ];

    // when
    const result = service.calculateYScaleMax(data);

    // then
    expect(result).toEqual(75.0);
  });

  it('should calculate the correct reference lines', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: "TEMPERATURE" as PhysicalType,
        sensorName: '',
        name: '',
        unit: '',
        minAlarm: 18.0,
        maxAlarm: 25.0,
        sensorMinValue: 18.0,
        sensorMaxValue:25.0,
        series: [
          {
            value: 10.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 12.0,
            name: new Date(2024, 5, 16, 12, 0)
          },
          {
            value: 8.0,
            name: new Date(2024, 5, 16, 12, 0)
          }
        ]
      }
    ];

    // when
    const result = service.calculateReferenceLines(data);

    // then
    expect(result).toBeTruthy();
    expect(result.length).toEqual(2);
    expect(result[0].name).toEqual("max °C");
    expect(result[1].name).toEqual("min °C");
    expect(result[0].value).toEqual(25.0);
    expect(result[1].value).toEqual(18.0);
  });

});
