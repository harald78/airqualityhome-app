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

  static setHoursAndMinutesToZero(date: Date): void {
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
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
