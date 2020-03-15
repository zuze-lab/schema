import { createSchema } from '../../src/ast';
import cast from '../../src/cast';

describe('ast - transforms', () => {
  it('should reject with ast', () => {
    const schema = {
      schema: 'array',
      nullable: true,
      transforms: [['reject', { tests: [['is', 'jim']] }]],
    };

    expect(cast(createSchema(schema), [1, 'jim', 2, 'fred'])).toEqual([
      1,
      2,
      'fred',
    ]);

    expect(cast(createSchema(schema), null)).toBeNull();
  });

  it('should unique with ast', () => {
    const schema = {
      schema: 'array',
      nullable: true,
      transforms: [['unique']],
    };

    const subject = [1, 2, 2];

    expect(cast(createSchema(schema), subject)).toEqual([1, 2]);
    expect(cast(createSchema(schema), null)).toBeNull();
  });

  it('should unique with ast with an arg', () => {
    const schema = {
      schema: 'array',
      nullable: true,
      transforms: [['unique', 'id']],
    };

    const subject = [
      { id: 1, a: 'b' },
      { id: 1, a: 'c' },
      { id: 2, a: 'd' },
    ];

    expect(cast(createSchema(schema), subject)).toHaveLength(2);
    expect(cast(createSchema(schema), null)).toBeNull();
  });
});
