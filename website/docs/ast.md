---
id: ast
title: AST
sidebar_label: AST
---

The Abstract Syntax Tree (AST) format for **@zuze/schema** is intuitive. It mirrors the functional API virtually completely. 

## Passing Arguments

When it comes to `tests` and `transforms`, each item in the array is evaluated as a function name. Or, in the case of the item in the array being an array itself, the first item is used as the function name and all subsequent values in the array will be passed to it as arguments.

```js
{
    schema: 'array',
    tests: [ 'required', ['min', 5, { message: 'At least 5 items required' } ] ],
    transforms: [ 'compact' ]
}

// functional equvialent
array(
    tests( required(), min(5, { message: 'At least 5 items required' } )),
    transforms( compact() )
)
```

### Conditions

Using the AST API conditions is an array of condition objects:

```js
// ConditionObject
when: ObjectAST | ObjectAST[],
then?: Partial<AST>,
otherwise?: Partial<AST>

// ObjectAST
{
    [key: string]: AST | AST[]
}
```

When `when` is an array, if ANY of the [`ObjectAST's`](#objectast) are matched (using [matches](#matches)), the `then` will be applied (if present). If not, the `otherwise` will be applied (if present).

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

## Custom Transforms/Validators

By default, all transforms/validators available in **@zuze/schema** are available via the AST. But part of the beauty of **@zuze/schema** is being able to [create your own transforms/validators](creating-validators-transforms.md). 

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

[compact](transforms.md) accepts a rejector function in the functional form. In the AST form it accepts an argument that will be passed to [matches](#matches). Any value in the array that passes `matches` will be excluded.

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

As you'll remember, [serial](validators.md#serial) is a validator that 

```js
const schema = {
    schema: 'number',
    tests: [['serial',['between',10,20]]]
}
```

## API

### matches

`matches(AST | AST[], options = {}): boolean | Promise<boolean>`

**Note:** `matches` runs synchronously BY DEFAULT unless `sync:false` is passed as an option.

### createSchema

`createSchema(AST, options = {}): Schema`

### createSchemas

`createSchemas(AST[], options = {}): Schema[]`

## Types

### AST

```js
{
    schema: 'mixed' | 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array';
    default: any;
    tests: ASTFn[];
    transforms: ASTFn[];
    conditions: ASTCondition[];
    meta: any;
    label: string;
    shape: ObjectAST;
    of: AST;
    nullable: boolean;
    typeError: string;
}
```
### ASTFn

```js

string | [string, ...any]

```
### ASTCondition

```js
{
    when: ObjectAST | ObjectAST[];
    then?: Partial<AST>;
    otherwise: Partial<AST>
}
```

### ObjectAST

```js
{
    [fieldName: string]: AST | AST[]
}
```
