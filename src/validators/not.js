import negate from './negate';
import is from './is';

export default (value, { name = 'not', ...rest } = {}) =>
  negate(is(value), { name, ...rest });
