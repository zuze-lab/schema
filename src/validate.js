import { defaults, warn, errors } from './utils';
import {
  isThenable,
  isValidationError,
  errorCreator,
  ValidationError,
} from './validators';
import resolve, { resolvePath } from './resolve';
import cast from './cast';
import validateInner from './validate.inner';
import { isRef } from './ref';
import { without } from './without';
const run = (
  { name, message, test, params, check = v => v !== undefined },
  value,
  options,
  schema
) => {
  if (check && !check(value, schema)) return;

  const resolve = ref => (isRef(ref) ? cast(ref, undefined, options) : ref);

  const createError = errorCreator(value, name, options, schema);

  // test result must return false, true, or a ValidationError
  // or be a promise that resolves to one of those things
  const testResult = test(value, { schema, options, createError, resolve });
  if (!testResult) return createError({ message, params });
  if (isValidationError(testResult)) return testResult;
  return isThenable(testResult)
    ? testResult.then(e => (e === true ? undefined : e))
    : undefined;
};

const validate = (schema, value, options) => {
  options = defaults(options);

  if (options.at) {
    const [nextSchema, nextValue] = resolvePath(
      options.at,
      schema,
      value,
      options,
      true
    );

    return validate(nextSchema, nextValue, without('at', options));
  }

  // resolve the schema first and fork, if necessary
  const fork = resolve(schema, { ...options, value });
  if (fork !== schema) return validate(fork, value, options);

  const { abortEarly, sync, recursive } = options;
  const { inner, test } = schema;

  const done = results => {
    if (results.length)
      throw new ValidationError(
        abortEarly ? [new ValidationError(results[0], options)] : results,
        { value, ...options }
      );
    return value;
  };

  const complete = errs =>
    sync
      ? done(errs)
      : Promise.all(errs).then(e => done(e.filter(e => e !== undefined)));

  // cast it before validating
  try {
    value = cast(schema, value, options);
  } catch (err) {
    return complete([
      err.name === 'TypeError'
        ? errorCreator(
            value,
            'typeError',
            options,
            schema
          )({
            message: schema.typeError,
            params: { value, schema: schema.type },
          })
        : err,
    ]);
  }

  const innerSchema = inner && inner(schema);
  const errs = test.reduce(
    (acc, validator) => {
      // we can actually abortEarly if we're doing this synchronously
      if (sync && abortEarly && acc.length) return acc;

      // the result of a validator will always be undefined, a ValidationError
      // or a promise that resolves to undefined or a ValidationError
      const result = run(validator, value, options, schema);
      if (isThenable(result) && sync) {
        warn(
          `Validator ${validator.name} returned a promise during synchronous validation - result will be ignored`
        );
        // catch the error if necessary
        result.catch(() =>
          warn(
            `Async validator ${validator.name} threw error during synchronous validation`
          )
        );
        return acc;
      }
      return result ? [...acc, result] : acc;
    },
    // an function can be passed to do some work to grab other errors
    // used by array/object schemas to get inner errors
    // this function will return an array or errors or an array of promises
    innerSchema && recursive
      ? validateInner(innerSchema, schema, value, options)
      : []
  );

  return complete(errs);
};

export const validateSync = (schema, value, options = {}) =>
  validate(schema, value, { ...options, sync: true });

export const isValid = (schema, value, options) => {
  options = defaults(options);
  const { sync } = options;
  const method = sync ? validateSync : validate;
  const tick = () => method(schema, value, { ...options, abortEarly: true });
  if (sync) {
    try {
      return tick(), true;
    } catch {
      return false;
    }
  }

  return tick()
    .then(() => true)
    .catch(() => false);
};

export const isValidSync = (schema, value, options = {}) =>
  isValid(schema, value, { ...options, sync: true });

export const isValidSyncAt = (at, schema, value, options = {}) =>
  isValidSync(schema, value, { ...options, at });

export const isValidAt = (at, schema, value, options = {}) =>
  isValid(schema, value, { ...options, at });

export const validateAt = (at, schema, value, options = {}) =>
  validate(schema, value, { ...options, at });

export const validateSyncAt = (at, schema, value, options = {}) =>
  validateSync(schema, value, { ...options, at });

export const getErrors = (schema, values, options) => {
  options = defaults(options);
  const { multiple = false, ...opts } = options;

  const resolve = err => errors(err, multiple);

  if (options.sync) {
    try {
      validate(schema, values, opts);
      return errors();
    } catch (err) {
      return resolve(err);
    }
  }

  return validate(schema, values, opts)
    .then(() => resolve())
    .catch(resolve);
};

export const getErrorsSync = (schema, values, options = {}) =>
  getErrors(schema, values, { ...options, sync: true });

export default validate;
