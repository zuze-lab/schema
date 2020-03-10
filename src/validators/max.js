import { SchemaType } from '../utils';
import cast from '../cast';
import { restrict } from './utils';

const test = (against, inclusive = true) => (value, { schema, resolve }) => {
  against = resolve(against);
  const t = (a, b) => (inclusive ? a <= b : a < b);
  switch (schema.type) {
    case SchemaType.STRING:
    case SchemaType.ARRAY:
      return t(
        value.length,
        typeof against.length !== 'undefined' ? against.length : against
      );
    case SchemaType.NUMBER:
      return t(value, against);
    case SchemaType.DATE:
      return t(value.valueOf(), cast(schema, against));
  }
};

export default (
  against,
  { inclusive, message, params = {}, name = 'max', check } = {}
) => ({
  name,
  test: test(against, inclusive),
  params: { max: against, ...params },
  exclusive: true,
  message,
  check:
    check ||
    restrict(
      [SchemaType.STRING, SchemaType.ARRAY, SchemaType.DATE, SchemaType.NUMBER],
      name
    ),
});
