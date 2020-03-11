import { extend } from '../schema';
import { isSchema } from '../utils';
import { matches, createSchema } from '../ast';

// condition configuration:
// 1 (internal) { resolve: function(...dependency values,schema) => schema, refs: [...paths] }
// 2 (dependencies[], function(...dependency values,schema) => schema)
// 3 (dependencies[], { is: value | value[] | () => boolean, how?: some | every, then?: schema | ast, otherwise?: schema | ast })
// 4 { when: [{ [dep]: ast, [dep]: ast, ...}], how?: some | every, then?: schema | fn => schema | ast, otherwise?: schema | fn => schema | ast }

const resolveIs = (values, is, how) =>
  values[how]((arg, idx) => arg === (Array.isArray(is) ? is[idx] : is));

const resolveBranch = (original, branch) =>
  !branch
    ? original
    : // function
    typeof branch === 'function'
    ? branch(original)
    : // ast
    typeof branch.schema !== 'undefined'
    ? createSchema(branch)
    : // schema definitions
      extend(
        original,
        typeof branch.tests !== 'undefined'
          ? createSchema({ schema: original.type, ...branch })
          : branch
      );

const createWhenCondition = ({ when, how = 'some', then, otherwise }) => {
  const whens = Array.isArray(when) ? when : [when];

  // object schema validator version
  const keys = whens.reduce(
    (acc, schema) => [...acc, ...Object.keys(schema)],
    []
  );

  return {
    resolve: (...next) =>
      resolveBranch(
        next.pop(),
        whens[how](w =>
          Object.entries(w).every(([field, ast]) =>
            matches(ast, next[keys.findIndex(f => f === field)])
          )
        )
          ? then
          : otherwise
      ),
    refs: keys,
  };
};

export const condition = (...args) => {
  // single argument with "when"
  if (args[0].when) return createWhenCondition(...args);

  if (args.length < 2)
    throw new Error(
      `Malformed condition. You must supply a reference or list of references followed by an is-then-otherwise condition descriptor or resolver function`
    );

  const { is, then, otherwise, how = 'every' } = args[1];
  const refs = Array.isArray(args[0]) ? args[0] : [args[0]];

  if (is !== undefined && !then && !otherwise) {
    throw new Error(
      `One of a then or otherwise is required when constructing a condition using the object syntax`
    );
  }

  // convert the object-style condition to a function style
  return is
    ? condition(
        refs, // list of dependencies first arg
        // resolving function is second arg
        (...inner) =>
          resolveBranch(
            inner.pop(),
            typeof is === 'function'
              ? is(...inner)
              : resolveIs(inner, is, how)
              ? then
              : otherwise
          )
      )
    : {
        // internally a condition is an object with a resolve key that is a function and a refs key that is a list of paths
        resolve: (resolver => (...next) => {
          const resolved = resolver(...next);
          if (!isSchema(resolved))
            throw new Error(
              `A complete schema definition must be returned from a condition resolving function`
            );
          return resolved;
        })(args.pop()),
        refs,
      };
};

// alias
export const when = condition;

export default condition;
