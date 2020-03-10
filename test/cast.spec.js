import { string, cast, mixed, date } from '../src';
import { def, nullable } from '../src/utils';
import { transforms } from '../src/transforms';

describe('cast', () => {
  it('should cast', () => {
    expect(cast(mixed(), 'fred')).toBe('fred');
  });

  it('should return the default if undefined', () => {
    expect(cast(mixed(def('fred')))).toBe('fred');
  });

  it('should throw an error if null is passed on a not nullable schema', () => {
    expect(() => cast(mixed(), null)).toThrow();
  });

  it('should accept null if schema is nullable', () => {
    expect(() => cast(mixed(nullable()), null)).not.toThrow();
  });

  it('should NOT throw an error if null is passed on a not nullable schema if !assert', () => {
    expect(() => cast(mixed(), null, { assert: false })).not.toThrow();
  });

  it('should run sequential transforms', () => {
    const first = jest.fn(() => 'first');
    const second = jest.fn(() => 'second');
    const third = jest.fn(() => 'third');

    const s = mixed(transforms(first, second, third));
    const value = 'jim';
    const result = cast(s, value);
    expect(result).toBe('third');
    expect(first).toHaveBeenCalledTimes(1);
    expect(first.mock.calls[0][0]).toBe(value); // val
    expect(first.mock.calls[0][1]).toBe(value); // original

    expect(second.mock.calls[0][0]).toBe(first.mock.results[0].value); // val
    expect(second.mock.calls[0][1]).toBe(value); // original

    expect(third.mock.calls[0][0]).toBe(second.mock.results[0].value); // val
    expect(third.mock.calls[0][1]).toBe(value); // original
  });

  it('should not run transforms if the value is undefined', () => {
    const first = jest.fn(() => 'first');
    const second = jest.fn(() => 'second');
    const third = jest.fn(() => 'third');

    const s = mixed(transforms(first, second, third));
    const result = cast(s, undefined);
    expect(result).toBeUndefined();
    expect(first).not.toHaveBeenCalled();
    expect(second).not.toHaveBeenCalled();
    expect(third).not.toHaveBeenCalled();
  });

  it('should not run transforms if strict', () => {
    const first = jest.fn(() => 'first');
    const second = jest.fn(() => 'second');
    const third = jest.fn(() => 'third');

    const s = mixed(transforms(first, second, third));
    const value = 'fred';
    const result = cast(s, value, { strict: true });
    expect(result).toBe(value);
    expect(first).not.toHaveBeenCalled();
    expect(second).not.toHaveBeenCalled();
    expect(third).not.toHaveBeenCalled();
  });

  it('should throw an error if the value does not pass the schema typeCheck', () => {
    expect(() => cast(date(), '')).toThrow();
  });

  it('should throw an error if the transformed value does not pass the type check', () => {
    const fn = () => cast(string(transforms(() => 9)), 'fred');
    expect(fn).toThrow();
  });

  it('should NOT throw an error if the transformed value does not pass the type check if !assert', () => {
    const fn = () =>
      cast(string(transforms(() => 9)), 'fred', { assert: false });
    expect(fn).not.toThrow();
  });
});
