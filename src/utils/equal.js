// ignore conditions and lazy - need to take into consideration other things?
const skip = ['conditions', 'lazy'];

const keys = schema => Object.keys(schema).filter(s => !skip.includes(s));

const areSameArrayAt = (key, a, b) =>
  a[key].length === b[key].length &&
  a[key].every((w, idx) => b[key][idx] === w);
const areSameAt = (key, a, b) => a[key] === b[key];

const areSchemasEqual = (a, b) =>
  keys(a).length === keys(b).length &&
  keys(a).every(k =>
    Array.isArray(a[k]) ? areSameArrayAt(k, a, b) : areSameAt(k, a, b)
  );

export default (schema, ...schemas) =>
  schemas.every(s => areSchemasEqual(s, schema));
