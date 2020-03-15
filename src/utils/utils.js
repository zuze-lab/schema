import { isSchema } from './definition';

export const makeFrom = (schema, value, path, { from }) => [
  { schema, value, path },
  ...(from || []),
];

export const makePath = (key, { path }) => (path ? `${path}.${key}` : key);

export const isObject = val =>
  val && Object.prototype.toString.call(val) === '[object Object]';

// almost trivially simple setter/getters
const createSetter = (key, def) => (arg = def) =>
  isSchema(arg) ? arg[key] : { [key]: arg };

export const nullable = createSetter('nullable', true);
export const meta = createSetter('meta');
export const label = createSetter('label');
export const def = createSetter('default');
export const lazy = createSetter('lazy');
export const typeError = createSetter('typeError');
