import {Component, inject, OnInit} from '@angular/core';
import {MeasurementService} from "../../service/measurement.service";
import {MeasurementHistory, SensorMeasurementHistory} from "../../model/measurementHistory.model";
import {colorSets, LegendPosition, NgxChartsModule} from "@swimlane/ngx-charts";
import {ActivatedRoute} from "@angular/router";
import {MeasurementState} from "../../+state/measurement.state";
import {LatestMeasurement} from "../../model/measurement.model";
import {mdiFilter} from "@mdi/js";
import {IconButtonComponent} from "../../../../shared/components/icon-button/icon-button.component";
import { Router } from '@angular/router';

import {ChartService} from "../../service/chart.service";

@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [NgxChartsModule, IconButtonComponent],
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.scss'
})
export class DashboardDetailComponent implements OnInit {
  public historyData: MeasurementHistory;
  public chartData: SensorMeasurementHistory[];
  public measurementItemName: string = '';

  // view: [number, number] = [370, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  yScaleMin = 0;
  yScaleMax = 40;
  roundDomains = true;
  autoScale = false;
  legendPosition: LegendPosition = LegendPosition.Below
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  referenceLines = [
    {name: "maxAlarm", value: 30.0},
    {name: "minAlarm", value: 18.0},
  ]

  private readonly measurementService: MeasurementService = inject(MeasurementService);
  private readonly route = inject(ActivatedRoute);
  private readonly measurementState = inject(MeasurementState);
  private readonly chartService: ChartService = inject(ChartService);
  private readonly router = inject(Router);
  public latestMeasurement: LatestMeasurement | undefined;

  constructor() {
    this.colorScheme = colorSets.find(s => s.name === 'vivid')!;
  }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    await this.measurementState.selectId(id);
    this.latestMeasurement = this.measurementState.filteredBySelection();
    if (this.latestMeasurement) {
      this.historyData = await this.measurementService.getMeasurementHistory(this.latestMeasurement.sensorId);
      this.prepareChartData();
    } else {
      //Toast routes to Dashboard
    }
  }

  async navigateBack() {
    await this.router.navigate(['dashboard']);
  }

  prepareChartData() {
    if (this.historyData) {
      this.yScaleMax = this.chartService.calculateYScaleMax(this.historyData.data);
      this.yScaleMin = this.chartService.calculateYScaleMin(this.historyData.data);
      this.referenceLines = this.chartService.calculateReferenceLines(this.historyData.data);
      this.chartData = this.historyData.data;
    }
  }

  protected readonly mdiFilter = mdiFilter;
}
