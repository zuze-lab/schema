// nullables and undefined's will never get pased to this function
export default v => v.toString();

export const trim = () => v => v && v.trim();
export const strip = () => v => v && v.replace(/\s/g);
export const uppercase = () => v => v && v.toUpperCase();
export const lowercase = () => v => v && v.toLowerCase();
