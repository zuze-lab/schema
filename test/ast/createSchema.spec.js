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

  it('should reject with ast', () => {
    const schema = {
      schema: 'array',
      transforms: [['reject', { tests: [['is', 'jim']] }]],
    };

    expect(cast(createSchema(schema), [1, 'jim', 2, 'fred'])).toEqual([
      1,
      2,
      'fred',
    ]);
  });

  it('should unique with ast', () => {
    const schema = {
      schema: 'array',
      transforms: [['unique', 'id']],
    };

    const subject = [
      { id: 1, a: 'b' },
      { id: 1, a: 'c' },
      { id: 2, a: 'd' },
    ];

    expect(cast(createSchema(schema), subject)).toHaveLength(2);
  });
});
