import { isArraySchema, extendOptions } from './utils';
import cast from './cast';

// inner is either an object a single schema for an array, or multiple schemas for an array
export default (inner, schema, value, options) => {
  if (isArraySchema(inner)) {
    const isTuple = Array.isArray(inner);
    return Array.isArray(value)
      ? (isTuple ? inner : value).map((a, i) =>
          cast(isTuple ? a : inner, value[i], options)
        )
      : value;
  }

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
