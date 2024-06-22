import {SelectedDateState} from "./date-select.state";
import {TestBed, waitForAsync} from "@angular/core/testing";

describe('DateSelectState Test', () => {
  let dateState: SelectedDateState;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({});

    dateState = TestBed.inject(SelectedDateState);
  }));

  it('should select date and patch state', () => {
    // given
    const start = new Date(2024, 5, 22, 0, 0);

    // when
    dateState.selectDate(start);

    // then
    expect(dateState.selectedRange()).toEqual({from: start, to: start});
  });


  it('should select date range and patch state', () => {
    // given
    const start = new Date(2024, 5, 22, 0, 0);
    const end = new Date(2024,5, 22, 23, 59);

    // when
    dateState.selectDateRange(start, end);

    // then
    expect(dateState.selectedRange()).toEqual({from: start, to: end});
  });

  it('should reset selected date', () => {
    // given
    const start = new Date(2024, 5, 22, 0, 0);
    const end = new Date(2024,5, 22, 23, 59);
    dateState.selectDateRange(start, end);
    expect(dateState.selectedRange()).toEqual({from: start, to: end});

    // when
    dateState.resetDate();

    // then
    expect(dateState.selectedRange()).not.toEqual({from: start, to: end});
  });

  it('should set range toggle', () => {
    // when
    dateState.setRangeToggle(true);

    // then
    expect(dateState.rangeToggle()).toBeTruthy();
  });

  it('should set range toggle', () => {
    // given
    dateState.setRangeToggle(true);
    expect(dateState.rangeToggle()).toBeTruthy();

    // when
    dateState.setRangeToggle(false);

    // then
    expect(dateState.rangeToggle()).toBeFalsy();
  });

})
