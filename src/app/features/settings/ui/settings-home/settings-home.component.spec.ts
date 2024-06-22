import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsHomeComponent } from './settings-home.component';
import { SensorsOverviewComponent } from '../sensors-overview/sensors-overview.component';
import { RegisterBaseComponent } from '../register-base/register-base.component';

describe('SettingsHomeComponent', () => {
  let component: SettingsHomeComponent;
  let fixture: ComponentFixture<SettingsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsHomeComponent, SensorsOverviewComponent, RegisterBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsHomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
