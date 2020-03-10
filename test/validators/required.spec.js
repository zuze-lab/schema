import { isValidSync, mixed, string, array } from '../../src';
import { tests, required } from '../../src/validators';

describe('validators - required', () => {
  it('should work', () => {
    expect(isValidSync(mixed(tests(required())))).toBe(false);
    expect(isValidSync(mixed(tests(required())), 'not undefined')).toBe(true);
  });

  it('should work with strings', () => {
    const schema = string(tests(required()));
    expect(isValidSync(schema, '')).toBe(false);
    expect(isValidSync(schema, ' ')).not.toBe(false);
  });

  it('should work with arrays', () => {
    const schema = array(string(), tests(required()));
    expect(isValidSync(schema, [])).toBe(false);
    expect(isValidSync(schema, ['not empty'])).toBe(true);
  });
});
