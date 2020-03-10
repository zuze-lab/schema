import { mixed, isValidSync, object, string, ref } from '../../src';
import { tests, not } from '../../src/validators';
import { def } from '../../src/utils';

describe('validators - not', () => {
  it('should work', () => {
    const schema = mixed(tests(not('fred')));
    expect(isValidSync(schema, 'fred')).toBe(false);
    expect(isValidSync(schema, 'joe')).toBe(true);
  });

  it('should work with a ref', () => {
    const field2 = string(tests(not(ref('field1'))));
    const schema = object({ field1: mixed(def('fred')), field2 });

    expect(isValidSync(schema, { field2: 'fred' })).toBe(false);
    expect(isValidSync(schema, { field2: 'joe' })).toBe(true);
  });
});
