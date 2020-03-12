import ref from '../ref';
import cast from '../cast';

// resolve multiple conditions by calling the resolve function on the resolved refs
export default (conditions, schema, options) =>
  conditions.reduce(
    (acc, { refs, resolve, withOpts }) =>
      resolve(
        ...refs.map(r =>
          cast(ref(r), r === '.' ? options.value : undefined, options)
        ),
        withOpts ? { schema: acc, options } : acc
      ),
    schema
  );
