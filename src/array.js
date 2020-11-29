import { SchemaType, isSchema } from './utils';
import { schema } from './schema';
import { transforms, array } from './transforms';
import { isArraySchema } from './utils/definition';

export const of = of => {
  if (!isArraySchema(of))
    throw new Error(
      `Only schemas or an array of schemas are valid as children of the array schema`
    );
  return { of };
};

export const typeCheck = val => Array.isArray(val);

export default (...defs) => {
  if (isSchema(defs[0]) || Array.isArray(defs[0])) {
    defs[0] = { of: defs[0] };
  }
  return schema(
    {
      type: SchemaType.ARRAY,
      typeCheck,
      inner: ({ of }) => of,
    },
    transforms(array),
    ...defs
  );
};
