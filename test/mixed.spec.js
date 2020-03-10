import { mixed, cast } from '../src';
import { def } from '../src/utils';

describe('mixed', () => {
  it('should should create a schema', () => {
    const s = mixed();
    expect(s.test).toEqual([]);
    expect(s.transform).toEqual([]);
    expect(s.condition).toEqual([]);
    expect(s).toHaveProperty('label');
    expect(s).toHaveProperty('meta');
    expect(s).toHaveProperty('nullable');
    expect(s).toHaveProperty('lazy');
    expect(s).toHaveProperty('default');
  });

  it('should add a default', () => {
    expect(cast(mixed(def('fred')))).toBe('fred');
    expect(cast(mixed(def(() => 'fred')))).toBe('fred');
  });

  it('should properly handle exclusive validators', () => {});
});
