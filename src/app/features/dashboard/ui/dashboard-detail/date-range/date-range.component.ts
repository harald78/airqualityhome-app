import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateTimeUtil } from '../../../../../shared/util/date.util';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DateRange } from '../../../model/date-range.model';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule,
    MatInputModule, MatButtonModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss'
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
    return date.getDate() < new Date().getDate();
  }

  onDateChange() {
    this.dateSelection.emit({...this.dateRange.value} as DateRange)
  }


}
