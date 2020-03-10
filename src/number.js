import { number, transforms } from './transforms';
import { schema } from './schema';
import { SchemaType } from './utils';

export const typeCheck = val =>
  val instanceof Number || (typeof val === 'number' && !isNaN(val));

export default (...defs) =>
  schema({ type: SchemaType.NUMBER, typeCheck }, transforms(number), ...defs);
