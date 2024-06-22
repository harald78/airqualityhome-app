import { UnitPipe } from './unit.pipe';
import {sensorTypeMock} from "../../../../mock/sensor-type.mock";
import {PhysicalType} from "../model/sensor-type.model";

describe('UnitPipe', () => {

  it('create an instance', () => {
    const pipe = new UnitPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return temperature unit', () => {
    // when
    const pipe = new UnitPipe();
    const result = pipe.transform(sensorTypeMock[0].type);

    // then
    expect(result).toEqual("°C");
  });

  it('should return humidity unit', () => {
    // when
    const pipe = new UnitPipe();
    const result = pipe.transform(sensorTypeMock[1].type);

    // then
    expect(result).toEqual("%");
  });

  it('should return particle unit for gas sensor', () => {
    // when
    const pipe = new UnitPipe();
    const result = pipe.transform(sensorTypeMock[2].type);

    // then
    expect(result).toEqual("ppb");
  });

  it('should return particle unit for particle', () => {
    // when
    const pipe = new UnitPipe();
    const result = pipe.transform(sensorTypeMock[3].type);

    // then
    expect(result).toEqual("ppm");
  });

  it('should return pressure unit', () => {
    // when
    const pipe = new UnitPipe();
    const result = pipe.transform(sensorTypeMock[4].type);

    // then
    expect(result).toEqual("hPa");
  });

  it('should return light unit', () => {
    // when
    const pipe = new UnitPipe();
    const result = pipe.transform(sensorTypeMock[5].type);

    // then
    expect(result).toEqual("lx");
  });

  it('should return default empty string', () => {
    const pipe = new UnitPipe();
    const type = {
      id: 1,
      name: "any-sensor",
      type: "NOT_KNOWN" as PhysicalType,
      maxValue: 100,
      minValue: 0
    };
    const result = pipe.transform(type.type);
    expect(result).toEqual("");
  })

});
