import { snakeCase } from 'lodash';
import { object, cast, mixed } from '../../src/';
import {
  stripKeys,
  transforms,
  stripUnknown,
  keys,
  from,
  allowKeys,
} from '../../src/transforms';

describe('transforms - object', () => {
  it('should cast JSON', () => {
    expect(cast(object(), JSON.stringify({}))).toEqual({});
  });

  it('should strip unknown keys', () => {
    const subject = {
      a: 'jim',
      b: 'fred',
    };

    const withKeys = object({ a: mixed() }, transforms(stripUnknown()));
    const withoutKeys = object(transforms(stripUnknown()));

    expect(cast(withKeys, subject)).toHaveProperty('a');
    expect(cast(withKeys, subject)).not.toHaveProperty('b');

    expect(cast(withoutKeys, subject)).toEqual({});
  });

  it('should whitelist keys', () => {
    const subject = {
      a: 'jim',
      b: 'fred',
      c: 'jane',
    };
    expect(
      cast(object(transforms(allowKeys('a', 'c'))), subject)
    ).toStrictEqual({
      a: 'jim',
      c: 'jane',
    });
  });

  it('should strip specified keys', () => {
    const subject = {
      a: 'jim',
      b: 'fred',
      c: {},
      d: 'next',
    };

    expect(
      cast(object(transforms(stripKeys('a', 'b', 'c'))), subject)
    ).toEqual({ d: 'next' });
  });

  it('should transform keys', () => {
    const subject = {
      first: 'jim',
      secondKey: 'fred',
      c: {},
      d: 'next',
    };

    expect(
      Object.keys(
        cast(object(transforms(keys(v => snakeCase(v).toUpperCase()))), subject)
      )
    ).toEqual(['FIRST', 'SECOND_KEY', 'C', 'D']);
  });

  it('should alias a key', () => {
    const subject = { first: 'jim' };
    expect(
      cast(object(transforms(from('first', 'new'))), subject)
    ).toMatchObject({ new: 'jim' });
    expect(
      cast(object(transforms(from('first', 'new', true))), subject)
    ).toMatchObject({ new: 'jim', first: 'jim' });
  });
});
