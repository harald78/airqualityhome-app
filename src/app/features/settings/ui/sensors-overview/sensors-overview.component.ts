import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {SensorTileComponent} from "../sensor-tile/sensor-tile.component";
import {Sensor} from "../../model/sensor.model";
import {AsyncPipe} from "@angular/common";
import {SensorSettingsState} from "../../+state/sensor.state";
import {mdiFilter} from "@mdi/js";
import {IconButtonComponent} from "../../../../shared/components/icon-button/icon-button.component";
import {FilterOffcanvasComponent} from "../../../../shared/components/filter-offcanvas/filter-offcanvas.component";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {FilterService} from "../../../../shared/services/filter-service.service";

@Component({
  selector: 'app-sensors-overview',
  standalone: true,
  imports: [
    RouterOutlet,
    SensorTileComponent,
    AsyncPipe,
    IconButtonComponent
  ],
  templateUrl: './sensors-overview.component.html',
  styleUrl: './sensors-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorsOverviewComponent implements OnInit {

  protected readonly mdiFilter = mdiFilter;
  private readonly router = inject(Router);
  private readonly sensorState: SensorSettingsState = inject(SensorSettingsState);
  private readonly offCanvasService= inject(NgbOffcanvas);
  private readonly filterService = inject(FilterService);
  registeredSensors = computed(() => {
    return this.filterService.filteredEntities() as Sensor[];
  });

  async register() {
    await this.router.navigate(['/settings/register'], { relativeTo: null });
  }

  async ngOnInit() {
    await this.sensorState.loadSensor();
    await this.filterService.setEntitiesForFilter(this.sensorState.sensors());
  }

  async onSelect(id: number) {
    await this.sensorState.selectSensor(id);
    await this.router.navigate(['settings', 'sensor', id]);
  }

  openOverlay() {
    this.offCanvasService.open(FilterOffcanvasComponent, { position: 'end', panelClass: 'canvas' });
  }
}
