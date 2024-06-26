import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(duration);

export type timeUnits = 'day' | 'week' | 'month' | 'year' | 'hour' | 'minute' | 'second' |'milliseconds';

export class DateTimeUtil {
  static add(startDate: Date, amount: number, unit: timeUnits): Date {
    this._validateParameters(startDate, amount, unit);
    const newDate = dayjs(startDate).add(amount, unit);
    return newDate.toDate();
  }

  static subtract(startDate: Date, amount: number, unit: timeUnits): Date {
    this._validateParameters(startDate, amount, unit);
    const newDate = dayjs(startDate).subtract(amount, unit);
    return newDate.toDate();
  }

  static getFormattedTimeString(date: Date): string {
    return dayjs(date).format('DD.MM. HH:mm');
  }

  static setDateToStartOfDay(date: Date): Date {
    return dayjs(date).utc(true).startOf('day').toDate();
  }

  static setDateToEndOfDay(date: Date): Date {
    return dayjs(date).utc(true).endOf('day').toDate();
  }

  static isSameOrBefore(date: Date | string, compareDate: Date | string, unit: timeUnits): boolean {
    return dayjs(date).isSame(compareDate, unit) || dayjs(date).isBefore(compareDate, unit);
  }

  static getUtcISOString(date: Date): Date {
    return dayjs.utc(date).toDate();
  }

  static _validateParameters(startDate: Date, amount: number, unit: timeUnits) {
    if (startDate === undefined || startDate === null) {
      throw new Error('You must pass a date value')
    } else if (amount === undefined || amount === null || isNaN(amount)) {
      throw new Error('You must pass a valid amount number')
    } else if (unit === undefined || unit === null) {
      throw new Error('You must pass a valid unit to add')
    }
  }
}
