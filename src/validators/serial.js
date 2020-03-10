import { isValidationError } from './utils';

// TL;DR - serial(...tests) === {abortEarly:true} when sync
// serial is essentially abortEarly for async tests
// abortEarly won't stop subsequent async tests from running but serial will
// for completeness, we have added support for sync and async
const reducer = (value, opts) =>
  opts.options.sync
    ? (acc, def) =>
        isValidationError(acc)
          ? acc
          : def.test(value, opts) || opts.createError(def)
    : async (acc, def) =>
        isValidationError(await acc)
          ? acc
          : (await def.test(value, opts)) || opts.createError(def);

export default (...defs) => ({
  name: 'serial',
  test: (...args) => defs.reduce(reducer(...args), true),
});
