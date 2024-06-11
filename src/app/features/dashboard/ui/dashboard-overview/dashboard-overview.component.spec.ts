import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOverviewComponent } from './dashboard-overview.component';
import {FilterService} from "../../../../shared/services/filter-service.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MeasurementState} from "../../+state/measurement.state";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {FilterOffcanvasComponent} from "../../../../shared/components/filter-offcanvas/filter-offcanvas.component";
import { RouterModule } from '@angular/router';
import { routes } from '../../../../app.routes';

describe('DashboardOverviewComponent', () => {
  let component: DashboardOverviewComponent;
  let fixture: ComponentFixture<DashboardOverviewComponent>;
  let filterService: FilterService;
  let measurementState: MeasurementState;
  let ngbOffcanvasService: NgbOffcanvas;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOverviewComponent,
        HttpClientTestingModule, RouterModule.forRoot(routes)],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOverviewComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService);
    measurementState = TestBed.inject(MeasurementState);
    ngbOffcanvasService = TestBed.inject(NgbOffcanvas);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should init component', async () => {
    const setPropertiesSpy = jest.spyOn(filterService, 'setFilterProperties');
    const initDataSpy = jest.spyOn(filterService, 'initData').mockResolvedValue(undefined);
    const storeSpy = jest.spyOn(measurementState, 'loadLatestMeasurements').mockResolvedValue(undefined);

    await component.ngOnInit();

    expect(setPropertiesSpy).toHaveBeenCalledWith(['location', 'sensorBaseName', 'sensorType', 'sensorName']);
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(initDataSpy).toHaveBeenCalled();
  });

  it('should open filter offcanvas', () => {
    const offcanvasSpy = jest.spyOn(ngbOffcanvasService, 'open');

    component.openOverlay();

    expect(offcanvasSpy).toHaveBeenCalledWith(FilterOffcanvasComponent, {position: 'end', panelClass: 'canvas'});
  });
});
