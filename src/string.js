import { schema } from './schema';
import { string, transforms } from './transforms';
import { SchemaType } from './utils';

export const typeCheck = v => typeof v === 'string';

export default (...defs) =>
  schema({ type: SchemaType.STRING, typeCheck }, transforms(string), ...defs);
