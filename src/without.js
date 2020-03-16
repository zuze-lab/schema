import { schema } from './schema';

// get a new schema lacking something that was on a previous schema
// a functional way to do, for exampe, schema({...original,label:undefined})
export const without = (what, original, ...refs) =>
  schema({
    ...original,
    [what]: Array.isArray(original[what])
      ? original[what].filter(w => !refs.includes(w))
      : undefined,
    type: original.type,
  });

// remove all conditions/tests/transforms in a functional way
export const withoutAny = (what, original) =>
  without(what, original, ...original[what]);
