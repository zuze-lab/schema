import { oneOfType } from '../../validators';
import { createSchema } from '../createSchema';

export default options => (types, opts) =>
  oneOfType(
    types.map(t => createSchema(t, options)),
    opts
  );
