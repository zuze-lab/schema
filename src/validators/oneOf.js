import cast from '../cast';
const test = values => (value, { resolve, schema }) =>
  values.map(v => resolve(v)).includes(cast(schema, value));

export default (values, { message, params = {}, name = 'oneOf' } = {}) => ({
  name,
  test: test(values),
  params: { values, ...params },
  exclusive: true,
  message,
});
