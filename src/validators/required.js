import { SchemaType } from '../utils';

const test = (value, { schema }) => {
  switch (schema.type) {
    case SchemaType.STRING:
    case SchemaType.ARRAY:
      return value && value.length > 0;
    default:
      return value !== null && value !== undefined;
  }
};

export default ({ message, params = {}, name = 'required' } = {}) => ({
  name,
  test,
  message,
  params,
  exclusive: true,
  check: false,
});
