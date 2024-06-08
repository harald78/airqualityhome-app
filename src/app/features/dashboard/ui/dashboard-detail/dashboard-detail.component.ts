import {Component, inject, OnInit} from '@angular/core';
import {temperatureMeasurementsHistory} from "../../../../../../mock/temperatureMeasurementHistory.mock";
import {MeasurementService} from "../../service/measurement.service";
import {MeasurementHistory} from "../../model/measurementHistory.model";

@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.scss'
})
export class DashboardDetailComponent implements OnInit {
  public historyData: MeasurementHistory[]; //mock:  = temperatureMeasurementsHistory // später löschen

  private readonly measurementService: MeasurementService = inject(MeasurementService);
  async ngOnInit() {
    this.historyData = await this.measurementService.getMeasurementHistory(1);
  }
}
