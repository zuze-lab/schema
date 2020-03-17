---
id: extending
title: Extending
sidebar_label: Extending
---

import { AstFn, ZuzeTabs } from '../src/examples/tabs';

One of the best parts of **@zuze/schema** (aside from the cool [conditions](ast.md#conditions)) is the ability to extend it with your own custom validators/transforms.

**Note:** There are some special rules about using custom transforms/validators when using the [AST API](ast.md#custom-transformsvalidators).

## Creating Validators

Validators are simple objects [definitions](typeref.md#validatordefinition), the only required properties are `name` and `test`.

For convenience there's a [helper method](utilities.md#test) to help in creating custom tests.

No matter what type of validator [async](#async) or [sync](#sync) the validator must return a boolean or [ValidationError](typeref.md#validationerror), the latter can be created using the `createError` method passed in to the validator function.

The signature of a validator test looks like:

```js
test(
    value: any, 
    { 
        schema: SchemaDefinition, 
        options: ValidationOptions, 
        createError: ({message?: string or () => string, params?: object, name?: string }), 
        resolve: (optionalRef: any) => resolvedValue
    }
) : boolean | ValidationError | Promise<boolean | ValidationError> 
```


To return a [ValidationError](typeref.md#validationerror):

```js
const mustBeJim = (value, {createError}) => value === 'jim' || createError();
```

If `optionalRef` is not a [ref](conditions.md#ref) then it will be returned, otherwise the resolved value will be returned:

```js
const myTest = (arg) => (value,{resolve}) => {
    console.log(resolve(arg));
};

const context = { a: 'jim' }

validate(mixed(tests(myTest('a'))), 'some value'); // logs 'a';
validate(mixed(tests(myTest(ref('$a')))), 'some value', { context } ); // logs 'jim'
```

### Async

Async validators are trivial to create - just use async-await.

**Note:** `async` validators will **not be run** (a [warning](utilities.md#warning) will be logged) in the schema is being validated synchronously.

```js
const mustBeSomethingAsync = async (value,{createError}) => {
    try {
        await someAsyncCall(value);
        return true;
    } catch(err) {
        return createError({message:err})
    }
}
```

### Accepting Arguments

Most validators require arguments to function correct like:

```js
min(10);
between(10,15);
oneOf(['a','b',ref('fieldA')])
```

To create a validator that accepts arguments is straightforward:

```js

const containsCharater = character = test(
    'containsCharacter',
    (value,{createError,resolve}) => value.matches(new RegExp(resolve(character)))
)

const context = { char: 'i' };
mixed(tests(containsCharacter(ref('$char'))), 'jim', { context });
```

## Creating Transforms

[Transform functions](typeref.md#transformfn) are run in the order they have been added to a [SchemaDefinition](typeref.md#schemadefinition) (unless strict is false). **@zuze/schema** includes a lot of neat [transforms](transforms.md) by default, but in case you wanted to extend it, it's pretty easy:

<AstFn>

```js
const replaceAllAsWith = replaceWith => val => val.replace(/a/gi,replaceWith);

const schema = createSchema(
    {
        schema: 'string',
        transforms: [['replaceAllAsWith','b']]
    },
    {
        transforms: { replaceAllAsWith: () => replaceAllAsWith }
    }
);
cast(schema, `Alas, it's too late!`); // 'blbs, it's too lbte!'
```

```js
const replaceAllAsWith = replaceWith => 
    val => val.replace(/a/gi,replaceWith);

const schema = string(transforms(replaceAllAsWith('b')))
cast(schema, `Alas, it's too late!`); // 'blbs, it's too lbte!'
```

</AstFn>