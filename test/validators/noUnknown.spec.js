import { noUnknown, tests } from '../../src/validators';
import { object, mixed, validateSync, isValidSync } from '../../src';

describe('noUnknown', () => {
  it('should validate', () => {
    const schema = object(
      {
        field1: mixed(),
        field2: mixed(),
        field5: mixed(),
      },
      tests(noUnknown())
    );

    expect(() =>
      validateSync(schema, { field3: null, field4: 'test', field5: 9 })
    ).toThrow('field is invalid');

    expect(isValidSync(schema, { field1: '', field2: '', field5: '' })).toBe(
      true
    );
  });
});
