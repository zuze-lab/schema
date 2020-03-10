import {
  object,
  cast,
  mixed,
  shape,
  conditional,
  validateSync,
  number,
  boolean,
  string,
} from '../src';
import { conditions, condition, when } from '../src/conditions';
import { def } from '../src/utils';

describe('conditions', () => {
  it('should merge shapes', () => {
    expect(
      cast(
        object(
          {
            field1: mixed(def('field1')),
            field2: mixed(def('original field 2')),
          },
          conditions(
            when('$bill', {
              is: true,
              then: shape({ field2: boolean(def(false)) }),
              otherwise: shape({ field2: number(def(1)) }),
            })
          )
        ),
        {}
      )
    ).toEqual({
      field1: 'field1',
      field2: 1,
    });
  });

  it('should throw an error if changing from one schema type to another', () => {
    expect(() =>
      cast(
        string(
          conditions(
            when('$bill', {
              is: true,
              then: number(),
              otherwise: boolean(),
            })
          )
        ),
        9
      )
    ).toThrow(`Attempted to change schema type`);
  });

  it('should create a conditional schema', () => {
    const spy = jest.fn(() => mixed());
    const s = object({
      field1: mixed(conditions(condition('field2', spy))),
      field2: mixed(def('fred')),
    });

    cast(s);
    expect(spy.mock.calls[0][0]).toBe('fred');
  });

  it('should throw an error if conditions is given a non-condition argument', () => {
    expect(() => conditions('not a condition')).toThrow();
  });

  it('should throw an error if given a malformed condition', () => {
    expect(() =>
      condition({ when: 'field1', is: 'jim', then: mixed() })
    ).toThrow(`Malformed condition`);
  });

  it('should throw an error if one of a then or otherwise is not defined', () => {
    expect(() => condition('field1', { is: 'jim' })).toThrow(
      'One of a then or otherwise is required'
    );
  });

  it('should throw an error if a schema definition is not returned from a resolver function', () => {
    const field3 = conditional(
      condition('field1', {
        is: 'jim',
        then: () => def('bill'),
        otherwise: def('bill'),
      })
    );

    expect(() => cast(object({ field3 }), { field1: 'jim' })).toThrow(
      'A complete schema definition must be returned from a condition resolving function'
    );

    expect(cast(object({ field3 }))).toEqual({ field3: 'bill' });
  });

  it('should create a conditional schema from a condition', () => {
    const field3 = conditional(
      condition(['field1', 'field2'], {
        is: 'jim',
        then: def('bill'),
        otherwise: def('joe'),
      })
    );
    expect(
      validateSync(object({ field3 }), { field1: 'jim', field2: 'jim' })
    ).toEqual(expect.objectContaining({ field3: 'bill' }));

    expect(
      validateSync(object({ field3 }), { field1: 'jim', field2: 'john' })
    ).toEqual(expect.objectContaining({ field3: 'joe' }));
  });

  it('should create a conditional schema with multiple refs', () => {
    const spy = jest.fn(() => mixed());
    const s = object(
      shape({
        field1: mixed(conditions(condition(['field2', 'unknown'], spy))),
        field2: mixed(def('fred')),
      })
    );

    cast(s);
    expect(spy.mock.calls[0][0]).toBe('fred');
    expect(spy.mock.calls[0][1]).toBeUndefined();
  });

  it('should create a conditional schema with a relative ref (🎉)', () => {
    const spy = jest.fn(() => mixed());
    const s = object({
      m: object({
        field1: mixed(conditions(condition(['.field2', 'unknown'], spy))),
      }),
      field2: mixed(def('fred')),
    });
    cast(s);
    expect(spy.mock.calls[0][0]).toBe('fred');
    expect(spy.mock.calls[0][1]).toBeUndefined();
  });
});
