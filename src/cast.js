import { defaults } from './utils';
import resolve from './resolve';
import castInner from './cast.inner';

const check = (value, { typeCheck, type }, { assert }) => {
  if (value !== undefined && assert && typeCheck && !typeCheck(value))
    throw new TypeError(
      `cast value of ${value} is not a valid type for schema ${type}`
    );
};

const cast = (schema, value, options) => {
  options = defaults(options);
  const fork = resolve(schema, { ...options, value });
  if (fork !== schema) return cast(fork, value, options);

  const { strict, assert, path } = options;
  const { transform, inner, default: def, nullable, label, type } = schema;

  // nullable check
  if (value === null) {
    if (nullable) return value;
    if (assert)
      throw new Error(
        `null given for non-nullable schema ${label || type} ${
          path ? `at ${path}` : ``
        }`
      );
  }

  const innerSchema = inner && inner(schema);
  value = innerSchema ? castInner(innerSchema, schema, value, options) : value;

  const final =
    value === undefined || strict
      ? value
      : transform.reduce(
          (acc, fn) => fn(acc, value, { schema, options }),
          value
        );

  // check one more time
  return (
    check(final, schema, options),
    final !== undefined ? final : typeof def === 'function' ? def() : def
  );
};

export default cast;
