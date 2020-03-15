import { extendOptions, isSchema } from './utils';
import validate from './validate';
import { isRef } from './ref';

const tick = (schemaOrRef, value, options) => () =>
  validate(schemaOrRef, value, options);

const errors = (run, last, { sync, abortEarly }) => {
  if (sync) {
    if (abortEarly && last.length) return last;
    try {
      return run(), last;
    } catch (err) {
      return [...last, ...err.inner];
    }
  }

  return [
    ...last,
    run()
      .then(() => {})
      .catch(e => e),
  ];
};

// inner is either an object a single schema for an array, or multiple schemas for an array
export default (inner, schema, value, options) =>
  isSchema(inner)
    ? (value || []).reduce(
        (acc, v, idx) =>
          errors(
            tick(inner, v, extendOptions(schema, value, idx, options)),
            acc,
            options
          ),
        []
      )
    : Object.entries(inner).reduce(
        (acc, [key, schemaOrRef]) =>
          isRef(schemaOrRef)
            ? acc
            : errors(
                tick(
                  schemaOrRef,
                  value[key],
                  extendOptions(schema, value, key, options)
                ),
                acc,
                options
              ),
        []
      );
