import {ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {MeasurementService} from "../../service/measurement.service";
import {MeasurementHistory} from "../../model/measurementHistory.model";
import {ActivatedRoute} from "@angular/router";
import {mdiFilter} from "@mdi/js";
import {IconButtonComponent} from "../../../../shared/components/icon-button/icon-button.component";
import { Router } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { DateRangeSelectComponent } from './date-range-select/date-range-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateSelectComponent } from './date-select/date-select.component';
import { SelectedDateState } from '../../+state/date-select.state';
import {takeUntilDestroyed, toObservable} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";
import {DateTimeUtil} from "../../../../shared/util/date.util";

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
  private readonly selectedDateState: SelectedDateState = inject(SelectedDateState);

  public historyData: WritableSignal<MeasurementHistory | undefined> = signal(undefined);
  public rangeToggle: Signal<boolean> = this.selectedDateState.rangeToggle
  public dataToggle: WritableSignal<boolean> = signal(false);

  constructor() {
    toObservable(this.selectedDateState.selectedRange)
      .pipe(takeUntilDestroyed(),
       tap(async (range) => {
          await this.loadData(range.from, range.to);
        })).subscribe()
  }

  async ngOnInit() {
    await this.loadData(this.selectedDateState.startDate(), this.selectedDateState.endDate());
  }

  async onDataToggle(): Promise<void> {
    await this.loadData(this.selectedDateState.startDate(), this.selectedDateState.endDate());
  }

  async onRangeToggle(): Promise<void> {
    this.selectedDateState.setRangeToggle(!this.selectedDateState.rangeToggle());
    this.selectedDateState.resetDate();
    await this.loadData(this.selectedDateState.startDate(), this.selectedDateState.endDate());
  }

  protected async loadData(start: Date, end: Date) {
    const from = DateTimeUtil.setDateToStartOfDay(start);
    const to = DateTimeUtil.setDateToEndOfDay(end);
    const history = await this.measurementService.getMeasurementHistory(this.id, from, to, this.dataToggle());
    if (history) {
      this.historyData.set(history);
    }
  }

  async navigateBack() {
    await this.router.navigate(['dashboard']);
  }

  protected readonly mdiFilter = mdiFilter;
}
