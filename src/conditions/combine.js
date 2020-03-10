import resolve from './resolve';

// create a lazy function from multiple conditions - the lazy function accepts two arguments
// options and a schema. the lazy function returns the resolved schema from all the conditions
export default conditions => (options, schema) =>
  resolve(conditions, schema, options);
