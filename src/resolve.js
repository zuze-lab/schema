import { parts } from '@zuze/interpolate';
import { combineLazies, defaults } from './utils';
import { combine } from './conditions';
import { withoutAny, without } from './without';

const resolve = (schema, options) =>
  schema.lazy || schema.condition.length
    ? without(
        'lazy',
        withoutAny(
          'condition',
          combineLazies(schema.lazy, combine(schema.condition))(
            defaults(options),
            schema
          )
        )
      )
    : schema;

// resolvePath - probably the most important algorithm in this project
// allows relative refs to be resolved

// schemas may need to be resolved during resolve.path
// if there are conditional shapes, for instance then we can't
// get subsequent schemas until we resolve the previous ones
export const resolvePath = (path, schema, value, options, requiresSchema) =>
  parts(path).reduce(
    ([schema, value, from], part) => {
      if (value !== undefined) value = value[part];

      const { shape, of } = schema;
      schema = part.match(/^\d+$/) ? of : shape[part];
      if (schema) schema = resolve(schema, { ...options, from, value });

      if (!schema && requiresSchema)
        throw new Error(
          `Cannot resolve schema from ${path} - failed at ${part}`
        );

      return [schema, value, [{ schema, value }, ...from]];
    },
    [schema, value, [{ schema, value }, ...(options.from || [])]]
  );

export default resolve;
