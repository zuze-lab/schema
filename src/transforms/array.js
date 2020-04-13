import { get } from '@zuze/interpolate';

export default val => {
  if (typeof val === 'string')
    try {
      val = JSON.parse(val);
    } catch (err) {
      val = null;
    }

  return Array.isArray(val) ? val : null;
};

export const compact = (rej = v => !!v) => value => value.filter(rej);

const createBy = (by, a, b) =>
  typeof by === 'function' ? by(a, b) : get(a, by) === get(b, by);

const defaultBy = (a, b) => b === a;

export const unique = (by = defaultBy) =>
  compact((v, idx, arr) => arr.findIndex(b => createBy(by, v, b)) === idx);
