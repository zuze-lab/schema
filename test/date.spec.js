import { Date as sDate } from 'sugar-date';
import { date, cast } from '../src';

describe('date', () => {
  it('should cast things to a date', () => {
    const dt = new Date();
    expect(cast(date(), '1970-01-01')).toBeInstanceOf(Date);
    expect(cast(date(), dt)).toBe(dt);
  });

  it('should accept an alternate parser for a date', () => {
    const string = 'last wednesday';
    expect(cast(date(sDate.create), string)).toEqual(sDate.create(string));
  });
});
