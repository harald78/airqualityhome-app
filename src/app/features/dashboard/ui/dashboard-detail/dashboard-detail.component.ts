import {Component, inject, OnInit} from '@angular/core';
import {MeasurementService} from "../../service/measurement.service";
import {MeasurementHistory} from "../../model/measurementHistory.model";
import {ActivatedRoute} from "@angular/router";
import {MeasurementState} from "../../+state/measurement.state";
import {LatestMeasurement} from "../../model/measurement.model";
import {mdiFilter} from "@mdi/js";
import {IconButtonComponent} from "../../../../shared/components/icon-button/icon-button.component";
import { Router } from '@angular/router';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [IconButtonComponent, ChartComponent],
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.scss'
})
export class DashboardDetailComponent implements OnInit {

  private readonly measurementService: MeasurementService = inject(MeasurementService);
  private readonly route = inject(ActivatedRoute);
  private readonly measurementState = inject(MeasurementState);
  private readonly router = inject(Router);

  public latestMeasurement: LatestMeasurement | undefined;
  public historyData: MeasurementHistory;

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    await this.measurementState.selectId(id);
    this.latestMeasurement = this.measurementState.filteredBySelection();
    if (this.latestMeasurement) {
      this.historyData = await this.measurementService.getMeasurementHistory(this.latestMeasurement.sensorId);
    } else {
      //Toast routes to Dashboard
    }
  }

  async navigateBack() {
    await this.router.navigate(['dashboard']);
  }

  protected readonly mdiFilter = mdiFilter;
}
