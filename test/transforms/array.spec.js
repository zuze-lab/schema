import { array, cast } from '../../src';
import { compact, transforms, unique } from '../../src/transforms';

describe('transforms - array', () => {
  it('should cast JSON', () => {
    expect(cast(array(), JSON.stringify(['a', 'b', 'c']))).toEqual([
      'a',
      'b',
      'c',
    ]);
  });

  it('should compact', () => {
    const subject = [null, undefined, 3, 'string', 0];
    expect(cast(array(transforms(compact())), subject)).toEqual([3, 'string']);
  });

  it('should reject', () => {
    const subject = [10, 9, 8, 7, 12];
    expect(cast(array(transforms(compact(v => v < 9))), subject)).toEqual([
      8,
      7,
    ]);
  });

  it('should unique', () => {
    const subject = [10, 9, 10, 12, 12, 2, 7, 2];
    expect(cast(array(transforms(unique())), subject)).toEqual([
      10,
      9,
      12,
      2,
      7,
    ]);
  });

  it('should unique by', () => {
    const subject = [
      { name: 'jim' },
      { name: 'fred' },
      { name: 'bill' },
      { name: 'jim' },
      { name: 'joe' },
      { name: 'bill' },
    ];

    const t = unique((a, b) => a.name === b.name);
    expect(cast(array(transforms(t)), subject)).toEqual([
      { name: 'jim' },
      { name: 'fred' },
      { name: 'bill' },
      { name: 'joe' },
    ]);
  });
});
