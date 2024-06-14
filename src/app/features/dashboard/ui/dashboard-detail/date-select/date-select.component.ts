import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DateAdapterProviders } from '../../../../../shared/util/app-date.adapter';
import { DateRange } from '../../../model/date-range.model';
import { FormsModule } from '@angular/forms';

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
export class DateSelectComponent {
  selectedDate: WritableSignal<Date> = signal(new Date());
  maxDate = new Date();

  @Output() dateSelection = new EventEmitter<DateRange>();

  onDateChange() {
    const range: DateRange = {
      from: this.selectedDate(),
      to: this.selectedDate(),
    };
    this.dateSelection.emit(range);
  }
}
