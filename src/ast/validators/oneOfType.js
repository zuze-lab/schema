import { oneOfType } from '../../validators';
import { createSchema } from '../createSchema';

export default options => types =>
  oneOfType(types.map(t => createSchema(t, options)));
