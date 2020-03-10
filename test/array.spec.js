import { array, object, conditional, mixed, cast, string, of } from '../src';
import { condition } from '../src/conditions';
import { def } from '../src/utils';
import { tests, min } from '../src/validators';

describe('array', () => {
  it('should construct', () => {
    expect(cast(array(string()), [1, 2, 3])).toEqual(['1', '2', '3']);
  });

  it('should accept of', () => {
    expect(() => of('fred')).toThrow();
    expect(cast(array(tests(min(2)), of(string())), [1, 2, 3])).toEqual([
      '1',
      '2',
      '3',
    ]);
  });

  it('should handle refs correctly', () => {
    const spy = jest.fn(() => mixed());
    const s = conditional(condition('field2', spy));
    const arr = object({ field: array(s), field2: mixed(def('fred')) });

    cast(arr, { field: ['a'] });
    expect(spy.mock.calls[0][0]).toBe('fred');
  });
});
