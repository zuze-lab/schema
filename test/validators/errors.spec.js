import {
  string,
  tests,
  max,
  required,
  oneOf,
  object,
  getErrors,
  validate,
} from '../../src';

describe('errors', () => {
  it('should map errors to paths', () => {
    const schema = object({
      firstName: string(
        tests(required(), max(3), oneOf(['jim', 'joe', 'bill']))
      ),
      lastName: string(tests(required(), oneOf(['smith', 'brown', 'white']))),
    });

    const values = {};

    const validationErrors = getErrors(schema, values, {
      sync: true,
      abortEarly: false,
    });

    expect(validationErrors.firstName).toBe('firstName is required');
    expect(validationErrors.lastName).toBe('lastName is required');
  });

  it('should return an empty object if valid', () => {
    const schema = object({
      firstName: string(
        tests(required(), max(3), oneOf(['jim', 'joe', 'bill']))
      ),
      lastName: string(tests(required(), oneOf(['smith', 'brown', 'white']))),
    });

    const values = {
      firstName: 'joe',
      lastName: 'brown',
    };

    const validationErrors = getErrors(schema, values, {
      sync: true,
      abortEarly: false,
    });

    expect(validationErrors).toMatchObject({});
    expect(validationErrors.firstName).toBeUndefined();
    expect(validationErrors.lastName).toBeUndefined();
  });

  it('should work async', async () => {
    const schema = object({
      firstName: string(
        tests(required(), max(3), oneOf(['jim', 'joe', 'bill']))
      ),
      lastName: string(tests(required(), oneOf(['smith', 'brown', 'white']))),
    });
    const values = {};
    const validationErrors = await getErrors(schema, values, {
      abortEarly: false,
    });

    expect(validationErrors.firstName).toBe('firstName is required');
    expect(validationErrors.lastName).toBe('lastName is required');
  });

  it('should accept a parameter of multiple', () => {
    const validationErrors = getErrors(
      object({
        firstName: string(
          tests(required(), max(3), oneOf(['jim', 'joe', 'bill']))
        ),
        lastName: string(tests(required(), oneOf(['smith', 'brown', 'white']))),
      }),
      { firstName: 'invalid' },
      { multiple: true, sync: true, abortEarly: false }
    );

    expect(validationErrors.firstName).toHaveLength(2);
    expect(validationErrors.firstName).toContain(
      'firstName must not be longer than 3 characters'
    );
    expect(validationErrors.firstName).toContain(
      'firstName must be one of jim, joe, bill'
    );
    expect(validationErrors.lastName).toHaveLength(1);
  });
});
