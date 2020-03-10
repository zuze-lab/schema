import conditional from './conditional';
import { when } from './conditions';

export default (fn, ...defs) => {
  if (typeof fn !== 'function')
    throw new Error('A lazy schema requires a resolver function');
  return conditional(when('.', fn), ...defs);
};
