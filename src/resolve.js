import { forEach } from 'property-expr';
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
export const resolvePath = (path, schema, value, options, requiresSchema) => {
  let next = { schema, value };
  const from = [next, ...(options.from || [])];
  forEach(path, (part, _, isArray) => {
    next.path = part;
    if (value !== undefined) value = value[part];

    const { shape, of } = schema;
    schema = isArray ? of : shape[part];
    if (schema) schema = resolve(schema, { ...options, from, value });

    if (!schema && requiresSchema)
      throw new Error(`Cannot resolve schema from ${path} - failed at ${part}`);

    next = { schema, value };
    from.unshift(next);
  });

  return [schema, value, from];
};

export default resolve;
