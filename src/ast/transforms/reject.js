import matches from '../matches';

export default options => where => value =>
  Array.isArray(value) ? value.filter(v => !matches(where, v, options)) : value;
