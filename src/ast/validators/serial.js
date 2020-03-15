import { serial } from '../../validators';
import { createValidator } from '../createValidators';

export default options => defs =>
  serial(...defs.map(d => createValidator(d, options)));
