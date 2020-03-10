import {
  conditional,
  mixed,
  cast,
  object,
  lazy,
  ref,
  string,
  tests,
  def,
  condition,
  min,
  validate,
} from '../src';

describe('ref', () => {
  it('should resolve all the way to the end', () => {
    const result = cast(
      object({
        fielda: object({
          field1: object({
            field1: lazy(() => mixed(def('bill'))),
            field2: conditional(
              condition('.field3.field4', field => mixed(def(field)))
            ),
          }),
          field3: object({
            field4: conditional(
              condition('..field5', field => mixed(def(field)))
            ),
          }),
        }),
        field5: mixed(def('joe')),
      })
    );

    expect(result.fielda.field1.field2).toBe('joe');
    expect(result.fielda.field3.field4).toBe('joe');
    expect(result.field5).toBe('joe');
    expect(result.fielda.field1.field1).toBe('bill');
  });

  it('should throw an error if no inner schema exists', () => {
    const c = conditional(condition('field1', () => mixed()));
    expect(() => cast(c, '')).toThrow(
      'A sibling/relative ref may only be used when an inner schema exists'
    );
  });

  it('should throw an error if a relative ref ends in a . - referencing an immediate ancestor results in trying to cast yourself', () => {
    const field2 = conditional(condition('..', () => mixed()));
    expect(() => cast(object({ field1: object({ field2 }) }))).toThrow(
      `A relative ref cannot end in '.'`
    );
  });

  it('should throw an error if a relative ref cannot be resolved', () => {
    const field2 = conditional(condition('..field3', () => mixed(def('fred'))));
    expect(() => cast(object({ field1: object({ field2 }) }))).toThrow(
      'Relative ref ..field3 at field1.field2 is unable to be resolved - is your ref outside a schema that was REACHed?'
    );
  });

  it('should not validate a ref', async () => {
    const s = object({
      field1: ref('field2'),
      field2: string(tests(min(10))),
    });

    try {
      await validate(s, { field2: 'jim' }, { abortEarly: false });
    } catch (err) {
      expect(err.inner).toHaveLength(1);
    }
  });
});
