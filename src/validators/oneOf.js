import cast from '../cast';
import { isRef } from '../ref';
import { test } from './utils';
const oneOf = values => (value, { resolve, schema, createError }) => {
  const resolved = (isRef(values) ? resolve(values) || [] : values).map(v =>
    resolve(v)
  );

  return (
    !resolved.length ||
    resolved.includes(cast(schema, value)) ||
    createError({ params: { values: resolved } })
  );
};

export default (values, { params = {}, name = 'oneOf', ...rest } = {}) =>
  test(name, oneOf(values), {
    exclusive: true,
    params: { values, ...params },
    ...rest,
  });
