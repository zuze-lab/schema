import { SchemaType } from './utils';
import { schema } from './schema';
import { transforms, boolean } from './transforms';

export const typeCheck = val =>
  val instanceof Boolean || typeof val === 'boolean';

export default (...defs) =>
  schema({ typeCheck, type: SchemaType.BOOLEAN }, transforms(boolean), ...defs);
