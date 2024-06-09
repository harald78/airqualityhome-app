import {Component, computed, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {MeasurementTileComponent} from "../measurement-tile/measurement-tile.component";
import {IconComponent} from "../../../../shared/components/icon/icon/icon.component";
import {mdiFilter} from "@mdi/js";
import {IconButtonComponent} from "../../../../shared/components/icon-button/icon-button.component";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {FilterOffcanvasComponent} from "../../../../shared/components/filter-offcanvas/filter-offcanvas.component";
import {FilterService} from "../../../../shared/services/filter-service.service";
import {LatestMeasurement} from "../../model/measurement.model";
import {MeasurementState} from "../../+state/measurement.state";
import {interval, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {environment} from "../../../../../environments/environment";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [
    MeasurementTileComponent,
    IconComponent,
    IconButtonComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss'
})
export class DashboardOverviewComponent implements OnInit {

  protected readonly mdiFilter = mdiFilter;
  private readonly offCanvasService= inject(NgbOffcanvas);
  private readonly measurementState = inject(MeasurementState);
  private readonly filterService = inject(FilterService);

  public measurementItems: Signal<LatestMeasurement[]> = computed( () => {
    return this.filterService.filteredEntities() as LatestMeasurement[]; });

  constructor() {
    interval(environment.dashboardRefreshInterval).pipe(
      takeUntilDestroyed(),
      tap( async () => {
        await this.measurementState.loadLatestMeasurements();
        await this.filterService.setEntitiesForFilter(this.measurementState.entities());
      })).subscribe();
  }

  async ngOnInit() {
    this.filterService.setFilterProperties(['location', 'sensorBaseName', 'sensorType', 'sensorName']);
    await this.measurementState.loadLatestMeasurements();
    await this.filterService.initData(this.measurementState.entities());
    console.log(this.measurementState.entities());
  }


  openOverlay() {
    this.offCanvasService.open(FilterOffcanvasComponent, { position: 'end', panelClass: 'canvas' });
  }
}
