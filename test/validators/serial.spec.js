import {
  string,
  tests,
  serial,
  validateSync,
  validate,
  test as t,
} from '../../src';

describe('validators - serial', () => {
  it('should run tests serially (sync)', () => {
    const first = t(
      'bill',
      jest.fn(() => false)
    );
    const second = t(
      'fred',
      jest.fn(() => false)
    );

    const schema = string(tests(serial(first, second)));

    try {
      validateSync(schema, 'myval', { abortEarly: false });
      expect(1).toBe(2);
    } catch (err) {
      expect(second.test).not.toHaveBeenCalled();
    }
  });

  it('should run tests serially (async)', async () => {
    const firstAsync = async val => {
      // do something async
      // const result = await someAsyncFunc(val)
      return val === 'bad';
    };

    const secondAsync = async val => {
      // do something async
      // const result = await someAsyncFunc(val)
      return val === 'good';
    };

    const schema = string(
      tests(
        serial(
          t('firstAsync', firstAsync, { message: 'Failed Async 1' }),
          t('secondAsync', secondAsync, { message: 'Failed Async 2' })
        )
      )
    );

    await expect(
      validate(schema, 'good', { abortEarly: false })
    ).rejects.toMatchObject({ message: 'Failed Async 1' });

    await expect(
      validate(schema, 'bad', { abortEarly: false })
    ).rejects.toMatchObject({ message: 'Failed Async 2' });
  });
});
