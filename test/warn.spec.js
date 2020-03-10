import { warnings, isValidSync, boolean, string } from '../src';
import { tests, min, test } from '../src/validators';

describe('warn', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    warnings(true);
  });

  it('should suppress warnings', () => {
    // do something that warns - try to add a min validate to an object schema
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const doit = () => isValidSync(boolean(tests(min(5))), true);

    doit();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();

    // stop the warnings
    warnings(false);
    doit();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should warn if a thenable is returned during a synchronous run', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();

    expect(
      isValidSync(string(tests(test('my test', async () => false))), 'jim')
    ).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
