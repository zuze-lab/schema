import { merge, definition } from './utils';

export const schema = (def, ...defs) =>
  defs.reduce((acc, def) => merge(acc, definition(def)), definition(def));

// alias
export const extend = schema;
