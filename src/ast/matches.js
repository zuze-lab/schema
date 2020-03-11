import { isValid } from '../validate';
import { createSchemas } from './createSchema';

export default (defs, value, options = {}) => {
  const how = options.all === true ? 'every' : 'some';
  const sync = options.sync !== false; // runs sync by default
  const maps = createSchemas(defs, options);
  const opts = { ...options, abortEarly: true, sync };
  const run = m => isValid(m, value, opts);
  return sync
    ? maps[how](run)
    : Promise.all(maps.map(run)).then(r => r[how](f => !!f));
};
