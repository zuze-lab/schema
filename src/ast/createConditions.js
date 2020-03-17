import { extend } from '../schema';
import matches from './matches';
import { createSchema } from './createSchema';

export const createConditions = (ast = []) => ast.map(createCondition);

const resolveBranch = (original, branch) =>
  !branch ? original : extend(createSchema(branch), original);

export const createCondition = ({ when, how = 'some', then, otherwise }) => {
  const whens = Array.isArray(when) ? when : [when];

  // object schema validator version
  const refs = whens.reduce(
    (acc, schema) => [...acc, ...Object.keys(schema)],
    []
  );

  return {
    refs,
    withOpts: true,
    resolve: (...next) => {
      const { schema, options } = next.pop();
      return resolveBranch(
        schema,
        whens[how](w =>
          Object.entries(w).every(([field, ast]) =>
            matches(ast, next[refs.findIndex(f => f === field)], {
              ...options,
              sync: true,
            })
          )
        )
          ? then
          : otherwise
      );
    },
  };
};
