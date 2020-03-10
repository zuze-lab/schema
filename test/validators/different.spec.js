import { mixed, isValidSync, object } from '../../src';
import { tests, different } from '../../src/validators';
import { def } from '../../src/utils';

describe('validators - different', () => {
  it('should work', () => {
    const field2 = mixed(tests(different('field1')));
    const schema = object({
      field1: mixed(def('fred')),
      field2,
    });

    expect(isValidSync(schema)).toBe(true);
    expect(isValidSync(schema, {})).toBe(true);
    expect(isValidSync(schema, { field2: 'jim' })).toBe(true);
    expect(isValidSync(schema, { field2: 'fred' })).toBe(false);
  });
});
