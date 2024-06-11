import {TestBed} from '@angular/core/testing';
import { FilterService } from './filter-service.service';
import {latestMeasurements} from "../../../../mock/measurement.mock";


describe('FilterServiceService', () => {
  let service: FilterService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });

    service = TestBed.inject(FilterService);
    service.setFilterProperties(['location', 'sensorBaseName', 'sensorType', 'sensorName']);
    await service.initData(latestMeasurements);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize filter-service with options', async ()  => {
    // given
    service.setFilterProperties(['location', 'sensorBaseName', 'sensorType', 'sensorName']);
    await service.initData(latestMeasurements);

    // then
    expect(service.getActiveFilter()).toEqual([]);
    expect(service.filterOptions).toBeTruthy();
    expect(service.filterOptions.has("location")).toBeTruthy();
    expect(service.filterOptions.has("sensorBaseName")).toBeTruthy();
    expect(service.filterOptions.has("sensorType")).toBeTruthy();
    expect(service.filterOptions.has("sensorName")).toBeTruthy();
    expect(service.filterOptions.get("location")).toEqual(["Wohnzimmer", "Schlafzimmer"]);
    expect(service.filterOptions.get("sensorBaseName")).toEqual(["AZEnvy"]);
    expect(service.filterOptions.get("sensorType")).toEqual(["TEMPERATURE", "Humidity", "GAS"]);
    expect(service.filterOptions.get("sensorName")).toEqual(["SHT30", "MQ-2"]);
  });

  it('should add item to active filter', async ()  => {

    expect(service.getActiveFilter()).toEqual([]);
    const expectedEntities = [  {
      "uuid": "F0F0F0",
      "id": 1,
      "sensorId": 1,
      "sensorBaseName": "AZEnvy",
      "sensorName": "SHT30",
      "sensorType": "TEMPERATURE",
      "location": "Wohnzimmer",
      "alarmMax": 25.0,
      "alarmMin": 19.0,
      "timestamp": new Date(2024, 5, 5, 6, 5),
      "unit": "CELSIUS",
      "value": 26.5,
      "warningThreshold": 0.0,
      "linearCorrectionValue": 0.0,
      "alarmActive": false
    },
      {
        "uuid": "F0F0F0",
        "id": 2,
        "sensorId": 1,
        "sensorBaseName": "AZEnvy",
        "sensorName": "SHT30",
        "sensorType": "Humidity",
        "location": "Wohnzimmer",
        "alarmMax": 65.0,
        "alarmMin": 45.0,
        "timestamp": new Date(2024, 5, 5, 6, 5),
        "unit": "PERCENT",
        "value": 45.5,
        "warningThreshold": 0.0,
        "linearCorrectionValue": 0.0,
        "alarmActive": false
      },
      {
        "uuid": "F0F0F0",
        "id": 3,
        "sensorId": 1,
        "sensorBaseName": "AZEnvy",
        "sensorName": "MQ-2",
        "sensorType": "GAS",
        "location": "Wohnzimmer",
        "alarmMax": 200.0,
        "alarmMin": 0.0,
        "timestamp": new Date(2024, 5, 5, 6, 5),
        "unit": "PPM",
        "value": 201.0,
        "warningThreshold": 0.0,
        "linearCorrectionValue": 0.0,
        "alarmActive": false
      }];

    // when
    service.setFilter({name: 'location', item: 'Wohnzimmer', mode: 'add'});

    // then
    expect(service.getActiveFilter()).toEqual([{name: 'location', items: ['Wohnzimmer']}]);
    expect(service.filteredEntities()).toEqual(expectedEntities);
  });

  it('should add remove filter item', async ()  => {

    expect(service.getActiveFilter()).toEqual([]);
    const expectedStartEntity = [{
      "uuid": "F0F0F0",
      "id": 1,
      "sensorId": 1,
      "sensorBaseName": "AZEnvy",
      "sensorName": "SHT30",
      "sensorType": "TEMPERATURE",
      "location": "Wohnzimmer",
      "alarmMax": 25.0,
      "alarmMin": 19.0,
      "timestamp": new Date(2024, 5, 5, 6, 5),
      "unit": "CELSIUS",
      "value": 26.5,
      "warningThreshold": 0.0,
      "linearCorrectionValue": 0.0,
      "alarmActive": false
    }];
    const expectedEndEntities = [  {
      "uuid": "F0F0F0",
      "id": 1,
      "sensorId": 1,
      "sensorBaseName": "AZEnvy",
      "sensorName": "SHT30",
      "sensorType": "TEMPERATURE",
      "location": "Wohnzimmer",
      "alarmMax": 25.0,
      "alarmMin": 19.0,
      "timestamp": new Date(2024, 5, 5, 6, 5),
      "unit": "CELSIUS",
      "value": 26.5,
      "warningThreshold": 0.0,
      "linearCorrectionValue": 0.0,
      "alarmActive": false
    },
      {
        "uuid": "F0F0F1",
        "sensorId": 1,
        "id": 4,
        "sensorBaseName": "AZEnvy",
        "sensorName": "SHT30",
        "sensorType": "TEMPERATURE",
        "location": "Schlafzimmer",
        "alarmMax": 20.0,
        "alarmMin": 17.0,
        "timestamp": new Date(2024, 5, 5, 6, 5),
        "unit": "CELSIUS",
        "value": 26.5,
        "warningThreshold": 0.0,
        "linearCorrectionValue": 0.0,
        "alarmActive": false
      }];
    service.setFilter({name: 'location', item: 'Wohnzimmer', mode: 'add'});
    service.setFilter({name: 'sensorType', item: 'TEMPERATURE', mode: 'add'});
    expect(service.getActiveFilter()).toEqual([{name: 'location', items: ['Wohnzimmer']},
      {name: 'sensorType', items: ['TEMPERATURE']}]);
    expect(service.filteredEntities()).toEqual(expectedStartEntity);

    // when
    service.setFilter({name: 'location', item: 'Wohnzimmer', mode: 'remove'});


    // then
    expect(service.filteredEntities()).toEqual(expectedEndEntities);
  });


});
