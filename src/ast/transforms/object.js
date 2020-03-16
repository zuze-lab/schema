import { stripWhere as sw, allowWhere as aw } from '../../transforms/object';
import matches from '../matches';

const matchShape = (options, key, value, shape) =>
  matches(
    (Array.isArray(shape) ? shape : [shape]).map(shape => ({
      schema: 'object',
      shape,
    })),
    { key, value },
    options
  );

export const stripWhere = options => shape =>
  sw((key, value) => matchShape(options, key, value, shape));

export const allowWhere = options => shape =>
  aw((key, value) => matchShape(options, key, value, shape));
