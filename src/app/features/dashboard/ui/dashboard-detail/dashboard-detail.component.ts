import {Component, inject, OnInit} from '@angular/core';
//import {temperatureMeasurementsHistory} from "../../../../../../mock/temperatureMeasurementHistory.mock";
import {MeasurementService} from "../../service/measurement.service";
import {MeasurementHistory, MeasurementHistorySensor} from "../../model/measurementHistory.model";
import {colorSets, LegendPosition, NgxChartsModule} from "@swimlane/ngx-charts";
import {ActivatedRoute} from "@angular/router";
import {MeasurementState} from "../../+state/measurement.state";
import {LatestMeasurement} from "../../model/measurement.model";
import {mdiFilter} from "@mdi/js";
import {IconButtonComponent} from "../../../../shared/components/icon-button/icon-button.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [NgxChartsModule, IconButtonComponent],
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.scss'
})
export class DashboardDetailComponent implements OnInit {
  public historyData: MeasurementHistory;
  public chartData: MeasurementHistorySensor[];
  public measurementItemName: string = '';

  view: [number, number] = [370, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  //yScaleMin = 0;
  //yScaleMax = 40;
  roundDomains = true;
  autoScale = true;
  legendPosition: LegendPosition = LegendPosition.Below
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private readonly measurementService: MeasurementService = inject(MeasurementService);
  private readonly route = inject(ActivatedRoute);
  private readonly measurementState = inject(MeasurementState);
  private readonly router = inject(Router);
  public latestMeasurement: LatestMeasurement | undefined;

  constructor() {
    this.colorScheme = colorSets.find(s => s.name === 'vivid')!;
  }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    await this.measurementState.selectId(id);
    this.latestMeasurement = this.measurementState.filteredBySelection();
    console.log(this.latestMeasurement);
    console.log(this.measurementState.entities());
    if (this.latestMeasurement) {
      console.log(this.latestMeasurement);
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
      this.chartData = this.historyData.data;
    }
  }

  protected readonly mdiFilter = mdiFilter;
}
