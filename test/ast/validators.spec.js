import { matches } from '../../src/ast';
import { isValidSync, createSchema, test } from '../../src';

describe('ast - validators', () => {
  it('should negate', () => {
    const schema = createSchema({
      schema: 'string',
      tests: [['negate', ['min', 10]]],
    });

    expect(isValidSync(schema, 'short')).toBe(true);
    expect(isValidSync(schema, 'totally not short')).toBe(false);
  });

  it('should oneOfType', () => {
    const schema = createSchema({
      schema: 'string',
      tests: [
        [
          'oneOfType',
          [{ tests: [['is', 'fred']] }, { tests: [['is', 'joe']] }],
        ],
      ],
    });

    expect(isValidSync(schema, 'fred')).toBe(true);
    expect(isValidSync(schema, 'joe')).toBe(true);
    expect(isValidSync(schema, 'jim')).toBe(false);
  });

  it('should serial', () => {
    const first = test(
      'first',
      jest.fn(() => false)
    );
    const second = test('second', jest.fn());
    const make = what => () => () => what;
    const schema = {
      schema: 'string',
      tests: [['serial', ['first', 'second']]],
    };
    const opts = {
      validators: {
        first: opts => (...args) => first,
        second: opts => (...args) => second,
      },
    };

    matches(schema, 'jim', opts);
    expect(first.test).toHaveBeenCalled();
    expect(second.test).not.toHaveBeenCalled();
  });
});
