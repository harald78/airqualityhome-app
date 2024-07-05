import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { SensorSettingsComponent } from './sensor-settings.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SensorSettingsState} from "../../+state/sensor.state";
import {Router} from "@angular/router";


describe('SensorSettingsComponent', () => {
  let component: SensorSettingsComponent;
  let fixture: ComponentFixture<SensorSettingsComponent>;
  let mockRouter: Router;
  let mockSensorSettingsState: SensorSettingsState;

  beforeEach(async () => {
    mockSensorSettingsState = {
      selectedSensor: jest.fn(() => ({
        location: 'test location',
        alarmMin: 10,
        alarmMax: 20,
        alarmActive: true,
        warningThreshold: 15,
        linearCorrectionValue: 5,
      })),
      saveSensorSettings: jest.fn().mockResolvedValue(null),
    } as any;

    mockRouter = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [SensorSettingsComponent, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SensorSettingsState, useValue: mockSensorSettingsState },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with selected sensor data', async () => {
    fixture.detectChanges();

    expect(component.sensorSettingsForm.value).toEqual({
      location: 'test location',
      alarmMin: 10,
      alarmMax: 20,
      alarmActive: true,
      warningThreshold: 15,
      linearCorrectionValue: 5,
    });
  });

  it('should enable save button when form is changed', fakeAsync(() => {
    component.sensorSettingsForm.get('location')?.setValue('new location');

    fixture.detectChanges();

    expect(component.buttonDisabled).toBe(false);
  }));

  it('should call saveSensorSettings and navigate on saveData', async () => {
    component.sensorSettingsForm.patchValue({
      location: 'new location',
      alarmMin: 12,
      alarmMax: 22,
      alarmActive: false,
      warningThreshold: 18,
      linearCorrectionValue: 6,
    });

    await component.saveData();

    expect(mockSensorSettingsState.saveSensorSettings).toHaveBeenCalledWith(expect.objectContaining({
      location: 'new location',
      alarmMin: 12,
      alarmMax: 22,
      alarmActive: false,
      warningThreshold: 18,
      linearCorrectionValue: 6,
    }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['settings']);
  });

  it('should navigate back on navigateBack', async () => {
    await component.navigateBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['settings']);
  });

  it('should restore data on restoreData', () => {
    component.sensorSettingsForm.patchValue({
      location: 'changed location',
    });
    component.restoreData();
    expect(component.sensorSettingsForm.value.location).toBe('test location');
  });
});
