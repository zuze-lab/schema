// nullables and undefined's will never get pased to this function
export default v => v.toString();

const trimStart = /^(\s+)?/;
const trimEnd = /(\s+)?$/;

export const trim = ({ start = true, end = true } = {}) => v => {
  if (!v) return v;
  return start && end ? v.trim() : v.replace(start ? trimStart : trimEnd, '');
};

export const replace = (regexp, substitution) => v =>
  v && v.replace(regexp, substitution);
export const strip = () => replace(/\s/g, '');
export const uppercase = () => v => v && v.toUpperCase();
export const lowercase = () => v => v && v.toLowerCase();
