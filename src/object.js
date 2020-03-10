import { SchemaType, isObject, isSchema } from './utils';
import { schema } from './schema';
import { transforms } from './transforms/utils';
import { object } from './transforms';

export const shape = (shape = {}) => ({
  shape: Object.entries(shape).reduce((acc, [k, v]) => {
    if (!isSchema(v)) throw new Error(`Value at field ${k} is not a schema`);
    return acc;
  }, shape),
});

export default (...defs) => {
  if (defs[0] && Object.values(defs[0]).some(v => isSchema(v))) {
    defs[0] = shape(defs[0]);
  }
  return schema(
    {
      type: SchemaType.OBJECT,
      typeCheck: isObject,
      inner: ({ shape }) => shape,
    },
    transforms(object),
    ...defs
  );
};
