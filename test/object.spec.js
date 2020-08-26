import * as yup from 'yup';
import {
  object,
  mixed,
  cast,
  required,
  tests,
  nullable,
  shape,
  def,
  string,
  createSchema,
  validate,
  validateSync,
  getErrorsSync,
} from '../src';

describe('object', () => {
  it('should construct', () => {
    expect(() => object({})).not.toThrow();
  });

  it('should accept a shape', () => {
    const schemaShape = { field1: mixed() };
    expect(() => object(schemaShape)).not.toThrow();
    expect(() => object(shape(schemaShape))).not.toThrow();
  });

  it('should work with cyclical dependencies', () => {
    // schemas are cyclical, but they can still resolve by value alone
    const s = createSchema({
      schema: 'object',
      shape: {
        field: {
          schema: 'number',
          conditions: [
            {
              when: {
                field2: {
                  tests: ['required'],
                },
              },
              otherwise: {
                tests: ['required'],
              },
            },
          ],
        },
        field2: {
          schema: 'number',
          conditions: [
            {
              when: {
                field: {
                  tests: ['required'],
                },
              },
              otherwise: {
                tests: ['required'],
              },
            },
          ],
        },
      },
    });

    expect(getErrorsSync(s, {}, { abortEarly: false })).toMatchObject({
      field: 'field is required',
      field2: 'field2 is required',
    });
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
