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

  it('should create conditional schemas', () => {
    const schema = {
      schema: 'object',
      shape: {
        fieldA: {
          conditions: [
            {
              when: {
                fieldB: { tests: [['is', 'jim'], 'required'] },
              },
              then: {
                schema: 'number',
                tests: [['min', 10]],
              },
              otherwise: {
                schema: 'string',
                tests: [['max', 5]],
              },
            },
          ],
        },
      },
    };

    expect(matches(schema, { fieldA: 'not short' })).toBe(false);
    expect(matches(schema, { fieldA: 'short' })).toBe(true);
    expect(matches(schema, { fieldB: 'jim', fieldA: 9 })).toBe(false);
    expect(matches(schema, { fieldB: 'jim', fieldA: 10 })).toBe(true);
  });

  it('should create a conditional schema using context', () => {
    const schema = {
      schema: 'mixed',
      conditions: [
        {
          when: {
            '#some.context.path': { tests: [['includes', 'joe']] },
          },
          then: {
            schema: 'string',
            tests: ['required', ['max', 5]],
          },
          otherwise: {
            schema: 'number',
            tests: ['required', ['min', 10]],
          },
        },
      ],
    };

    const thenContext = { some: { context: { path: ['joe', 'bill'] } } };
    const otherwiseContext = { some: { context: { path: ['fred', 'john'] } } };
    const then = { contextPrefix: '#', context: thenContext };
    const otherwise = { contextPrefix: '#', context: otherwiseContext };

    expect(matches(schema, 'short', then)).toBe(true);
    expect(matches(schema, 'not short', then)).toBe(false);
    expect(matches(schema, 5, otherwise)).toBe(false);
    expect(matches(schema, 10, otherwise)).toBe(true);
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
});

/*

```js
{
    schema: 'object' | 'array' | 'string' | 'mixed' | 'date' | 'boolean' | 'number',
    default: 'some value',
    label: 'some label',
    tests:[
        'required', // the name of a validator
        ['max',10] // if an array, the first entry is the name of a validator and all others are passed as arguments to the validator
        ['is',{ref:'$field'}] // works with refs
        ['oneOf',['1','2',{ref:'$field.path'}]], // and nested refs
    ],
    conditions:[
        when: [{
            fieldA: {ast}
            fieldB: {ast}
        }],
        when: ['fieldA','fieldB']
        matches: [
            [
                {tests:['required']},
                {tests:[['oneOf',['jim','joe','bill']]]}
            ],
            {
                tests:['required']
            }
        ],
        how:'some',
        then: AST
        otherwise: AST
    ]

    // when schema is 'array' it can accept "of"
    of: {
        schema: 'string',
        tests: [...]
    },

    // when schema is 'object', it can accept "shape":
    shape: {
        fieldA: { schema: 'string' },
        fieldB: { schema: 'mixed' },
    }
}
```

*/
