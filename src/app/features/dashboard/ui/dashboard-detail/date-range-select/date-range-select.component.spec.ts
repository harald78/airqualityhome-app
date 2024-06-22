import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeSelectComponent } from './date-range-select.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {SelectedDateState} from "../../../+state/date-select.state";

describe('DateRangeComponent', () => {
  let component: DateRangeSelectComponent;
  let fixture: ComponentFixture<DateRangeSelectComponent>;
  let dateState: SelectedDateState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangeSelectComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateRangeSelectComponent);
    component = fixture.componentInstance;
    dateState = TestBed.inject(SelectedDateState);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectDateRange on state', () => {
    // given
    const stateSpy = jest.spyOn(dateState, 'selectDateRange');
    const from = new Date(2024, 5, 22, 0, 0);
    const to = new Date(2024, 5, 22, 23, 59);
    component.dateRange.get('from')?.setValue(from);
    component.dateRange.get('to')?.setValue(to);

    // when
    component.onDateChange();

    // then
    expect(stateSpy).toHaveBeenCalledWith(from, to);
  });

  it('should not call selectDateRange on state when form is not valid', () => {
    // given
    const stateSpy = jest.spyOn(dateState, 'selectDateRange');
    const from = new Date(2024, 5, 22, 0, 0);
    component.dateRange.get('from')?.setValue(from);
    component.dateRange.get('to')?.setValue(null);

    // when
    component.onDateChange();

    // then
    expect(stateSpy).not.toHaveBeenCalled();
  });
});
