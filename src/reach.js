import { defaults } from './utils';
import resolve, { resolvePath } from './resolve';

// PLEASE NOTE: If you reach into a schema that has an inner relative ref
// to something that is outside above the reached schema, then s*** will break

export default (schema, path, value, options) => {
  options = defaults(options);
  return resolvePath(
    path,
    resolve(schema, { ...options, value }),
    value,
    options,
    true
  )[0];
};
