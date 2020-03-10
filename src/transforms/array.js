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

export const unique = (by = (a, b) => b === a) =>
  compact((v, idx, arr) => arr.findIndex(b => by(v, b)) === idx);
