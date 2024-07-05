import { PrettyNamePipe } from './pretty-name.pipe';

describe('PrettyNamePipe', () => {
  let pipe: PrettyNamePipe;

  beforeEach(() => {
    pipe = new PrettyNamePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform camelCase to pretty name', () => {
    expect(pipe.transform('camelCase')).toBe('CAMEL CASE');
    expect(pipe.transform('thisIsATest')).toBe('THIS IS A TEST');
  });

  it('should handle single word', () => {
    expect(pipe.transform('word')).toBe('WORD');
  });

  it('should handle empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle already pretty names', () => {
    expect(pipe.transform('ALREADY PRETTY')).toBe('ALREADY PRETTY');
  });

  it('should handle strings with multiple capital letters', () => {
    expect(pipe.transform('someABCTest')).toBe('SOME ABC TEST');
  });
});
