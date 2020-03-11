import { warn, SchemaType, messageForError } from '../utils';

export const isThenable = what =>
  what && typeof what.then === 'function' && typeof what.catch === 'function';

export const isValidationError = err =>
  err && err.constructor === ValidationError;

export const errorCreator = (value, name, options, schema) => ({
  message,
  params = {},
  name: nestedName, // needed for serial
} = {}) =>
  new ValidationError(
    {
      value,
      path: options.path,
      schema: schema.type,
      params: {
        label: schema.label || options.path || 'field',
        ...params,
      },
      message: typeof message === 'function' ? message(params) : message,
      type: nestedName || name,
    },
    options
  );

export const isValidator = test => {
  if (!test || !test.name || typeof test.test !== 'function')
    throw new Error(
      `Validator definitions requires a name and a test function`
    );
  return test;
};

export const test = (
  name,
  test,
  {
    exclusive = false,
    message,
    params = {},
    // use can provide a "pre-flight" check function to determine if
    // it is an applicable test for the given value/schema
    schemas = [],
    check,
  } = {}
) => ({
  name,
  test,
  message,
  params,
  exclusive,
  check: check || restrict(schemas, name),
});

export const restrict = (types, name, allowUndef = false) => (
  value,
  { type }
) => {
  if (!allowUndef && value === undefined) return false;
  if (types.length && !types.includes(type) && type !== SchemaType.MIXED) {
    warn(`Attempted to use ${name} validator on ${type} schema - skipping`);
    return false;
  }
  return true;
};

export const tests = (...tests) => ({ test: tests.map(isValidator) });

export function ValidationError(error, { locales, value, path, type }) {
  const errors = Array.isArray(error) ? error : [error];

  const withMessages = errors.map(e => messageForError(e, { locales }));
  this.name = 'ValidationError';
  this.value = errors.length === 1 ? errors[0].value : value;
  this.path = errors.length === 1 ? errors[0].path : path;
  this.type = errors.length === 1 ? errors[0].type : type;
  this.errors = withMessages.map(({ message }) => message);
  this.inner = errors;
  this.message =
    errors.length === 1
      ? withMessages[0].message
      : `${errors.length} error${errors.length === 1 ? '' : 's'} occurred`;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;
