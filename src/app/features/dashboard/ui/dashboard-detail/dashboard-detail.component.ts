import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {MeasurementService} from "../../service/measurement.service";
import {MeasurementHistory} from "../../model/measurementHistory.model";
import {ActivatedRoute} from "@angular/router";
import {LatestMeasurement} from "../../model/measurement.model";
import {mdiFilter} from "@mdi/js";
import {IconButtonComponent} from "../../../../shared/components/icon-button/icon-button.component";
import { Router } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { DateRange } from '../../model/date-range.model';
import { DateTimeUtil } from '../../../../shared/util/date.util';

@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [IconButtonComponent, ChartComponent, DateRangeComponent],
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardDetailComponent implements OnInit {

  private readonly measurementService: MeasurementService = inject(MeasurementService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly id = this.route.snapshot.params['id'];

  public historyData: WritableSignal<MeasurementHistory | undefined> = signal(undefined);

  async ngOnInit() {
    const start = DateTimeUtil.subtract(new Date(), 1, 'day');
    DateTimeUtil.setHoursAndMinutesToZero(start);
    const end = new Date();
    DateTimeUtil.setHoursAndMinutesToZero(end);
    const history = await this.measurementService.getMeasurementHistory(this.id, start, end);
    if (history) {
      this.historyData.set(history);
    }
  }

  async navigateBack() {
    await this.router.navigate(['dashboard']);
  }

  protected readonly mdiFilter = mdiFilter;

  async onDateSelection($event: DateRange) {
    const history = await this.measurementService.getMeasurementHistory(this.id, $event.from, $event.to);
    this.historyData.set(history);
  }
}
