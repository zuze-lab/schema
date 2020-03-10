import { notOneOf, tests } from '../../src/validators';
import { isValidSync, ref, mixed, object } from '../../src';
import { def } from '../../src/utils';

describe('validators - notOneOf', () => {
  it('should validate', () => {
    expect(isValidSync(mixed(tests(notOneOf([1, 2, 3]))), 1)).toBe(false);
    expect(isValidSync(mixed(tests(notOneOf([1, 2, 3]))), 5)).toBe(true);
  });

  it('should validate with a ref', () => {
    const s = object({
      field1: mixed(tests(notOneOf([ref('a'), ref('b')]))),
    });

    expect(isValidSync(s, { field1: 'jim', a: 'jim' })).toBe(false);
    expect(isValidSync(s, { field1: 'jim', b: 'jim' })).toBe(false);
    expect(isValidSync(s, { field1: 'jim' })).toBe(true);
  });

  it('should validate with a relative ref', () => {
    const s = object({
      field1: mixed(def('bill')),
      field2: object({
        field3: mixed(tests(notOneOf([ref('.field1')]))),
      }),
    });

    expect(isValidSync(s, { field2: { field3: 'joe' } })).toBe(true);
    expect(isValidSync(s, { field2: { field3: 'bill' } })).toBe(false);
  });
});
