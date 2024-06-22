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


});
