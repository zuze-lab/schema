import ref from '../ref';
import is from './is';

export default (value, { message, params = {}, name = 'same' } = {}) =>
  is(ref(value), { message, params: { value: value, ...params }, name });
