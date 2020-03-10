import { email, tests } from '../../src/validators';
import { string, validateSync } from '../../src';

describe('validators - email', () => {
  it('should match an email', () => {
    expect(() => validateSync(string(tests(email())), 'not an email')).toThrow(
      'field must be a valid e-mail address'
    );

    expect(() =>
      validateSync(string(tests(email())), 'bill@jim.com')
    ).not.toThrow();
  });
});
