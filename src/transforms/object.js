import { isObject } from '../utils';
export default value => {
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch (err) {
      value = null;
    }
  }

  return isObject(value) ? value : null;
};

export const entries = fn => value =>
  Object.entries(value).reduce(
    (acc, [key, value]) => ({ ...acc, ...(fn(key, value) || {}) }),
    {}
  );

export const strip = fn =>
  entries((key, value) => (fn(key, value) ? { [key]: value } : {}));

export const stripKeys = (...keys) => strip(key => !keys.includes(key));

// transform applied to keys
// e.g.
// import { snakeCase } from 'lodash'
// object(transforms(keys(v => snakeCase(v).toUpperCase())))
export const keys = fn => entries((key, value) => ({ [fn(key)]: value }));

// from
export const from = (frm, to, alias = false) =>
  entries((key, value) =>
    key !== frm
      ? { [key]: value }
      : { [to]: value, ...(alias ? { [frm]: value } : {}) }
  );

export const stripUnknown = () => (value, original, { schema }) =>
  strip(key => Object.keys(schema.shape || {}).includes(key))(value);
