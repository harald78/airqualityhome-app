import {ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit} from '@angular/core';
import {Color, colorSets, LegendPosition, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';
import {SensorMeasurementHistory} from '../../../model/measurementHistory.model';
import {ChartService} from '../../../service/chart.service';
import {UnitPipe} from "../../../../../shared/pipes/unit.pipe";
import {ReferenceLine} from '../../../model/chart.models';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxChartsModule],
  providers: [UnitPipe, ChartService],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {

  private readonly chartService: ChartService = inject(ChartService);
  public formatYAxisTickFn = this.formatYAxisTick.bind(this);
  public formatXAxisTickFn = this.formatXAxisTick.bind(this);
  public chartData: InputSignal<SensorMeasurementHistory[]> = input([] as SensorMeasurementHistory[]);

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
  legendPosition: LegendPosition = LegendPosition.Below;
  colorScheme: Color = colorSets.find(s => s.name === 'forest')!;
  referenceLines: ReferenceLine[] = [];

  dataToggle = input(false);

  ngOnInit() {
    this.prepareChartData();
  }

  prepareChartData() {
    if (this.chartData()) {
      this.yScaleMax = this.chartService.calculateYScaleMax(this.chartData());
      this.yScaleMin = this.chartService.calculateYScaleMin(this.chartData());
      this.referenceLines = this.chartService.calculateReferenceLines(this.chartData());
    }
  }

  formatYAxisTick(value: number): string {
    return this.chartService.formatYAxisTick(value, this.chartData()[0].type, this.dataToggle());
  }

  formatXAxisTick(value: Date): string {
    return this.chartService.formatXAxisTick(value);
  }
}
