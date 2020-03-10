import {
  date,
  number,
  string,
  array,
  boolean,
  isValidSync,
  validateSync,
  object,
  ref,
} from '../../src';
import { tests, max } from '../../src/validators';
import { label, def } from '../../src/utils';

describe('validators - max', () => {
  it('should work with a string', () => {
    const schema = string(tests(max(6)), label('my string'));

    expect(() => validateSync(schema, 'not short')).toThrow(
      'my string must not be longer than 6 characters'
    );

    expect(isValidSync(schema, 'short')).toBe(true);
    expect(isValidSync(schema, 'not short')).toBe(false);
  });

  it('should work with an array', () => {
    const schema = array(string(), tests(max(2)), label('my array'));

    expect(() => validateSync(schema, ['one', 'two', 'three'])).toThrow(
      'my array must have no more than 2 items'
    );

    expect(isValidSync(schema, [])).toBe(true);
    expect(isValidSync(schema, ['one', 'two', 'three'])).toBe(false);
  });

  it('should work with a date', () => {
    const schema = date(tests(max('1970-10-01')));

    validateSync(schema, '1970-09-01');

    expect(isValidSync(schema, '1970-09-01')).toBe(true);
    expect(isValidSync(schema, '1970-11-01')).toBe(false);
  });

  it('should work with a number', () => {
    const schema = number(tests(max(2.1)));

    expect(isValidSync(schema, 2.0)).toBe(true);
    expect(isValidSync(schema, 2.2)).toBe(false);
  });

  it('should work with a ref', () => {
    const field2 = string(tests(max(ref('field1'))));

    expect(
      isValidSync(object({ field1: number(def(3)), field2 }), { field2: 's2' })
    ).toBe(true);
    expect(
      isValidSync(object({ field1: number(def(3)), field2 }), {
        field2: 'longer than 3',
      })
    ).toBe(false);
  });

  it('should warn with anything else', () => {
    const m = jest.spyOn(console, 'warn').mockImplementation();
    const schema = boolean(tests(max(6)));
    expect(isValidSync(schema, true)).toBe(true);
    expect(m).toHaveBeenCalledTimes(1);

    m.mockRestore();
  });

  it('should obey inclusive flag', () => {
    const exclusive = tests(max(2, { inclusive: false }));
    const inclusive = tests(max(2));
    expect(isValidSync(string(exclusive), 'ab')).toBe(false);
    expect(isValidSync(string(inclusive), 'ab')).toBe(true);
  });
});
