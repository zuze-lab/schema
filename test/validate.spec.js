import {
  mixed,
  validate,
  validateSync,
  string,
  object,
  number,
  conditional,
  condition,
  isValidSyncAt,
  validateSyncAt,
  isValidSync,
} from '../src';
import { tests, defined, min, max, test as t } from '../src/validators';

const check = (schema, val, { sync, abortEarly } = {}) =>
  (sync ? validateSync : validate)(schema, val, { sync, abortEarly });

const err = fn => {
  try {
    const r = fn();
  } catch (err) {
    return err.inner;
  }
};

describe('validate', () => {
  it('should do nothing if no tests', async () => {
    expect(() => check(mixed())).not.toThrow();
    await expect(check(mixed())).resolves.toBeUndefined();
    await expect(check(mixed(), 'val')).resolves.toBe('val');
  });

  it('should validate', async () => {
    await expect(validate(mixed(tests(defined())))).rejects.toBeTruthy();
    await expect(validate(mixed(tests(defined())), '')).resolves.toBe('');
  });

  it('should validateSync', () => {
    const sync = (schema, val) => check(schema, val, { sync: true });
    const schema = mixed(tests(defined()));
    expect(() => sync(schema, undefined)).toThrow();
    expect(() => sync(schema, '')).not.toThrow();
  });

  it('should abort early', async () => {
    const schema = string(tests(min(10), max(1)));

    const rethrow = w =>
      w.catch(({ inner }) => {
        throw inner;
      });

    // async
    await expect(rethrow(check(schema, 'fail'))).rejects.toHaveLength(2);
    await expect(
      rethrow(check(schema, 'fail', { abortEarly: true }))
    ).rejects.toHaveLength(1);

    // sync
    expect(err(() => check(schema, 'fail', { sync: true }))).toHaveLength(2);
    expect(
      err(() => check(schema, 'fail', { sync: true, abortEarly: true }))
    ).toHaveLength(1);
  });

  it('should throw an error if a non-test is passed to tests', () => {
    expect(() => tests('not a test')).toThrow();
  });

  it('should validateAt', () => {
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

    expect(
      isValidSyncAt('top.field1.field2', schema, {
        top: { field1: { field2: 4 } },
      })
    ).toBe(true);

    expect(
      validateSyncAt('top.field1.field2', schema, {
        top: { field1: { field2: 4 } },
      })
    ).toBe(4);

    expect(
      isValidSyncAt('top.field1.field2', schema, {
        top: { field1: { field2: 4 } },
        field3: 'bill',
      })
    ).toBe(false);

    expect(() =>
      validateSyncAt('top.field1.field2', schema, {
        top: { field1: { field2: 4 } },
        field3: 'bill',
      })
    ).toThrow();
  });

  it('should warn, but complete when an async validator is being run synchronously', () => {
    const v = t('async', () => Promise.reject('error'));
    expect(isValidSync(mixed(tests(v)), 'jim')).toBe(true);
  });
});
