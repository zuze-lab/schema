import object from '../object';
import number from '../number';
import boolean from '../boolean';
import date from '../date';
import array from '../array';
import string from '../string';
import mixed from '../mixed';
import ref from '../ref';
import { createValidators } from './createValidators';
import { createTransforms } from './createTransforms';
import * as astTransforms from './transforms';
import * as astValidators from './validators';
import { createConditions } from './createConditions';

const schemas = { object, number, boolean, date, array, string, mixed };

const defaults = (options = {}) => ({
  ...options,
  transforms: {
    ...astTransforms,
    ...(options.transforms || {}),
  },
  validators: {
    ...astValidators,
    ...(options.validators || {}),
  },
});

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
  {
    schema,
    tests = [],
    transforms = [],
    default: def,
    meta,
    typeError,
    label,
    shape,
    of,
    nullable,
    conditions,
  },
  options
) => {
  options = defaults(options);
  return make(
    schema,
    {
      default: def && def.ref ? resolver => resolver(ref(def.ref)) : def,
      label: label,
      nullable,
      typeError,
      condition: createConditions(conditions, options),
      shape: shape
        ? Object.entries(shape).reduce(
            (acc, [field, schema]) => ({
              ...acc,
              [field]: createSchema(schema, options),
            }),
            {}
          )
        : undefined,
      of: of
        ? Array.isArray(of)
          ? of.map(o => createSchema(o, options))
          : createSchema(of, options)
        : undefined,
      meta,
      test: createValidators(tests, options),
      transform: createTransforms(transforms, options),
    },
    options
  );
};
