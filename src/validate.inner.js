import { extendOptions } from './utils';
import validate from './validate';
import { isRef } from './ref';
import { isArraySchema } from './utils/definition';

const tick = (schemaOrRef, value, options) => () =>
  validate(schemaOrRef, value, options);

const errors = (run, last, { sync, abortEarly }) => {
  if (sync) {
    if (abortEarly && last.length) return last;
    try {
      return run(), last;
    } catch (err) {
      return [...last, ...(err.inner ? err.inner : [err])];
    }
  }

  return [
    ...last,
    run()
      .then(() => {})
      .catch(e => e),
  ];
};

// inner is either an object a single schema for an array, an array of schemas for a tuple, or a schema map for an object
export default (inner, schema, value, options) => {
  if (isArraySchema(inner)) {
    // array or tuple
    const isTuple = Array.isArray(inner);
    const v = value || [];
    return (isTuple ? inner : v).reduce(
      (acc, s, idx) =>
        errors(
          tick(
            isTuple ? s : inner,
            isTuple ? v[idx] : s,
            extendOptions(schema, v, idx, options)
          ),
          acc,
          options
        ),
      []
    );
  } else {
    // object
    return Object.entries(inner).reduce(
      (acc, [key, schemaOrRef]) =>
        isRef(schemaOrRef)
          ? acc
          : errors(
              tick(
                schemaOrRef,
                (value || {})[key],
                extendOptions(schema, value || {}, key, options)
              ),
              acc,
              options
            ),
      []
    );
  }
};
