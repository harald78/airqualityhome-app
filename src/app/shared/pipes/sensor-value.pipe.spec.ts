import { SensorValuePipe } from './sensor-value.pipe';
import { PhysicalType } from '../model/sensor-type.model';

describe('SensorValuePipe', () => {
  let pipe: SensorValuePipe;

  beforeEach(() => {
    pipe = new SensorValuePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform VOC value correctly', () => {
    expect(pipe.transform(123.456, PhysicalType.VOC)).toBe('123');
    expect(pipe.transform(0, PhysicalType.VOC)).toBe('0');
    // @ts-expect-error simulate value null at runtime
    expect(pipe.transform(null, PhysicalType.VOC)).toBe('0');
  });

  it('should transform non-VOC value correctly', () => {
    expect(pipe.transform(123.456, 'other')).toBe('123.46');
    expect(pipe.transform(10001, 'other')).toBe('10001.0');
    expect(pipe.transform(100000, 'other')).toBe('100000');
    // @ts-expect-error simulate value null at runtime
    expect(pipe.transform(null, 'other')).toBe('0');
    expect(pipe.transform(0, 'other')).toBe('0');
  });

  it('should check number size and reduce fixed correctly', () => {
    expect(pipe.checkNumberSizeAndReduceFixed(123.456)).toBe('123.46');
    expect(pipe.checkNumberSizeAndReduceFixed(10001)).toBe('10001.0');
    expect(pipe.checkNumberSizeAndReduceFixed(100000)).toBe('100000');
    // @ts-expect-error simulate value null at runtime
    expect(pipe.checkNumberSizeAndReduceFixed(null)).toBe('0');
    expect(pipe.checkNumberSizeAndReduceFixed(0)).toBe('0');
  });
});
