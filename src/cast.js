import { defaults } from './utils';
import resolve from './resolve';
import castInner from './cast.inner';

const check = (
  value,
  { typeCheck, type, nullable, label },
  { assert, path }
) => {
  if (!assert) return value;

  if (value === null) {
    if (nullable) return value;
    throw new TypeError(
      `null given for non-nullable schema ${label || type} ${
        path ? `at ${path}` : ``
      }`
    );
  }

  if (value !== undefined && typeCheck && !typeCheck(value))
    throw new TypeError(
      `cast value of ${value} is not a valid type for schema ${type}`
    );

  return value;
};

const cast = (schema, value, options) => {
  options = defaults(options);
  const fork = resolve(schema, { ...options, value });
  if (fork !== schema) return cast(fork, value, options);

  const { strict } = options;
  const { transform, inner, default: def } = schema;

  value = check(
    // transforms are ignored when value is undefined or in strict mode
    value === undefined || strict
      ? value
      : transform.reduce(
          (acc, fn) => fn(acc, value, { schema, options }),
          value
        ),
    schema,
    options
  );

  const innerSchema = inner && inner(schema);
  const final = innerSchema
    ? castInner(innerSchema, schema, value, options)
    : value;

  return final !== undefined ? final : typeof def === 'function' ? def() : def;
};

export default cast;
