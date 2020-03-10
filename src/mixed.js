import { schema } from './schema';
import { SchemaType } from './utils';

export const typeCheck = () => true;

export default (...defs) =>
  schema({ type: SchemaType.MIXED, typeCheck }, ...defs);
