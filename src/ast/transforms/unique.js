import { get } from '@zuze/interpolate';
const def = (a, b) => b === a;

const createBy = using =>
  using ? (a, b) => get(a, using) === get(b, using) : def;

export default () => by => value => {
  if (!Array.isArray(value)) return value;
  const fn = createBy(by);
  return value.filter((a, idx, arr) => arr.findIndex(b => fn(a, b)) === idx);
};
