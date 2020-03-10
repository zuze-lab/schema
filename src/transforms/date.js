import { parseISO } from 'date-fns';

export default (parser = parseISO) => value => {
  if (value instanceof Date) return value;
  if (!parser)
    throw new Error(
      `No date parser found - date-fns is an optional dependency, perhaps you need to install it?`
    );
  return parser(value);
};
