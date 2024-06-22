import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorTileComponent } from './sensor-tile.component';
import {PhysicalType} from "../../../../shared/model/sensor-type.model";

describe('SensorTileComponent', () => {
  let component: SensorTileComponent;
  let fixture: ComponentFixture<SensorTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorTileComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('sensorType', PhysicalType.TEMPERATURE);
    fixture.componentRef.setInput('sensorName', 'SHT30');
    fixture.componentRef.setInput('sensorBase', 'AZEnvy');
    fixture.componentRef.setInput('location', 'Büro');
    fixture.componentRef.setInput('updated', new Date());
    fixture.componentRef.setInput('alarmActive', false);
    fixture.componentRef.setInput('alarmMin', 18.0);
    fixture.componentRef.setInput('alarmMax', 40.0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
