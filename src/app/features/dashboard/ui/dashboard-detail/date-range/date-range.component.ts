import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateTimeUtil } from '../../../../../shared/util/date.util';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DateRange } from '../../../model/date-range.model';
import { DateAdapterProviders } from '../../../../../shared/util/app-date.adapter';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule,
    MatInputModule, MatButtonModule, ReactiveFormsModule],
  providers: [DateAdapterProviders],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeComponent {

  private readonly fb: FormBuilder = inject(FormBuilder);
  dateRange: FormGroup;
  currentDate: Date = new Date();
  @Output() dateSelection = new EventEmitter<DateRange>();

  constructor() {
    this.dateRange = this.fb.group({
      'from': new FormControl(DateTimeUtil.subtract(new Date(), 1, 'day'), [Validators.required]),
      'to': new FormControl(this.currentDate, [Validators.required]),
    });
  }

  rangeFilter(date: Date): boolean {
    return DateTimeUtil.isSameOrBefore(date, new Date(), 'day');
  }

  onDateChange() {
    this.dateSelection.emit({...this.dateRange.value} as DateRange)
  }


}
