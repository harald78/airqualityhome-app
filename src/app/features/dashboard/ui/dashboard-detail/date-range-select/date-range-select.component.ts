import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateTimeUtil } from '../../../../../shared/util/date.util';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DateRange } from '../../../model/date-range.model';
import { DateAdapterProviders } from '../../../../../shared/util/app-date.adapter';
import { SelectedDateState } from '../../../+state/date-select.state';

@Component({
  selector: 'app-date-range-select',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule,
    MatInputModule, MatButtonModule, ReactiveFormsModule],
  providers: [DateAdapterProviders],
  templateUrl: './date-range-select.component.html',
  styleUrl: './date-range-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeSelectComponent implements OnInit {

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly selectedDateState: SelectedDateState = inject(SelectedDateState);
  dateRange: FormGroup;

  ngOnInit() {
    this.dateRange = this.fb.group({
      'from': new FormControl(this.selectedDateState.startDate(), [Validators.required]),
      'to': new FormControl(this.selectedDateState.endDate(), [Validators.required]),
    });
  }

  rangeFilter(date: Date): boolean {
    return DateTimeUtil.isSameOrBefore(date, new Date(), 'day');
  }

  onDateChange() {
    if (this.dateRange.valid) {
      const range = this.dateRange.value as DateRange;
      this.selectedDateState.selectDateRange(range.from, range.to);
    }
  }


}
