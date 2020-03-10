import { object, mixed, cast } from '../src';
import { def } from '../src/utils';
import { shape } from '../src/object';

describe('object', () => {
  it('should construct', () => {
    expect(() => object({})).not.toThrow();
  });

  it('should accept a shape', () => {
    const schemaShape = { field1: mixed() };
    expect(() => object(schemaShape)).not.toThrow();
    expect(() => object(shape(schemaShape))).not.toThrow();
  });

  it('should throw if the shape is invalid', () => {
    expect(() => object(shape())).not.toThrow();
    expect(() => object(shape({ field1: 'fred' }))).toThrow();
  });

  it('should cast a shape', () => {
    expect(cast(object({ field1: mixed() })).field1).toBeUndefined();
  });

  it('should cast a shape (nested)', () => {
    const field1 = object({ field1: mixed(def('fred')) });
    expect(cast(object({ field1 }))).toMatchObject({
      field1: { field1: 'fred' },
    });
  });
});
