import { makeFrom, makePath } from './utils';
import messages from './messages';

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
  ...opts,
  messages: messages(opts.messages),
  from: schema ? [{ schema, value, path }, ...(opts.from || [])] : opts.from,
});
