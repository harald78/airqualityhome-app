import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorSettingsComponent } from './sensor-settings.component';
import {Router} from "@angular/router";

describe('SensorSettingsComponent', () => {
  let component: SensorSettingsComponent;
  let fixture: ComponentFixture<SensorSettingsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorSettingsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to register', () => {
    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component = fixture.componentInstance;
    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['/settings/register'], {relativeTo: null});
  });
});
