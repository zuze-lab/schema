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
});
