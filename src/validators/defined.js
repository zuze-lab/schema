export default ({ message, params = {}, name = 'defined' } = {}) => ({
  name,
  test: val => val !== undefined,
  exclusive: true,
  params,
  message,
  check: false,
});
