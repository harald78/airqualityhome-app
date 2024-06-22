import {TestBed} from '@angular/core/testing';

import {ChartService} from './chart.service';
import {UnitPipe} from '../../../shared/pipes/unit.pipe';
import {SensorMeasurementHistory} from "../model/measurementHistory.model";
import {PhysicalType} from "../../../shared/model/sensor-type.model";

describe('ChartService', () => {
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

  it('should calculate yScaleMin and return minimum from series', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: PhysicalType.TEMPERATURE,
        sensorName: "SHT30",
        name: "",
        unit: "CELSIUS",
        minAlarm: 18.0,
        maxAlarm: 40.0,
        sensorMinValue: -40.0,
        sensorMaxValue: 120.0,
        series: [
          {
            value: 30.0,
            name: new Date(2024, 5, 22, 14, 30)
          },
          {
            value: 32.0,
            name: new Date(2024, 5, 22, 15, 30)
          },
          {
            value: 33.0,
            name: new Date(2024, 5, 22, 16, 30)
          },
          {
            value: 16.0,
            name: new Date(2024, 5, 22, 23, 30)
          }
        ]
      }
    ];

    // when
    const result = service.calculateYScaleMin(data);

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual(16.0);
  });

  it('should calculate yScaleMin and return minimum from minAlarm', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: PhysicalType.TEMPERATURE,
        sensorName: "SHT30",
        name: "",
        unit: "CELSIUS",
        minAlarm: 18.0,
        maxAlarm: 40.0,
        sensorMinValue: -40.0,
        sensorMaxValue: 120.0,
        series: [
          {
            value: 30.0,
            name: new Date(2024, 5, 22, 14, 30)
          },
          {
            value: 32.0,
            name: new Date(2024, 5, 22, 15, 30)
          },
          {
            value: 33.0,
            name: new Date(2024, 5, 22, 16, 30)
          },
          {
            value: 19.0,
            name: new Date(2024, 5, 22, 23, 30)
          }
        ]
      }
    ];

    // when
    const result = service.calculateYScaleMin(data);

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual(18.0);
  });

  it('should calculate yScaleMax and return maximum from series', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: PhysicalType.TEMPERATURE,
        sensorName: "SHT30",
        name: "",
        unit: "CELSIUS",
        minAlarm: 18.0,
        maxAlarm: 30.0,
        sensorMinValue: -40.0,
        sensorMaxValue: 120.0,
        series: [
          {
            value: 30.0,
            name: new Date(2024, 5, 22, 14, 30)
          },
          {
            value: 32.0,
            name: new Date(2024, 5, 22, 15, 30)
          },
          {
            value: 33.0,
            name: new Date(2024, 5, 22, 16, 30)
          },
          {
            value: 16.0,
            name: new Date(2024, 5, 22, 23, 30)
          }
        ]
      }
    ];

    // when
    const result = service.calculateYScaleMax(data);

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual(33.0);
  });

  it('should calculate yScaleMax and return minimum from maxAlarm', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: PhysicalType.TEMPERATURE,
        sensorName: "SHT30",
        name: "",
        unit: "CELSIUS",
        minAlarm: 18.0,
        maxAlarm: 40.0,
        sensorMinValue: -40.0,
        sensorMaxValue: 120.0,
        series: [
          {
            value: 30.0,
            name: new Date(2024, 5, 22, 14, 30)
          },
          {
            value: 32.0,
            name: new Date(2024, 5, 22, 15, 30)
          },
          {
            value: 33.0,
            name: new Date(2024, 5, 22, 16, 30)
          },
          {
            value: 19.0,
            name: new Date(2024, 5, 22, 23, 30)
          }
        ]
      }
    ];

    // when
    const result = service.calculateYScaleMax(data)

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual(40.0);
  });

  it('should calculate reference lines', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: PhysicalType.TEMPERATURE,
        sensorName: "SHT30",
        name: "",
        unit: "CELSIUS",
        minAlarm: 18.0,
        maxAlarm: 40.0,
        sensorMinValue: -40.0,
        sensorMaxValue: 120.0,
        series: [
          {
            value: 30.0,
            name: new Date(2024, 5, 22, 14, 30)
          },
          {
            value: 32.0,
            name: new Date(2024, 5, 22, 15, 30)
          },
          {
            value: 33.0,
            name: new Date(2024, 5, 22, 16, 30)
          },
          {
            value: 16.0,
            name: new Date(2024, 5, 22, 23, 30)
          }
        ]
      }
    ];

    // when
    const result = service.calculateReferenceLines(data);

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual([
      {name: "min °C", value: 18.0},
      {name: "max °C", value: 40.0}
    ]);
  });

  it('should not calculate reference lines', () => {
    // given
    const data: SensorMeasurementHistory[] = [
      {
        type: PhysicalType.TEMPERATURE,
        sensorName: "SHT30",
        name: "",
        unit: "CELSIUS",
        minAlarm: 0.0,
        maxAlarm: 0.0,
        sensorMinValue: -40.0,
        sensorMaxValue: 120.0,
        series: [
          {
            value: 30.0,
            name: new Date(2024, 5, 22, 14, 30)
          },
          {
            value: 32.0,
            name: new Date(2024, 5, 22, 15, 30)
          },
          {
            value: 33.0,
            name: new Date(2024, 5, 22, 16, 30)
          },
          {
            value: 16.0,
            name: new Date(2024, 5, 22, 23, 30)
          }
        ]
      }
    ];

    // when
    const result = service.calculateReferenceLines(data);

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual([]);
  });

  it('should format yAxisTick without dataToggle set', () => {

    // when
    const result = service.formatYAxisTick(25.0, PhysicalType.TEMPERATURE, false);

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual("25 °C");
  });

  it('should format yAxisTick with dataToggle set', () => {

    // when
    const result = service.formatYAxisTick(25.0, PhysicalType.TEMPERATURE, true);

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual("25");
  });

  it('should format xAxis correctly', () => {
    // given
    const date = new Date(2024, 5, 22, 14, 45);

    // when
    const result = service.formatXAxisTick(date);

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual("22.06. 14:45");
  })
});
