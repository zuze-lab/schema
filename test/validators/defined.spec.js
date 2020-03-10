import { isValidSync, mixed } from '../../src';
import { tests, defined } from '../../src/validators';
import { nullable } from '../../src/utils';

describe('validators - defined', () => {
  it('should work', () => {
    const schema = mixed(nullable(), tests(defined()));
    expect(isValidSync(schema)).toBe(false);
    expect(isValidSync(schema, null)).toBe(true);
  });
});
