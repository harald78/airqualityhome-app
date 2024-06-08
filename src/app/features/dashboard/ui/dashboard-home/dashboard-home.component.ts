import { Component } from '@angular/core';
import { MeasurementTileComponent } from '../measurement-tile/measurement-tile.component';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    MeasurementTileComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {

}
