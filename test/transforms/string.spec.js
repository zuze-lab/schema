import { cast, string, nullable } from '../../src';
import {
  transforms,
  trim,
  strip,
  uppercase,
  lowercase,
} from '../../src/transforms';

describe('string transforms', () => {
  it('should not fail when given null', () => {
    expect(cast(string(nullable()), null)).toBe(null);
  });

  it('should uppercase', () => {
    expect(cast(string(nullable(), transforms(uppercase())), null)).toBe(null);
    expect(cast(string(nullable(), transforms(uppercase())), 'first')).toBe(
      'FIRST'
    );
  });

  it('should lowercase', () => {
    expect(cast(string(nullable(), transforms(lowercase())), null)).toBe(null);
    expect(cast(string(nullable(), transforms(lowercase())), 'LAST')).toBe(
      'last'
    );
  });

  it('should trim correctly', () => {
    expect(cast(string(transforms(trim())), '')).toBe('');
    expect(cast(string(transforms(trim())), '  first  ')).toBe('first');
    expect(cast(string(transforms(trim({ end: false }))), '  first  ')).toBe(
      'first  '
    );
    expect(cast(string(transforms(trim({ start: false }))), '  first  ')).toBe(
      '  first'
    );
  });

  it('should strip', () => {
    expect(cast(string(transforms(strip())), ' string with whitespace ')).toBe(
      'stringwithwhitespace'
    );
  });
});
