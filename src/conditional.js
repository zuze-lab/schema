import { schema } from './schema';
import { conditions } from './conditions';

export default condition => schema(conditions(condition));
