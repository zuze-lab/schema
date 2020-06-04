import { createSchema } from '../../src/ast';
import cast from '../../src/cast';

describe('createSchema', () => {
  it('should be able to create transforms', () => {
    const schema = createSchema({
      schema: 'string',
      transforms: ['uppercase'],
    });

    expect(cast(schema, 'fred')).toBe('FRED');
  });

  it('should throw an error if no transform is found', () => {
    expect(() =>
      createSchema({
        schema: 'array',
        transforms: ['not'],
      })
    ).toThrow('No transform found for not');
  });

  it('should create a schema with relative refs', () => {
    expect(
      cast(
        createSchema({
          schema: 'object',
          shape: {
            fielda: {
              schema: 'object',
              shape: {
                field1: {
                  schema: 'object',
                  shape: {
                    field1: { default: 'bill' },
                    field2: { default: { ref: '.field3.field4' } },
                  },
                },
                field3: {
                  schema: 'object',
                  shape: {
                    field4: { default: { ref: '..field5' } },
                  },
                },
              },
            },
            field5: {
              default: 'joe',
            },
          },
        })
      )
    ).toEqual({
      fielda: {
        field1: {
          field1: 'bill',
          field2: 'joe',
        },
        field3: {
          field4: 'joe',
        },
      },
      field5: 'joe',
    });
  });
});
