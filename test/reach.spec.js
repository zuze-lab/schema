import {
  conditional,
  number,
  object,
  reach,
  isValidSync,
  validateSync,
  isValidSyncAt,
} from '../src';
import { tests, min } from '../src/validators';
import { condition } from '../src/conditions';

describe('reach', () => {
  const schema = object({
    top: object({
      field1: object({
        field2: conditional(
          condition('..field3', {
            is: 'bill',
            then: () => number(tests(min(5))),
          })
        ),
      }),
    }),
  });

  it('should throw an error if no schema is found', () => {
    expect(() =>
      reach(schema, 'top.field1.field7', { field3: 'bill' })
    ).toThrow(
      `Cannot resolve schema from top.field1.field7 - failed at field7`
    );
  });

  it('should validate at', () => {
    expect(
      isValidSyncAt('top.field1.field2', schema, {
        top: { field1: { field2: '4' } },
        field3: 'bill',
      })
    ).toBe(false);

    expect(
      isValidSyncAt('top.field1.field2', schema, {
        top: { field1: { field2: '5' } },
        field3: 'bill',
      })
    ).toBe(true);
  });

  it('should resolve to a conditonal schema if no value provided', () => {
    const reached = reach(schema, 'top.field1');
    expect(() => validateSync(reached, {})).toThrow(
      'Relative ref ..field3 at field2 is unable to be resolved - is your ref outside a schema that was REACHed?'
    );
  });

  it('should resolve the conditional schema if the value is provided', () => {
    const reached = reach(schema, 'top.field1.field2', { field3: 'bill' });
    expect(isValidSync(reached, 10)).toBe(true);
    expect(isValidSync(reached, 4)).toBe(false);
  });
});
