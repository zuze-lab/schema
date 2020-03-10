import negate from './negate';
import oneOf from './oneOf';

export default (values, { message, params = {}, name } = {}) =>
  negate(
    oneOf(values),
    {
      message,
      params: { values, ...params },
      name,
    },
    true
  );
