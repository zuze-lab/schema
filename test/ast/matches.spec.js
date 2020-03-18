import { Date as sDate } from 'sugar-date';
import { matches, createSchema } from '../../src/ast';
import { test as t, cast } from '../../src';

describe('ast - matches', () => {
  it('should create a schema', () => {
    expect(matches({ schema: 'string', tests: ['required'] }, '')).toBe(false);
    expect(matches({ schema: 'string', tests: ['required'] }, 'jim')).toBe(
      true
    );
  });

  it('should work async', async () => {
    await expect(
      matches({ schema: 'string', tests: ['required'] }, '', { sync: false })
    ).resolves.toBe(false);
    await expect(
      matches({ schema: 'string', tests: ['required'] }, 'jim', { sync: false })
    ).resolves.toBe(true);
  });

  it('should accept an array of schemas', () => {
    const first = { schema: 'string', tests: [['oneOf', ['1', '2', '3']]] };
    const second = {
      schema: 'string',
      tests: [['oneOf', ['jim', 'bob', 'joe']]],
    };

    expect(matches([first, second], 'jim')).toBe(true);
    expect(matches([first, second], '1')).toBe(true);
    expect(matches([first, second], 'not a one of')).toBe(false);
  });

  it('should obey all', () => {
    const first = { schema: 'string', tests: [['notOneOf', ['1', '2', '3']]] };
    const second = {
      schema: 'string',
      tests: [['notOneOf', ['jim', 'bob', 'joe']]],
    };

    expect(matches([first, second], 'jim', { all: true })).toBe(false);
    expect(matches([first, second], '1', { all: true })).toBe(false);
    expect(matches([first, second], 'fred', { all: true })).toBe(true);
  });

  it('should resolve refs', () => {
    const schema = { schema: 'string', tests: [['is', { ref: '#field' }]] };
    expect(
      matches(schema, 'joe', { contextPrefix: '#', context: { field: 'joe' } })
    ).toBe(true);

    expect(
      matches(schema, 'joe', { contextPrefix: '#', context: { field: 'jim' } })
    ).toBe(false);
  });

  it('should resolve nested refs', () => {
    const schema = {
      schema: 'string',
      tests: [['oneOf', [{ ref: '#field.first' }, 'blah', '3']]],
    };
    expect(
      matches(schema, 'blah', {
        contextPrefix: '#',
        context: { field: { first: 'joe' } },
      })
    ).toBe(true);

    expect(matches(schema, 'blah', { contextPrefix: '#' })).toBe(true);
  });

  it('should use custom validators', () => {
    const gt3 = () => () => t('gt3', v => v > 3);
    const schema = { schema: 'number', tests: ['gt3'] };
    expect(matches(schema, 4, { validators: { gt3 } })).toBe(true);
    expect(matches(schema, 3, { validators: { gt3 } })).toBe(false);
  });

  it('should throw an error if no validator is found', () => {
    expect(() =>
      createSchema({ schema: 'number', tests: ['not a validator'] })
    ).toThrow();
  });

  it('should create an object schema', () => {
    const schema = {
      schema: 'object',
      shape: {
        fieldA: {
          schema: 'number',
          tests: ['required', ['min', '4']],
        },
        fieldB: {
          schema: 'number',
          tests: [['min', { ref: 'fieldA' }]],
        },
      },
      tests: ['required', 'noUnknown'],
    };

    expect(matches(schema, { fieldA: 4 })).toBe(true);
    expect(matches(schema, { fieldA: 4, fieldB: 3 })).toBe(false);
    expect(matches(schema, { fieldA: 4, fieldB: 5 })).toBe(true);
    expect(matches(schema, { fieldB: 5 })).toBe(false);
    expect(matches(schema, { fieldA: 4, fieldB: 5, fieldC: 'joe' })).toBe(
      false
    );
  });

  it('should accept a date parser', () => {
    const schema = {
      schema: 'date',
    };

    createSchema(schema, { dateParser: sDate });
    const date = cast(
      createSchema(schema, { dateParser: sDate.create }),
      'last Wednesday'
    );
    expect(date).toBeInstanceOf(Date);
    expect(isNaN(date.getTime())).toBe(false);
  });

  it('should throw an error', () => {
    expect(() => createSchema({ schema: 'fred' })).toThrow();
  });

  it('should create an array schema', () => {
    const schema = {
      schema: 'array',
      of: { schema: 'number', tests: [['min', 5]] },
    };

    expect(matches(schema, ['fred'])).toBe(false);
    expect(matches(schema, [4])).toBe(false);
    expect(matches(schema, [5, 7])).toBe(true);
  });

  it('should obey oneOf with a ref', () => {
    const schema = {
      schema: 'object',
      shape: {
        fieldB: {
          tests: [['oneOf', ['a', 9, { ref: 'fieldA' }]]],
        },
        fieldC: {
          tests: [['oneOf', { ref: 'fieldD' }]],
        },
      },
    };

    matches(schema, { fieldA: 'jim', fieldB: 'jim' }); // true
    matches(schema, { fieldA: 'fred', fieldB: 'a' }); // true
    matches(schema, { fieldB: 'jim' }); // false
    matches(schema, { fieldC: 'jim', fieldD: ['joe', 'fred'] }); // false
    matches(schema, { fieldC: 'joe', fieldD: ['joe', 'fred'] }); // true
  });
});
