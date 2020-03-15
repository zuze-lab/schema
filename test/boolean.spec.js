import { boolean, cast, validateSync, typeError } from '../src';

describe('boolean', () => {
  it('should cast a string or a number', () => {
    expect(cast(boolean(), 1)).toBe(true);
    expect(cast(boolean(), '1')).toBe(true);
    expect(cast(boolean(), 'true')).toBe(true);
    expect(cast(boolean(), true)).toBe(true);
    expect(cast(boolean(), 0)).toBe(false);
    expect(cast(boolean(), '0')).toBe(false);
    expect(cast(boolean(), 'false')).toBe(false);
    expect(cast(boolean(), false)).toBe(false);

    // cannot be cast
    expect(() => cast(boolean(), 'ture')).toThrow();
  });

  it('should respect typeErrors', () => {
    expect(() => validateSync(boolean(typeError('not gud')), 'ture')).toThrow(
      'not gud'
    );
  });
});
