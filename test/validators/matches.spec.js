import { matches, tests } from '../../src/validators';
import { string, boolean, isValidSync } from '../../src';

describe('validators - matches', () => {
  it('should match', () => {
    const schema = string(tests(matches(new RegExp(/fred/, 'i'))));
    expect(isValidSync(schema, 'FREd')).toBe(true);
    expect(isValidSync(schema, '')).toBe(true);
  });

  it('should not validate an empty string', () => {
    const explicit = matches(new RegExp(/fred/, 'i'), {
      validateEmpty: false,
    });
    const implicit = matches(new RegExp(/fred/, 'i'));
    expect(isValidSync(string(tests(explicit)), '')).toBe(true);
    expect(isValidSync(string(tests(implicit)), '')).toBe(true);
  });

  it('should validate empty string', () => {
    const empty = matches(new RegExp(/fred/, 'i'), { validateEmpty: true });
    expect(isValidSync(string(tests(empty)), '')).toBe(false);
  });

  it('should warn with a non-string schema', () => {
    const m = jest.spyOn(console, 'warn').mockImplementation();
    const schema = boolean(tests(matches(/fred/)));
    expect(isValidSync(schema, true)).toBe(true);
    expect(m).toHaveBeenCalledTimes(1);

    m.mockRestore();
  });
});
