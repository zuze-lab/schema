import { isValidationError } from './utils';

// stupid cool validator that was missing from yup - a way to negate any validator
// like negate(oneOf([1,2,3])) results in a validator that requires
// the subject to not be one of the items
// by default it sets the name to not{Name} so, by default, negate(oneOf(...)) becomes notOneOf

const negate = test => (value, opts) => {
  const { sync } = opts.options;
  const result = test(value, opts);
  const done = result => !result || isValidationError(result);
  return sync ? done(result) : Promise.resolve(result).then(done);
};

export default (
  def,
  { message, params = {}, name, exclusive } = {},
  overwrite = false
) => ({
  ...def,
  name: name || `not${def.name[0].toUpperCase()}${def.name.slice(1)}`,
  test: negate(def.test),
  message: message || def.message,
  exclusive: exclusive === undefined ? def.exclusive : exclusive,
  params: overwrite ? params : { ...def.params, ...params },
});
