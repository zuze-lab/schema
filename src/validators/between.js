import { SchemaType } from '../utils';
import combine from './combine';
import { test, restrict } from './utils';
import min from './min';
import max from './max';

export default (
  low,
  high,
  { inclusive, message, params = {}, name = 'between' } = {}
) =>
  test(name, combine(min(low, { inclusive }), max(high, { inclusive })), {
    message,
    exlusive: true,
    check: restrict(
      [SchemaType.STRING, SchemaType.ARRAY, SchemaType.DATE, SchemaType.NUMBER],
      name
    ),
    params: { ...params, low, high },
  });
