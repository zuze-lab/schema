import { get } from '@zuze/interpolate';
import { schema } from './schema';
import { SchemaType, def } from './utils';
import cast from './cast';
import resolve, { resolvePath } from './resolve';

const DEF = (value, ...defs) => schema(...defs, def(value));

const relativeRegExp = /^(\.+)(.*)/;

// a ref is really just a lazy schema that defaults to the value at that
// path cast with the resolved schema (if applicable) at that path
const ref = path =>
  schema({
    path,
    type: SchemaType.REF,
    lazy: options => {
      const { from, context, value, contextPrefix } = options;
      const at = options.path ? `at ${options.path}` : '';

      // self referencing
      if (path === '.') return DEF(value);

      if (path[0] === contextPrefix) return DEF(get(context, path.slice(1)));

      if (!from || !from.length) {
        throw new Error(
          `Ref error using ref ${path} ${at} - A sibling/relative ref may only be used when an inner schema exists`
        );
      }

      // relative references!
      const relative = path.match(relativeRegExp);
      if (relative) {
        if (!relative[2])
          throw new Error(
            `Ref error using ref ${path} ${at} - A relative ref cannot end in '.'`
          );
        const levels = relative[1].length;

        if (from.length > levels) {
          return resolve(ref(relative[2]), {
            ...options,
            from: from.slice(levels),
          });
        }

        throw new Error(
          `Relative ref ${path} ${at} is unable to be resolved - is your ref outside a schema that was REACHed?`
        );
      }

      const [nextSchema, nextValue, nextFrom] = resolvePath(
        path,
        from[0].schema,
        from[0].value,
        {
          ...options,
          from: from.slice(1),
        },
        false
      );

      return nextSchema
        ? DEF(
            cast(nextSchema, nextValue, { ...options, from: nextFrom }),
            nextSchema
          )
        : DEF(nextValue);
    },
  });

export const getRefValue = (ref, options) => cast(ref, options.value, options);

export const isRef = ({ type } = {}) => type === SchemaType.REF;

export default ref;
