import { isValid } from '../validate';

const reducer = (value, options, strict) => {
  const t = def =>
    isValid(def, value, { ...options, abortEarly: true, strict });
  return options.sync
    ? (acc, def) => (!acc ? t(def) : acc)
    : async (acc, def) => (!(await acc) ? t(def) : acc);
};

export default (
  types,
  { strict = true, message, params = {}, name = 'oneOfType' } = {}
) => {
  if (!Array.isArray(types))
    throw new Error(`First argument passed to oneOfType must be an array`);
  return {
    name,
    test: (value, { options }) =>
      types.reduce(reducer(value, options, strict), false),
    params: { strict, types, ...params },
    exclusive: true,
    message,
  };
};
