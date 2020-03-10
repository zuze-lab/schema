import { SchemaType } from '../utils';
import { restrict } from './utils';

export default ({ message, params = {}, name = 'noUnknown' } = {}) => ({
  name,
  test: (val, { schema, createError }) => {
    const extraneous = Object.keys(val).filter(
      v => !Object.keys(schema.shape).includes(v)
    );

    return extraneous.length
      ? createError({ params: { ...params, extraneous } })
      : true;
  },
  params,
  message,
  check: restrict([SchemaType.OBJECT], name),
});
