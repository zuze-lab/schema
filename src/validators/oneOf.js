import cast from '../cast';
import { isRef } from '../ref';
import { test } from './utils';
const oneOf = (values, params = {}) => (
  value,
  { resolve, schema, createError }
) => {
  const resolvedParams = Object.entries(params).reduce(
    (acc, [name, val]) => ({ ...acc, [name]: resolve(val) }),
    {}
  );

  const resolved = (isRef(values) ? resolve(values) || [] : values).map(v =>
    resolve(v)
  );

  return (
    !resolved.length ||
    resolved.includes(cast(schema, value)) ||
    createError({ params: { ...resolvedParams, values: resolved } })
  );
};

export default (values, { params = {}, name = 'oneOf', ...rest } = {}) =>
  test(name, oneOf(values, params), {
    exclusive: true,
    params: { values, ...params },
    ...rest,
  });
