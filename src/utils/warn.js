let WARN = true;
export const warnings = shouldWarn => (WARN = shouldWarn);

export default (...args) => WARN && console.warn('@zuze/schema:', ...args);
