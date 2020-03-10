export default value => {
  if (typeof value === 'string') {
    const next = value.replace(/\s/g, '');
    if (!next) return NaN;
    return +next;
  }
  return parseFloat(value);
};
