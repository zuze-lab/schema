import { getter } from 'property-expr';
const def = (a, b) => b === a;

const createBy = using =>
  using ? (a, b) => getter(using, true)(a) === getter(using, true)(b) : def;

export default () => by => value => {
  if (!Array.isArray(value)) return value;
  const fn = createBy(by);
  return value.filter((a, idx, arr) => arr.findIndex(b => fn(a, b)) === idx);
};
