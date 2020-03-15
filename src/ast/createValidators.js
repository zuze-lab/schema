import * as validators from '../validators';
import { recursivelyConvertRefs } from './utils';
import astToFn from './astToFn';

const processor = astToFn(
  'validators',
  validators,
  name => `No validator found for ${name}`,
  (fn, ...args) => fn(...recursivelyConvertRefs(...args))
);

export const createValidators = (ast, options) =>
  ast.map(v => createValidator(v, options));

export const createValidator = (ast, options) => processor(ast, options);
