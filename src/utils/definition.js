import combineLazies from './combine.lazies';
import { MIXED } from './types';
import warn from './warn';

export const isSchema = ({ __isSchema } = {}) => !!__isSchema;

export default ({
  type,
  typeError,
  typeCheck,
  test = [],
  transform = [],
  condition = [],
  label,
  meta,
  nullable,
  default: def,
  lazy,
  ...rest
} = {}) => ({
  __isSchema: true,
  typeCheck: typeCheck ? typeCheck : () => true,
  type: type || MIXED,
  test,
  typeError,
  transform,
  condition,
  meta,
  nullable,
  label,
  default: def,
  lazy,
  ...rest,
});

const filterSame = (first, second) => [
  ...first,
  ...second.filter(w => !first.includes(w)),
];

// filter tests
const filterValidators = validators => {
  const flattenedAndFiltered = Object.values(
    validators.reduce((acc, def) => {
      const current = acc[def.name] || [];
      if (def.exclusive && current.length) return { ...acc, [def.name]: [def] };
      if (!def.exclusive && current.find(({ exclusive }) => !!exclusive))
        return { ...acc, [def.name]: [def] };
      return { ...acc, [def.name]: [...current, def] };
    }, {})
  ).reduce((acc, arr) => [...acc, ...arr], []);

  const warned = {};
  return validators.filter(
    def =>
      flattenedAndFiltered.includes(def) ||
      (!warned[def.name]
        ? (warned[def.name] = true) &&
          warn(
            `Mixing of exclusive/non-exclusive validators with name "${def.name}" may result in unexpected behavior`
          )
        : false)
  );
};

const mergeTypes = (next, orig) => {
  if (!next.type || next.type === MIXED) return orig;
  if (orig.type === MIXED || orig.type === next.type) return next;
  throw new Error(
    `Attempted to change schema type from ${orig.type} to ${next.type} - did you create a bad condition?`
  );
};

export const merge = (def, ...defs) =>
  defs.reduce(
    (acc, def) => ({
      __isSchema: true,
      ...mergeTypes(def, acc),
      typeError: acc.typeError || def.typeError,
      test: filterValidators(filterSame(acc.test, def.test)),
      transform: filterSame(acc.transform, def.transform),
      condition: filterSame(acc.condition, def.condition),
      label: def.label === undefined ? acc.label : def.label,
      default: def.default === undefined ? acc.default : def.default,
      nullable: def.nullable === undefined ? acc.nullable : def.nullable,
      meta: def.meta === undefined ? acc.meta : def.meta,
      lazy: combineLazies(acc.lazy, def.lazy),
      // would like to have the below merges somewhere external to this function
      shape:
        acc.shape || def.shape
          ? { ...(acc.shape || {}), ...(def.shape || {}) }
          : undefined,
      of: def.of || acc.of,
      inner: acc.inner || def.inner,
    }),
    def
  );
