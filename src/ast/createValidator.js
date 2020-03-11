import * as validators from '../validators';
import { recursivelyConvertRefs } from './utils';

export const createValidators = (astValidators, options) =>
  astValidators.map(v => createValidator(v, options));

export const createValidator = (v, options = {}) => {
  const [name, ...args] = Array.isArray(v) ? v : [v];
  const customValidators = options.validators || {};
  const validator = validators[name] || customValidators[name];
  if (!validator) throw new Error(`No validator found for ${name}`);
  return validator(...recursivelyConvertRefs(...args));
};
