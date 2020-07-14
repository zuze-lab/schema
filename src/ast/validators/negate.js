import { negate } from '../../validators';
import { createValidator } from '../createValidators';

export default options => (def, opts) =>
  negate(createValidator(def, options), opts);
