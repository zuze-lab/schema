---
id: utilities
title: Utilities
sidebar_label: Utilities
---

Utility methods are methods designed to functionally manipulate a schema definition.

AST examples are provided, where applicable, for the sake of completeness.

import { AstFn, ZuzeTabs } from '../src/examples/tabs';

## nullable

**`nullable(isNullable: boolean = true)`**

Indicates whether `null` is a valid value for this schema.

<AstFn>

```js
isValidSync(createSchema({nullable:true}), nullable()),null); // true
isValidSync(createSchema({}) ,null); // false
```

```js
isValidSync(mixed(tests(required()), nullable()),null); // true
isValidSync(mixed(tests(required())) ,null); // false
```

</AstFn>

**Note:** `nullable() === nullable(true)`

## typeError

**`typeError(string | ({value,label}) => string)`**

Sets the error message for the typeError. `value` and `label` are available as interpolation parameters.

## def

**`def(value | () => value)`**

Sets the default value of a schema when the provided value is `undefined`.

<AstFn>

```js
cast(createSchema({default:'jim'})); // "jim"
cast(createSchema({default:() => new Date()})), undefined); // Sun Mar 15 2020 11:26:32 GMT-0300 (Atlantic Daylight 
```

```js
cast(mixed(def('jim')), undefined); // "jim"
cast(mixed(def(() => new Date()),undefined); // Sun Mar 15 2020 11:26:32 GMT-0300 (Atlantic Daylight Time)
```

</AstFn>


## label

**`label(string | () => string)`**

Sets the label on a schema - used for interpolation in error messages.

<AstFn>

```js
{
    schema:'string',
    label:'firstName'
}
```

```js
string(label('firstName'));
```

</AstFn>

## meta

Sets the meta property on a schema

<AstFn>

```js
{
    schema:'string',
    meta: {
        someKey:'someVal'
    }
}
```

```js
string(meta({someKey:'someVal'}));
```

</AstFn>

## tests

**`tests(...ValidatorDefinition[])`**

Adds tests to a schema

<AstFn>

```js
const schema = {
    schema: 'string',
    tests: ['required',['min',10]]
};
```

```js
string(tests(required(),min(10)))
```

</AstFn>

## test

**`(name: string,TestFn: (value,{schema,options}) => boolean | ValidationError | Promise<boolean | ValidationError>)`**

Functional way to create a validator

```js
const isJim = test('isJim',value => value === 'jim');

const async = test('asyncValidator',async value => {
    try {
        await doSomething(value);
        return true;
    } catch(err) {
        return false;
    }
});

mixed(tests(isJim,async));

// create a validator that accepts an argument
const isThing = (arg) => test('isThing',value => value === arg);
mixed(tests(isThing('one')));
```

## transforms

**`transforms(...TransformFn[])`**

Adds transforms to a schema

<AstFn>

```js
const schema = {
    schema: 'string',
    transforms: ['strip','uppercase']
};
```

```js
string(transforms(strip(),uppercase()))
```

</AstFn>

## conditions

**`conditions(...Condition[])`**

Adds conditions to a schema

<AstFn>

```js
const schema = {
    schema: 'string',
    conditions: [
        {
            when: { fieldA: { tests: [['is','jim']] } },
            then: { tests: [['min', 10]] },
            otherwise: { tests: [['min', 20]] }
        }
    ]
};
```

```js
string(conditions(when('fieldA',{
    is: 'jim',
    then: tests(min(10)),
    otherwise: tests(min(20))
})))
```

</AstFn>

## when/condition

`when` is an alias of the `condition`

<AstFn>

```js
const schema = {
    schema:'string',
    conditions: [
        {
            when: {
                dep1: { tests:['required', ['is','jim']] },
                dep2: { schema: 'number', tests: [['min',10],['max',20]]}
            },
            then:{
                schema: 'string',
                tests: ['required']
            },
            otherwise:{
                schema: 'number',
                tests: [['min',10]]
            }
        }
    ]
}
```

```js
const first = when(
    ['dep1','dep2'],
    (dep1,dep2,schema) => nextSchema)
);

const second = when(
    ['dep1','dep2'],
    {
        is: (dep1,dep2) => boolean,
        then: Schema | Partial<Schema> | (schema: Schema) => nextSchema,
        otherwise: Schema | Partial<Schema> | (schema: Schema) => nextSchema
    }
);
```

</AstFn>

## ref

Create a [reference](conditions.md#refs) to another field or [context](conditions.md#context)

<AstFn>

```js
const schema = {
    schema: 'object',
    shape: {
        fieldA: {
            schema: 'string',
            tests: [['oneOf',[{ref:'fieldA'},ref:{'$context.field'}]]]
        }
    }
}
```

```js
const schema = object({
    fieldA: string(tests(
        oneOf([
            ref('fieldA'),
            ref('$context.field')
        ])
    ))
})
```

</AstFn>

---

The following two utility method are used to manipulate a schema definition 

## without

**without(property: string, schema: Schema, ...refs: any[]): Schema**

Removes a property from a schema definition. If the property is an array it removes any reference given by `...refs` from the array.

```js
const schema = string(label('my field'));
const labelessSchema = without('label', schema);

// IMPORTANT: schema !== labelessSchema

const minTest = min(10);
const maxTest = max(20);

const schema = string(tests(minTest, maxTest));

// returns a schema without minTest
const withoutMin = without('test', schema, minTest);
```

## of

**`of(schema: Schema)`**

Defines the inner schema of an array schema.

<AstFn>

```js
{
    schema: 'array',
    of: { schema: 'number', tests: [['min',10]] }
}
```

```js
array(of(number(tests(min(10)))));
```

</AstFn>

## shape

**`shape({[key: string]: Schema})`**

Defines the inner schema of an object schema.

<AstFn>

```js
{
    schema: 'object',
    shape: {
        fieldA: { schema: 'number', tests: [['min', 10]] },
        fieldB: { schema: 'string', tests: ['required'] }
    }
}
```

```js
object(shape({
    fieldA: number(tests(min(10))),
    fieldB: string(tests(required()))
}))
```

</AstFn>

## withoutAny

**withoutAny(property: string, schema: Schema): Schema**

Removes all transforms/conditions/tests from a schema

```js
const schema = string(tests(min(10),max(20)));
const withoutValidations = withoutAny('test',schema);
```

## warnings

**`warnings(shouldWarn: boolean = false)`**

There are certain warnings that occur in **@zuze/schema** that you may want to suppress in a production environment. Warnings are enabled by default and can be turned off by calling `warnings(false)`.