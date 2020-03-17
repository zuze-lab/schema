import { combine } from '../../validators';
import { createValidator } from '../createValidators';

export default options => defs =>
  combine(defs.map(def => createValidator(def, options)));
