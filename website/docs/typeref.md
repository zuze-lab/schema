---
id: type-reference
title: Type Reference
sidebar_label: Type Reference
---

## SchemaDefinition

```js
{
    default: any | () => any;
    meta: any | () => any;
    label: string | () => string;
    typeError: string | () => string; // error message/message function on validation if value cannot be coerced
    test: ValidatorDef[]; // validations to be run
    transform: TransformFn[]; // transforms applied (usually to coerce values)
    condition: ConditionDef[]; // conditions that can be used to modify a schema
    nullable: boolean; // whether or not null is an acceptable value for this schema
}
```

## ValidationError
```js
{
    name: 'ValidationError';
    value: any; // value being validated
    path: string; // path at which the error occurred
    type: string; // validator name
    message: string;
    inner: ValidationError[]; // when more than one ValidationError occurred
}
```

## ValidatorDef

```js
{
    // name of validator
    name: string;

    // the test
    test: (value: any, {schema: SchemaDefinition, options: ValidationOptions}) => boolean | ValidationError | Promise<boolean | ValidationError>;

    // error message if the test fails
    message?: string | (params: object) => string;

    // whether multiple of tests with this name should be run
    exclusive?: boolean;
    // pre-validation check to see if validator is applicable to the current schema/value
    check?: (value: any, schema: SchemaDefinition) => boolean 
}
```

## ValidationOptions
```js
{
    context: object = {};
    contextPrefix: string = '$'; // access refs by prefixing them with this character
    abortEarly: boolean = true; // stops synchronous schemas 
    strict: boolean = false; // if true, transforms will not be run
    recursive: boolean = true; // validate inner schemas (relevant to array/object schemas)
    messages: object = defaultValidationMessages;
}
```

## TransformFn
```js
(
    value: any, 
    originalValue: any, 
    { schema: SchemaDefintion, options: ValidationOptions }
) => any
```

## ConditionDef

Note, this is different than the [ASTCondition](ast.md#astcondition)

In practice, the [when/condition](utilities.md#condition) function is used to generate this:

```js
{
    resolve: (...args,schema: SchemaDefinition) => SchemaDefinition
    refs: [ ...dependencies: string[] ]
}
```

## ValidatorOptions

The final object argument that can be passed to most validator functions:

```js
{
    name?: string;
    params?: object;
    message?: string | (params: object) => string;
}
```

## AST

Types for constructing schemas using the AST syntax:

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
string | [string, ...args: any[]]
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
    [fieldName: string]: AST | AST[],
    ...
}
```

### ASTRef

```js
{
    ref: string
}
```