import {
  mixed,
  isValidSync,
  object,
  string,
  ref,
  getErrorsSync,
} from '../../src';
import { tests, is } from '../../src/validators';
import { def, messages } from '../../src/utils';

describe('validators - is', () => {
  it('should work', () => {
    const schema = mixed(tests(is('fred')));
    expect(getErrorsSync(schema, 'joe')).toBe('field must be fred');
    expect(isValidSync(schema, 'fred')).toBe(true);
    expect(isValidSync(schema, 'joe')).toBe(false);
  });

  it('should work with a ref', () => {
    const field2 = string(tests(is(ref('field1'))));
    const schema = object({ field1: mixed(def('fred')), field2 });
    expect(getErrorsSync(schema, { field2: 'joe' })).toMatchObject({
      field2: 'field2 must be fred',
    });
    expect(isValidSync(schema, { field2: 'fred' })).toBe(true);
    expect(isValidSync(schema, { field2: 'joe' })).toBe(false);
  });
});
