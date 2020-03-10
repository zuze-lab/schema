import { string, cast } from '../src';

describe('string', () => {
  it('should cast things to a string', () => {
    expect(cast(string(), 9)).toBe('9');
  });
});
