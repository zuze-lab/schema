import { makeFrom, makePath } from './utils';
import locales from './locales';

export const extendOptions = (schema, value, key, options) => ({
  ...options,
  value: value[key],
  from: makeFrom(schema, value, key, options),
  path: makePath(key, options),
});

export const defaults = (opts = {}, schema, value, path) => ({
  abortEarly: true,
  recursive: true,
  sync: false,
  contextPrefix: '$',
  context: {},
  strict: false,
  assert: true,
  locales: opts.locales || locales(),
  ...opts,
  from: schema ? [{ schema, value, path }, ...(opts.from || [])] : opts.from,
});
