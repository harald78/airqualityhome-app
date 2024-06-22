import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DateAdapterProviders } from '../../../../../shared/util/app-date.adapter';
import { FormsModule } from '@angular/forms';
import { SelectedDateState } from '../../../+state/date-select.state';

@Component({
  selector: 'app-date-select',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatDatepickerModule,
    FormsModule
  ],
  providers: [DateAdapterProviders],
  templateUrl: './date-select.component.html',
  styleUrl: './date-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateSelectComponent implements OnInit {
  private readonly selectedDateState: SelectedDateState = inject(SelectedDateState);
  dateValue: WritableSignal<Date> = signal(new Date());
  maxDate: Date;

  ngOnInit() {
    this.dateValue.set(this.selectedDateState.startDate());
    this.maxDate = this.selectedDateState.maxDate();
  }

  onDateChange() {
    this.selectedDateState.selectDate(this.dateValue());
  }
}
