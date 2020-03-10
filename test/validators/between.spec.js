import { between, tests } from '../../src/validators';
import { number, isValidSync, isValid } from '../../src';

describe('validators - between', () => {
  it('should work', async () => {
    const schema = number(tests(between(4, 10)));
    expect(isValidSync(schema, 7)).toBe(true);
    await expect(isValid(schema, 11)).resolves.toBe(false);
  });
});
