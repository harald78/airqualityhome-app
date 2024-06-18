import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorSettingsComponent } from './sensor-settings.component';

describe('SensorSettingsComponent', () => {
  let component: SensorSettingsComponent;
  let fixture: ComponentFixture<SensorSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
