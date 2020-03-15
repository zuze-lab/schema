import { negate } from '../../validators';
import { createValidator } from '../createValidators';

export default options => def => negate(createValidator(def, options));
