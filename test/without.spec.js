import { string, without, withoutAny } from '../src';
import { min, max, tests } from '../src/validators';
import { SchemaType } from '../src/utils';
import { transforms } from '../src/transforms';
import { condition, conditions } from '../src/conditions';

describe('without', () => {
  it('should remove a test', () => {
    const first = min(10);
    const second = max(10);
    const schema = string(tests(first, second));

    expect(schema.test).toContain(first);
    expect(schema.test).toContain(second);

    const modified = without('test', schema, first);
    expect(modified.test).not.toContain(first);
    expect(modified.test).toContain(second);
  });

  it('should remove something all tests', () => {
    const first = min(10);
    const second = max(10);
    const schema = string(tests(first, second));

    expect(schema.test).toContain(first);
    expect(schema.test).toContain(second);

    const modified = withoutAny('test', schema);
    expect(modified.test).not.toContain(first);
    expect(modified.test).not.toContain(second);
  });

  it('should remove a transform', () => {
    const first = () => {};
    const second = () => {};
    const schema = string(transforms(first, second));

    expect(schema.transform).toContain(first);
    expect(schema.transform).toContain(second);

    const modified = without('transform', schema, first);
    expect(modified.transform).not.toContain(first);
    expect(modified.transform).toContain(second);
  });

  it('should remove a condition', () => {
    const first = condition('$first', () => string());
    const second = condition('$first', {
      is: true,
      then: () => string(),
    });

    const schema = string(conditions(first, second));
    expect(schema.condition).toContain(first);
    expect(schema.condition).toContain(second);

    const modified = without('condition', schema, second);
    expect(modified.condition).toContain(first);
    expect(modified.condition).not.toContain(second);
  });

  it('should NOT remove type', () => {
    expect(without('type', string()).type).toBe(SchemaType.STRING);
  });
});
