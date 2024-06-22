import {MeasurementService} from "../service/measurement.service";
import {TestBed, waitForAsync} from "@angular/core/testing";
import {latestMeasurementsMock} from "../../../../../mock/measurement.mock";
import {MeasurementState} from "./measurement.state";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('Measurement State Test', () => {
  let measurementService: MeasurementService;
  let measurementState: MeasurementState;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MeasurementService]
    });

    measurementService = TestBed.inject(MeasurementService);
    measurementState = TestBed.inject(MeasurementState);
  }));

  it('should load latest measurements and patch state', async () => {
    // given
    const serviceSpy = jest.spyOn(measurementService, 'getLatestMeasurements')
      .mockResolvedValue(latestMeasurementsMock);

    // when
    await measurementState.loadLatestMeasurements();

    // then
    expect(serviceSpy).toHaveBeenCalled();
    expect(measurementState.entities()).toEqual(latestMeasurementsMock);
  });

  it('should clear all measurements from state', async () => {
    // given
    jest.spyOn(measurementService, 'getLatestMeasurements')
      .mockResolvedValue(latestMeasurementsMock);
    await measurementState.loadLatestMeasurements();
    expect(measurementState.entities()).toEqual(latestMeasurementsMock); // Setup entities before clearing

    // when
    measurementState.clearAllMeasurements();

    // then
    expect(measurementState.entities()).toEqual([]);
  });

  it('should select entity id 1', async () => {
    // given
    const id = 1;

    // when
    measurementState.selectId(id);

    // then
    expect(measurementState.selectedId()).toEqual(1);
  });

  it('should set selectedId to null', async () => {
    // given
    const id = 1;
    measurementState.selectId(id);
    expect(measurementState.selectedId()).toEqual(1); // Pre-Setting to ensure id is reset

    // when
    measurementState.selectId(null);

    // then
    expect(measurementState.selectedId()).toEqual(null);
  });

  it('should filter by selected id', async () => {
    // given
    const id = 1;
    jest.spyOn(measurementService, 'getLatestMeasurements')
      .mockResolvedValue(latestMeasurementsMock);
    await measurementState.loadLatestMeasurements();
    await measurementState.selectId(id);

    // when
    const result = measurementState.filteredBySelection();

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual(latestMeasurementsMock[0]);
  });

});
