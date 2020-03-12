import { SchemaType } from '../utils';
import { restrict } from './utils';

export default (value, { message, params = {}, name = 'includes' } = {}) => ({
  name,
  test: (val, { resolve }) => val && val.includes(resolve(value)),
  params: { value, ...params },
  message,
  check: restrict([SchemaType.STRING, SchemaType.ARRAY], name),
});
