import { schema } from './schema';
import { transforms, date } from './transforms';
import { SchemaType } from './utils';

export const typeCheck = val => val instanceof Date && !isNaN(val.getTime());

export default (...defs) =>
  schema(
    { type: SchemaType.DATE, typeCheck },
    transforms(date(typeof defs[0] === 'function' ? defs.shift() : undefined)),
    ...defs
  );
