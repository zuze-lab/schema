import { oneOf, tests } from '../../src/validators';
import { isValidSync, ref, mixed, object } from '../../src';
import { def, label } from '../../src/utils';

describe('validators - oneOf', () => {
  it('should validate', () => {
    expect(isValidSync(mixed(tests(oneOf([1, 2, 3]))), 1)).toBe(true);
    expect(isValidSync(mixed(tests(oneOf([1, 2, 3]))), 5)).toBe(false);
  });

  it('should validate with a ref', () => {
    const s = object({
      field1: mixed(tests(oneOf([ref('a'), ref('b')]))),
    });

    expect(isValidSync(s, { field1: 'jim', a: 'jim' })).toBe(true);
    expect(isValidSync(s, { field1: 'jim', b: 'jim' })).toBe(true);
    expect(isValidSync(s, { field1: 'jim' })).toBe(false);
  });

  it('should validate with a relative ref', () => {
    const s = object({
      field1: mixed(def('bill'), label('First field')),
      field2: object({
        field3: mixed(tests(oneOf([ref('.field1')]))),
      }),
    });

    expect(isValidSync(s, { field2: { field3: 'joe' } })).toBe(false);
    expect(isValidSync(s, { field2: { field3: 'bill' } })).toBe(true);
  });
});
