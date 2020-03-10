import { isValidationError } from './utils';

const test = (...tests) => (value, options) => {
  const { sync } = options.options;
  const results = tests.map(t => t(value, options));
  const done = results => results.every(r => !!r && !isValidationError(r));
  return sync ? done(results) : Promise.all(results).then(done);
};

// usage (checkout between validator)
// const test = combine(min(10),max(20))
// create('someValidator',combine(min(10),max(20)),opts)
export default (...defs) => test(...defs.map(({ test }) => test));
