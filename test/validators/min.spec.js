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
import { tests, min } from '../../src/validators';
import { label, def } from '../../src/utils';

describe('validators - min', () => {
  it('should work with a string', () => {
    const schema = string(tests(min(6)), label('my string'));

    expect(() => validateSync(schema, 'shor')).toThrow(
      'my string must not be shorter than 6 characters'
    );

    expect(isValidSync(schema, 'short')).toBe(false);
    expect(isValidSync(schema, 'not short')).toBe(true);
  });

  it('should work with an array', () => {
    const schema = array(string(), tests(min(2)), label('my array'));

    expect(() => validateSync(schema, ['one'])).toThrow(
      'my array must have at least 2 items'
    );

    expect(isValidSync(schema, [])).toBe(false);
    expect(isValidSync(schema, ['one', 'two'])).toBe(true);
  });

  it('should work with a date', () => {
    const schema = date(tests(min('1970-10-01')));
    expect(isValidSync(schema, '1970-09-01')).toBe(false);
    expect(isValidSync(schema, '1970-11-01')).toBe(true);
  });

  it('should work with a number', () => {
    const schema = number(tests(min(2.1)));

    expect(isValidSync(schema, 2.0)).toBe(false);
    expect(isValidSync(schema, 2.1)).toBe(true);
  });

  it('should work with a ref', () => {
    const field2 = string(tests(min(ref('field1'))));

    expect(
      isValidSync(object({ field1: number(def(3)), field2 }), { field2: 's2' })
    ).toBe(false);
    expect(
      isValidSync(object({ field1: number(def(3)), field2 }), {
        field2: 'longer than 3',
      })
    ).toBe(true);
  });

  it('should warn with anything else', () => {
    const m = jest.spyOn(console, 'warn').mockImplementation();
    const schema = boolean(tests(min(6)));
    expect(isValidSync(schema, true)).toBe(true);
    expect(m).toHaveBeenCalledTimes(1);

    m.mockRestore();
  });

  it('should obey inclusive flag', () => {
    const exclusive = tests(min(2, { inclusive: false }));
    const inclusive = tests(min(2));
    expect(isValidSync(string(exclusive), 'ab')).toBe(false);
    expect(isValidSync(string(inclusive), 'ab')).toBe(true);
  });
});
