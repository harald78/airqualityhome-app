import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';
import { UnitPipe } from '../../../../shared/pipes/unit.pipe';
import { DatePipe } from '@angular/common';
import { SensorBaseTileComponent } from './sensor-base-tile.component';
import { SensorBase} from '../../model/sensor-base.model';
import { PhysicalType } from '../../../../shared/model/sensor-type.model';

describe('SensorBaseTileComponent', () => {
  let component: SensorBaseTileComponent;
  let fixture: ComponentFixture<SensorBaseTileComponent>;

  beforeEach(async () => {
    const sensorBase: SensorBase = {
      id: 1,
      name: "AZEnvy",
      sensorTypes: [
        { id: 1, name: 'Temperature', type: PhysicalType.TEMPERATURE, minValue: 0, maxValue: 100 },
        { id: 2, name: 'Humidity', type: PhysicalType.HUMIDITY, minValue: 0, maxValue: 100 },
        { id: 3, name: 'VOC', type: PhysicalType.VOC, minValue: 0, maxValue: 100 }
      ]
    };

    await TestBed.configureTestingModule({
      imports: [UnitPipe, IconComponent],
      providers: [DatePipe]

    }).compileComponents();

    fixture = TestBed.createComponent(SensorBaseTileComponent);
    fixture.componentRef.setInput('sensorBase', sensorBase);
    fixture.componentRef.setInput('activeRequest', false);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cancel event', () => {
    const spy = jest.spyOn(component.cancelRequest, 'emit');
    const sensorBase: SensorBase = { /* mock SensorBase object */ } as SensorBase;
    component.cancel(sensorBase);
    expect(spy).toHaveBeenCalledWith(sensorBase);
  });

  it('should emit open modal event', () => {
    const spy = jest.spyOn(component.openModal, 'emit');
    const sensorBase: SensorBase = { /* mock SensorBase object */ } as SensorBase;
    component.request(sensorBase);
    expect(spy).toHaveBeenCalledWith(sensorBase);
  });

  it('should compute sensor types and ranges', () => {
    const computedSensorTypes = component.sensorTypes();
    expect(computedSensorTypes.length).toBe(3);

    const temperatureGroup = computedSensorTypes.find(group => group.name === 'Temperature');
    expect(temperatureGroup).toBeDefined();
    expect(temperatureGroup?.types).toContain(PhysicalType.TEMPERATURE);
    expect(temperatureGroup?.sensorRanges.length).toBe(1); // Expecting one range for Temperature

    const humidityGroup = computedSensorTypes.find(group => group.name === 'Humidity');
    expect(humidityGroup).toBeDefined();
    expect(humidityGroup?.types).toContain(PhysicalType.HUMIDITY);
    expect(humidityGroup?.sensorRanges.length).toBe(1); // Expecting one range for Humidity

    const vocGroup = computedSensorTypes.find(group => group.name === 'VOC');
    expect(vocGroup).toBeDefined();
    expect(vocGroup?.types).toContain(PhysicalType.VOC);
    expect(vocGroup?.sensorRanges.length).toBe(1); // Expecting one range for VOC
  });
});
