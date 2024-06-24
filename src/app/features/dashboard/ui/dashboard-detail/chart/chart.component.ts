import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  Signal,
  computed
} from '@angular/core';
import {Color, colorSets, LegendPosition, NgxChartsModule} from '@swimlane/ngx-charts';
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
export class ChartComponent {

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
  yScaleMin: Signal<number> = computed(() => this.chartService.calculateYScaleMin(this.chartData()));
  yScaleMax: Signal<number> = computed(() => this.chartService.calculateYScaleMax(this.chartData()));
  roundDomains = true;
  autoScale = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  colorScheme: Color = colorSets.find(s => s.name === 'forest')!;
  referenceLines: Signal<ReferenceLine[]> = computed(() => this.chartService.calculateReferenceLines(this.chartData()));

  dataToggle = input(false);

  formatYAxisTick(value: number): string {
    return this.chartService.formatYAxisTick(value, this.chartData()[0].type, this.dataToggle());
  }

  formatXAxisTick(value: Date): string {
    return this.chartService.formatXAxisTick(value);
  }
}
