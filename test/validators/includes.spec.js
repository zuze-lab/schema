import {
  mixed,
  isValidSync,
  object,
  string,
  ref,
  array,
  validateSync,
} from '../../src';
import { tests, includes } from '../../src/validators';
import { def } from '../../src/utils';

describe('validators - includes', () => {
  it('should work', () => {
    const t = tests(includes('fred'));
    const stringSchema = string(t);
    const arraySchema = array(string(), t);
    expect(isValidSync(stringSchema, 'fred')).toBe(true);
    expect(isValidSync(arraySchema, ['fred', 'joe', 'bill'])).toBe(true);
    expect(isValidSync(stringSchema, 'joe')).toBe(false);
    expect(isValidSync(arraySchema, ['jim', 'joe', 'bill'])).toBe(false);
  });

  it('should work with a ref', () => {
    const t = tests(includes(ref('field1')));
    const stringSchema = object({
      field1: mixed(def('fred')),
      field2: string(t),
    });
    const arraySchema = object({
      field1: mixed(def('fred')),
      field2: array(string(), t),
    });

    expect(isValidSync(stringSchema, { field2: 'fred' })).toBe(true);
    expect(isValidSync(arraySchema, { field2: ['fred', 'joe', 'bill'] })).toBe(
      true
    );
    expect(isValidSync(stringSchema, { field2: 'joe' })).toBe(false);
    expect(isValidSync(arraySchema, { field2: ['jim', 'joe', 'bill'] })).toBe(
      false
    );
  });
});
