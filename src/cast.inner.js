import { isSchema, extendOptions } from './utils';
import cast from './cast';

// inner is either an object a single schema for an array, or multiple schemas for an array
export default (inner, schema, value, options) => {
  if (isSchema(inner))
    return Array.isArray(value)
      ? value.map(v => cast(inner, v, options))
      : value;

  return Object.entries(inner).reduce(
    (acc, [key, schemaOrRef]) => ({
      ...acc,
      [key]: cast(
        schemaOrRef,
        acc[key],
        extendOptions(schema, value || {}, key, options)
      ),
    }),
    value || {}
  );
};
