import { schema } from '../schema';
import { isSchema } from '../utils';

// condition configuration:
// 1 (internal) { resolve: function(...dependency values,schema) => schema, refs: [...paths] }
// 2 (dependencies[], function(...dependency values,schema) => schema)
// 3 (dependencies[], { is: value | () => boolean, then?: schema, otherwise?: schema })

export const condition = (...args) => {
  if (args[0].resolve) return args[0];

  if (args.length < 2)
    throw new Error(
      `Malformed condition. You must supply a reference or list of references followed by a is-then-otherwise condition descriptor or resolver function`
    );

  if (args[1].is !== undefined && !args[1].then && !args[1].otherwise) {
    throw new Error(
      `One of a then or otherwise is required when constructing a condition using the object syntax`
    );
  }

  // convert the object-style condition to a function style
  return args[1].is !== undefined
    ? condition(
        ...(Array.isArray(args[0]) ? args[0] : [args[0]]), // list of dependencies first arg
        // resolving function is second arg
        (...inner) => {
          const original = inner.pop();
          const { is, then, otherwise } = args[1];

          const branch = (typeof is === 'function'
          ? is(...inner)
          : inner.every(i => i === is))
            ? then
            : otherwise;

          // then or otherwise can be undefined, schemas, or functions
          return !branch
            ? original
            : typeof branch === 'function'
            ? branch(original)
            : schema(original, branch);
        }
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
        refs: Array.isArray(args[0]) ? args[0] : args,
      };
};

// alias
export const when = condition;

export default condition;
