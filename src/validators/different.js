import ref from '../ref';
import not from './not';

export default (value, { message, params = {}, name = 'not' } = {}) =>
  not(ref(value), { message, params: { value, ...params }, name });
