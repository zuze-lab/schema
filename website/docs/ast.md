---
id: ast
title: AST
sidebar_label: AST
---

import { AstFn, ZuzeTabs } from '../src/examples/tabs';

The Abstract Syntax Tree (AST) format for **@zuze/schema** is intuitive. It mirrors the functional API virtually completely. 

## Passing Arguments

When it comes to `tests` and `transforms`, each item in the array is evaluated as a function name. Or, in the case of the item in the array being an array itself, the first item is used as the function name and all subsequent values in the array will be passed to it as arguments.

<AstFn>

```js
{
    schema: 'array',
    tests: [ 'required', ['min', 5, { message: 'At least 5 items required' } ] ],
    transforms: [ 'compact' ]
}
```

```js
array(
    tests( required(), min(5, { message: 'At least 5 items required' } )),
    transforms( compact() )
)
```

</AstFn>

### Conditions

Using the AST API conditions is an array of [ASTCondition](typeref.md#astcondition) objects:

```js
// ConditionObject

when: ObjectAST | ObjectAST[],
then?: Partial<AST>,
otherwise?: Partial<AST>

```

When `when` is an array, if ANY of the [`ObjectAST's`](typeref.md#objectast) are matched (using [matches](#matches)), the `then` will be applied (if present). If not, the `otherwise` will be applied (if present).

```js
const schema = {
    schema: 'mixed',
    conditions: [
        {
            when: {
                someField: { tests: [['is','jim']] }
            },
            then: {
                schema: 'string',
                tests: ['required']    
            },
            otherwise: {
                schema: 'number',
                tests: [ ['min', 10] ]
            }
        }
    ]
}
```

### Refs

Refs are created in AST via [ASTRef](typeref.md#astref)

```js
const schema = {
    schema: 'string',
    conditions: [
        {
            when: {
                fieldA: [['is',{ref:'fieldB'}]]
            }
        }
    ]
}
```

## Custom Transforms/Validators

By default, all transforms/validators available in **@zuze/schema** are available via the AST. But part of the beauty of **@zuze/schema** is being able to [create your own transforms/validators](extending.md). 

When using the AST, each custom transform/validator must be a function (called with the `options` passed to [`createSchema(s)`](#createSchemas)/[`matches`](#matches) that returns a function called with the arguments in the AST.

```js
// validator
const customASTValidator = options => (...args) => ValidatorDefinition

// transform
const customASTTransform = options => (...args) => TransFormFunction
```

The user-supplied transforms/validators need to be given in options argument of [`createSchema(s)`](#createSchemas)/[`matches`](#matches).

```js
const schema = {
    schema:'mixed',
    transforms:[ ['customASTTransform', 'arg1', 'arg2'] ],
    tests:[ ['customASTValidator', 'arg1', 'arg2'] ]
}

const schema = createSchema(schema,{
    transforms: { customASTTransform },
    validators: { customASTValidator }
});
```

## AST Transforms

Some transforms in `@zuze/schema` have AST-specific implementations:


 ### unique

```js
const schema = {
    schema: 'array',
    transforms: [['unique','id']]
}

const subject = [{ id: 1, a: 'a'},{id: 2, a: 'b'},{id: 1,a: 'c'}];
cast(createSchema(schema,subject)); // [ {id:1,a:'a'}, {id:2,a:'b'} ] 
```

### compact

[compact](transforms.md#compact) accepts a rejector function in the functional form. In the AST form it accepts an argument that will be passed to [matches](#matches). Any value in the array that passes `matches` will be excluded.

```js
const schema = {
    schema: 'array',
    transforms: [['compact', { tests:[['is', 'jim']] } ]]
}

const subject = ['first', 'jim', 'third', 9];
cast(createSchema(schema,subject)); // ['first', 'third', 9]
```

## AST Validators

There are some functional validators that require some tweaking to be mirrored by the AST - namely [`oneOfType`](validators.md#oneOfType), [`negate`](validators.md#negate), and [`serial`](validators.md#serial).

### oneOfType

```js
const schema = {
    schema: 'mixed',
    tests: [['oneOfType',[
        {
            schema: 'string',
            tests: [['min',5]]
        },
        {
            schema: 'number',
            tests: [['between',10,20]]
        }
    ]]]
}
```

### negate

```js
const schema = {
    schema: 'number',
    tests: [['negate',['between',10,20]]]
}
```

### serial

As you'll remember, [serial](validators.md#serial) is a validator that runs the ValidatorDefinitions passed to it sequentially, stopping after the first one fails. It's only necessary when dependent async validations.

```js
const schema = {
    schema: 'number',
    tests: [['serial', [['between', 10, 20]]]]
}
```

## API

### matches

**`matches(AST | AST[], options = {}): boolean | Promise<boolean>`**

Not to be confused with the matches validator:

```js
import { ast } from '@zuze/schema';
const { matches } = ast;
```

`matches` runs synchronously BY DEFAULT unless `sync:false` is passed as an option.
It is equivalent to running [isValidSync](schemas.md#isValidSync) on a SchemaDefinition

`matches` accepts [AST](typeref.md#ast) or an array of [ASTs](typeref.md#ast) and returns true (or a Promise resolving to true) if **any** of the [ASTs](typeref.md#ast) are valid. If you pass `{how:'every'}` as an option then it will only return true if all of the [ASTs](typeref.md#ast) are valid.

```js
const defs = [
    { schema:'string', tests:[['min',15]] },
    { schema:'string', tests:['email'] }
]

matches(defs, 'at least 15 chars'); // true
matches(defs, 'me@you.com'); // true
matches(defs, 'me@you.com', {how:'every'}); // false
matches(defs, 'me@muchlongeraddress.com', {how:'every'}); // true
```

### createSchema

**`createSchema(AST, options = {}): Schema`**

Converts an [AST](typeref.md#ast) to a SchemaDefinition that can be passed to one of the functional methods like [cast](schemas.md#cast), [validate](schemas.md#validate)/[validateSync](schemas.md#validateSync), [isValid](schemas.md#isValid)/[isValidSync](schemas.md#isValidSync), [validateAt](schemas.md#validateAt)/[validateAtSync](schemas.md#validateSync)

```js
createSchema({schema:'string'}); // equivalent to string()
```

### createSchemas

**`createSchemas(AST | AST[], options = {}): Schema[]`**

Same as [createSchema](#createschema) except it returns an array of SchemaDefinitions and can accept a single [AST](typeref.md#ast) or an array

```js
createSchema([{schema:'string'},{schema:'number'}]);
// returns eqivalent of [ string(), number() ]
```
