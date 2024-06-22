import {ChangeDetectionStrategy, Component, inject, OnInit, Signal} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {SensorTileComponent} from "../sensor-tile/sensor-tile.component";
import {Sensor} from "../../model/sensor.model";
import {AsyncPipe} from "@angular/common";
import {SensorSettingsState} from "../../+state/sensor.state";

@Component({
  selector: 'app-sensors-overview',
  standalone: true,
  imports: [
    RouterOutlet,
    SensorTileComponent,
    AsyncPipe
  ],
  templateUrl: './sensors-overview.component.html',
  styleUrl: './sensors-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorsOverviewComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly sensorState: SensorSettingsState = inject(SensorSettingsState);
  registeredSensors: Signal<Sensor[]>;

  async register() {
    await this.router.navigate(['/settings/register'], { relativeTo: null });
  }

  async ngOnInit() {
    this.registeredSensors = this.sensorState.sensors;
    await this.sensorState.loadSensor();
  }

  async onSelect(id: number) {
    await this.sensorState.selectSensor(id);
    await this.router.navigate(['settings', 'sensor', id]);
  }
}
