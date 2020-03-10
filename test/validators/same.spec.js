import { mixed, isValidSync, object } from '../../src';
import { tests, same } from '../../src/validators';
import { def } from '../../src/utils';

describe('validators - same', () => {
  it('should work', () => {
    const field2 = mixed(tests(same('field1')));
    const schema = object({
      field1: mixed(def('fred')),
      field2,
    });

    expect(isValidSync(schema)).toBe(true);
    expect(isValidSync(schema, {})).toBe(true);
    expect(isValidSync(schema, { field2: 'jim' })).toBe(false);
    expect(isValidSync(schema, { field2: 'fred' })).toBe(true);
  });

  it('should work with a relative ref', () => {
    const schema = object({
      field1: mixed(def('fred')),
      field2: object({
        field3: mixed(tests(same('.field4.field5'))),
      }),
      field4: object({
        field5: mixed(def('fred')),
      }),
    });

    expect(
      isValidSync(schema, {
        field2: { field3: 'fred' },
      })
    ).toBe(true);

    expect(
      isValidSync(schema, {
        field2: { field3: 'not fred' },
      })
    ).toBe(false);
  });
});
