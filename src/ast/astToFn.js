const processor = (fn, ...args) => fn(...args);

export default (property, source, err, process = processor) => (
  ast,
  options
) => {
  const [name, ...args] = Array.isArray(ast) ? ast : [ast];
  const userDefined = options[property][name];
  const fn = userDefined || source[name];
  if (!fn) throw new Error(err(name));

  // userDefined transforms/validators must always
  // be a function that accepts options and returns a transform/validator factory
  return process(userDefined ? fn(options) : fn, ...args);
};
