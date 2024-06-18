import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsOverviewComponent } from './sensors-overview.component';
import {Router} from "@angular/router";

describe('SensorSettingsComponent', () => {
  let component: SensorsOverviewComponent;
  let fixture: ComponentFixture<SensorsOverviewComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorsOverviewComponent);
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
