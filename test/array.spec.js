import {
  array,
  object,
  conditional,
  mixed,
  cast,
  string,
  of,
  number,
  validateSync,
} from '../src';
import { condition } from '../src/conditions';
import { def, nullable, label } from '../src/utils';
import { tests, min, required } from '../src/validators';

describe('array', () => {
  it('should construct', () => {
    expect(cast(array(string()), [1, 2, 3])).toEqual(['1', '2', '3']);
  });

  it('should throw an error if of is not a schema', () => {
    expect(() => of('fred')).toThrow();
  });

  it('should throw an error if `of` is not an array of schemas', () => {
    expect(() => of(['fred'])).toThrow();
  });

  it('should accept of', () => {
    expect(cast(array(tests(min(2)), of(string())), [1, 2, 3])).toEqual([
      '1',
      '2',
      '3',
    ]);
  });

  it('should cast a tuple', () => {
    expect(cast(array(of([string(), number()])), [1, '2'])).toEqual(['1', 2]);
  });

  it('should validate a tuple', () => {
    const schema = object({
      users: array(
        array([
          string(label('first name'), tests(required())),
          string(label('last name'), tests(required())),
        ]),
        tests(min(1))
      ),
    });

    expect(validateSync(schema, { users: [['freddie', 'mercury']] })).toEqual({
      users: [['freddie', 'mercury']],
    });
  });

  it('should handle refs correctly', () => {
    const spy = jest.fn(() => mixed());
    const s = conditional(condition('field2', spy));
    const arr = object({ field: array(s), field2: mixed(def('fred')) });

    cast(arr, { field: ['a'] });
    expect(spy.mock.calls[0][0]).toBe('fred');
  });

  it('should result in null if it cannot be cast', () => {
    const inner = string(tests(required()));
    expect(cast(array(nullable(), of(inner)), 'joe')).toBeNull();
    expect(validateSync(array(nullable(), of(inner)), 'joe')).toBeNull();
  });
});
