import object from '../object';
import number from '../number';
import boolean from '../boolean';
import date from '../date';
import array from '../array';
import string from '../string';
import mixed from '../mixed';
import { condition } from '../conditions';
import { createValidators } from './createValidator';

const schemas = { object, number, boolean, date, array, string, mixed };

const make = (type, def, options = {}) => {
  const use = type || 'mixed';
  if (!schemas[use]) throw new Error(`Can't create schema ${type}`);
  const args =
    typeof options.dateParser !== 'undefined' && use === 'date'
      ? [options.dateParser, def]
      : [def];
  return schemas[use](...args);
};

export const createSchemas = (defs, options) =>
  (Array.isArray(defs) ? defs : [defs]).map(d => createSchema(d, options));

export const createSchema = (
  { schema, tests = [], default: def, meta, label, shape, of, conditions },
  options
) =>
  make(
    schema,
    {
      default: () => def,
      label,
      condition: conditions ? conditions.map(condition) : undefined,
      shape: shape
        ? Object.entries(shape).reduce(
            (acc, [field, schema]) => ({
              ...acc,
              [field]: createSchema(schema, options),
            }),
            {}
          )
        : undefined,
      of: of ? createSchema(of, options) : undefined,
      meta,
      test: createValidators(tests, options),
    },
    options
  );
