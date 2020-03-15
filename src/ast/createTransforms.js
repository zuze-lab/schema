import * as transforms from '../transforms';
import astToFn from './astToFn';

const processor = astToFn(
  'transforms',
  transforms,
  name => `No transform found for ${name}`
);

export const createTransforms = (ast, options) =>
  ast.map(v => processor(v, options));
