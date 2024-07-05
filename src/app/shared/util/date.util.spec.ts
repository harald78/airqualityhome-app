import { DateTimeUtil } from './date.util';

describe('DateTimeUtil', () => {
  const testDate = new Date(Date.UTC(2023, 0, 1, 0, 0, 0));

  describe('add', () => {
    it('should add the correct amount of time', () => {
      expect(DateTimeUtil.add(testDate, 1, 'day')).toEqual(new Date(Date.UTC(2023, 0, 2, 0, 0, 0)));
      expect(DateTimeUtil.add(testDate, 1, 'week')).toEqual(new Date(Date.UTC(2023, 0, 8, 0, 0, 0)));
      expect(DateTimeUtil.add(testDate, 1, 'month')).toEqual(new Date(Date.UTC(2023, 1, 1, 0, 0, 0)));
      expect(DateTimeUtil.add(testDate, 1, 'year')).toEqual(new Date(Date.UTC(2024, 0, 1, 0, 0, 0)));
      expect(DateTimeUtil.add(testDate, 1, 'hour')).toEqual(new Date(Date.UTC(2023, 0, 1, 1, 0, 0)));
      expect(DateTimeUtil.add(testDate, 1, 'minute')).toEqual(new Date(Date.UTC(2023, 0, 1, 0, 1, 0)));
      expect(DateTimeUtil.add(testDate, 1, 'second')).toEqual(new Date(Date.UTC(2023, 0, 1, 0, 0, 1)));
      expect(DateTimeUtil.add(testDate, 1, 'milliseconds')).toEqual(new Date(Date.UTC(2023, 0, 1, 0, 0, 0, 1)));
    });

    it('should throw an error for invalid parameters', () => {
      //@ts-expect-error simulate null at runtime
      expect(() => DateTimeUtil.add(null, 1, 'day')).toThrow('You must pass a date value');
      //@ts-expect-error simulate null at runtime
      expect(() => DateTimeUtil.add(testDate, null, 'day')).toThrow('You must pass a valid amount number');
      //@ts-expect-error simulate null at runtime
      expect(() => DateTimeUtil.add(testDate, 1, null)).toThrow('You must pass a valid unit to add');
    });
  });

  describe('subtract', () => {
    it('should subtract the correct amount of time', () => {
      expect(DateTimeUtil.subtract(testDate, 1, 'day')).toEqual(new Date(Date.UTC(2022, 11, 31, 0, 0, 0)));
      expect(DateTimeUtil.subtract(testDate, 1, 'week')).toEqual(new Date(Date.UTC(2022, 11, 25, 0, 0, 0)));
      expect(DateTimeUtil.subtract(testDate, 1, 'month')).toEqual(new Date(Date.UTC(2022, 11, 1, 0, 0, 0)));
      expect(DateTimeUtil.subtract(testDate, 1, 'year')).toEqual(new Date(Date.UTC(2022, 0, 1, 0, 0, 0)));
      expect(DateTimeUtil.subtract(testDate, 1, 'hour')).toEqual(new Date(Date.UTC(2022, 11, 31, 23, 0, 0)));
      expect(DateTimeUtil.subtract(testDate, 1, 'minute')).toEqual(new Date(Date.UTC(2022, 11, 31, 23, 59, 0)));
      expect(DateTimeUtil.subtract(testDate, 1, 'second')).toEqual(new Date(Date.UTC(2022, 11, 31, 23, 59, 59)));
      expect(DateTimeUtil.subtract(testDate, 1, 'milliseconds')).toEqual(new Date(Date.UTC(2022, 11, 31, 23, 59, 59, 999)));
    });

    it('should throw an error for invalid parameters', () => {
      //@ts-expect-error simulate null at runtime
      expect(() => DateTimeUtil.subtract(null, 1, 'day')).toThrow('You must pass a date value');
      //@ts-expect-error simulate null at runtime
      expect(() => DateTimeUtil.subtract(testDate, null, 'day')).toThrow('You must pass a valid amount number');
      //@ts-expect-error simulate null at runtime
      expect(() => DateTimeUtil.subtract(testDate, 1, null)).toThrow('You must pass a valid unit to add');
    });
  });

  describe('getFormattedTimeString', () => {
    it('should format the date correctly', () => {
      expect(DateTimeUtil.getFormattedTimeString(testDate)).toBe('01.01. 01:00');
    });
  });

  describe('setDateToStartOfDay', () => {
    it('should set the date to the start of the day', () => {
      expect(DateTimeUtil.setDateToStartOfDay(testDate)).toEqual(new Date(Date.UTC(2023, 0, 1, 0, 0, 0)));
    });
  });

  describe('setDateToEndOfDay', () => {
    it('should set the date to the end of the day', () => {
      expect(DateTimeUtil.setDateToEndOfDay(testDate)).toEqual(new Date(Date.UTC(2023, 0, 1, 23, 59, 59, 999)));
    });
  });

  describe('isSameOrBefore', () => {
    it('should return true if the date is the same or before the comparison date', () => {
      const compareDate = new Date(Date.UTC(2023, 0, 2, 0, 0, 0));
      expect(DateTimeUtil.isSameOrBefore(testDate, compareDate, 'day')).toBe(true);
      expect(DateTimeUtil.isSameOrBefore(testDate, testDate, 'day')).toBe(true);
    });

    it('should return false if the date is after the comparison date', () => {
      const compareDate = new Date(Date.UTC(2022, 11, 31, 0, 0, 0));
      expect(DateTimeUtil.isSameOrBefore(testDate, compareDate, 'day')).toBe(false);
    });
  });

  describe('getUtcISOString', () => {
    it('should return the UTC ISO string of the date', () => {
      expect(DateTimeUtil.getUtcISOString(testDate)).toEqual(new Date(Date.UTC(2023, 0, 1, 0, 0, 0)));
    });
  });
});
