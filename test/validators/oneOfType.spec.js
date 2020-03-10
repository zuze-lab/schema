import { isValidSync, isValid, object, mixed } from '../../src';
import { tests, oneOfType, required } from '../../src/validators';

describe('validators - oneOfType', () => {
  it('should throw an error if not passed an array', () => {
    const first = object({ field1: mixed(tests(required())) });
    const second = object({ field2: mixed(tests(required())) });
    expect(() => oneOfType(first, second)).toThrow(
      `First argument passed to oneOfType must be an array`
    );
  });

  it('should validate oneOfType (sync)', () => {
    const first = object({ field1: mixed(tests(required())) });
    const second = object({ field2: mixed(tests(required())) });

    expect(
      isValidSync(mixed(tests(oneOfType([first, second]))), { field2: 'fred' })
    ).toBe(true);

    expect(
      isValidSync(mixed(tests(oneOfType([first, second]))), { unknown: 'jim' })
    ).toBe(false);
  });

  it('should validate oneOfType (async)', async () => {
    const first = object({ field1: mixed(tests(required())) });
    const second = object({ field2: mixed(tests(required())) });

    await expect(
      isValid(mixed(tests(oneOfType([first, second]))), { field2: 'fred' })
    ).resolves.toBe(true);

    await expect(
      isValid(mixed(tests(oneOfType([first, second]))), { unknown: 'jim' })
    ).resolves.toBe(false);
  });
});
