import oneOf from './oneOf';

export default (value, { message, params = {}, name = 'is' } = {}) =>
  oneOf([value], { message, params: { value, ...params }, name });
