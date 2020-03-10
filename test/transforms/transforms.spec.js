import { transforms } from '../../src/transforms';

describe('transforms', () => {
  it('should return an object with a key of transforms', () => {
    const a = jest.fn();
    const b = jest.fn();
    expect(transforms(a, b)).toEqual({ transform: [a, b] });
  });

  it('should throw an error if functions are not passed', () => {
    const a = jest.fn();
    const b = jest.fn();
    expect(() => transforms({ a, b })).toThrow();
  });
});
