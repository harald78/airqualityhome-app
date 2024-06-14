import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {MeasurementService} from "../../service/measurement.service";
import {MeasurementHistory} from "../../model/measurementHistory.model";
import {ActivatedRoute} from "@angular/router";
import {mdiFilter} from "@mdi/js";
import {IconButtonComponent} from "../../../../shared/components/icon-button/icon-button.component";
import { Router } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { DateRangeSelectComponent } from './date-range-select/date-range-select.component';
import { DateRange } from '../../model/date-range.model';
import { DateTimeUtil } from '../../../../shared/util/date.util';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateSelectComponent } from './date-select/date-select.component';

@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [IconButtonComponent,
    ChartComponent, DateRangeSelectComponent, ReactiveFormsModule, FormsModule, DateSelectComponent],
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
  public rangeToggle: WritableSignal<boolean> = signal(false);
  public dataToggle: WritableSignal<boolean> = signal(false);

  async ngOnInit() {
    await this.initDate();
  }

  protected async initDate(): Promise<void> {
    let start = new Date();
    let end = new Date();
    if (this.rangeToggle()) {
      start = DateTimeUtil.subtract(start, 1, 'day');
    }
    start = DateTimeUtil.setDateToStartOfDay(start);
    end = DateTimeUtil.setDateToEndOfDay(end);
    await this.loadData(start, end);
  }

  protected async loadData(start: Date, end: Date) {
    const history = await this.measurementService.getMeasurementHistory(this.id, start, end, this.dataToggle());
    if (history) {
      this.historyData.set(history);
    }
  }

  async navigateBack() {
    await this.router.navigate(['dashboard']);
  }

  protected readonly mdiFilter = mdiFilter;

  async onDateSelection($event: DateRange) {
    const start = DateTimeUtil.setDateToStartOfDay($event.from);
    const end = DateTimeUtil.setDateToEndOfDay($event.to);
    await this.loadData(start, end)
  }
}
