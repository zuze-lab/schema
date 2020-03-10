import { lazy, mixed, cast } from '../src';
import { def } from '../src/utils';

describe('lazy', () => {
  it('should throw an error if no function is given', () => {
    expect(() => lazy()).toThrow();
  });

  it('should be lazy', () => {
    const spy = jest.fn(val => mixed(def(val)));
    const value = 'fred';
    expect(cast(lazy(spy), value)).toBe(value);
    expect(spy).toHaveBeenCalledTimes(1);
    // jest really needs a better matcher
    expect(spy.mock.calls[0][0]).toBe(value);
  });
});
