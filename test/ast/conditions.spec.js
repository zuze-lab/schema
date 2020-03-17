import { matches } from '../../src/ast';

describe('ast-conditions', () => {
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
});
