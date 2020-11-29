---
id: conditions
title: Conditions
sidebar_label: Conditions
---

import { AstFn, ZuzeTabs } from '../src/examples/tabs';

Conditions are arguably the most powerful part of **@zuze/schema**. Some methods to handle conditional validations is present in virtually all schemas, but **@zuze/schema** aims to to boil complicated conditional logic when it comes to schema validation down to a very simple and intuitive API (especially via the [AST](typeref.md#ast))

Schemas can be conditional based on two properties, 

1. fields somewhere in the value being validated or
2. context.

Both of which are accessible via [refs](#refs)

## Creating Conditions

There are multiple supported syntaxes to create conditions, almost all of which are based on a WTO (when-then-otherwise) concept. Arguably the easiest to understand is [AST](ast.md#conditions) format.

### Functional

`when` can accept two arguments, the first is a string (or an array of strings) and the second is a function that accepts the resolved values of the specified dependencies and the original schema.


```js
const conditional = string(
    tests(required()),
    conditions(when('fieldA', (fieldA, schema) => {
        return fieldA >= 10 ? schema : extend(schema,tests(min(20)))
    }))
)

const schema = object({c:conditional})

isValidSync(schema, {fieldA: 10, c: 19}); // true
isValidSync(schema, {fieldA: 8, c: 19}); // false
```

```js
// array of dependencies
const conditional = string(
    tests(required()),
    conditions(when(['fieldA','fieldB'], (fieldA, fieldB, schema) => { ... }))
)
```

`when` can also accept an object format as it's second argument

```js
// then or otherwise do not both need to specified, but at least one of them is required

const conditional = string(
    tests(required()),
    conditions(when('fieldA', {
        is: fieldA => fieldA >= 10,
        otherwise: tests(min(20))
    }))
)

const schema = object({c:conditional})

isValidSync(schema, {fieldA: 10, c: 19}); // false
isValidSync(schema, {fieldA: 8, c: 19}); // true
```

### AST Syntax

The AIM of AST syntax is to be extremely readable:

```js
const conditional = createSchema({
    schema: 'string',
    tests: ['required'],
    conditions: [
        {
            // if the value at fieldA does not pass these validators
            when: { fieldA: { tests: [['min',10]] } },
            // ... add in the following AST schema definition
            otherwise: { tests: [['min',20]] }
        }
    ]
});

isValidSync(schema, {fieldA: 10, c: 19}); // false
isValidSync(schema, {fieldA: 8, c: 19}); // true

```

`conditions` is an array and you can create as many conditions as you need. They will be evaluated in the order they were added to the SchemaDefinition.


## Refs

A ref (i.e. reference) is a pointer to a sibling/ancestor in the value that is being validated or a value from context. They are used in [validators](validators.md) (where supported) and to resolve conditional schemas. 

Refs are also accessed via the path notation using [getter](https://www.npmjs.com/package/property-expr#getterexpression--safeaccess-) from [property-expr](https://www.npmjs.com/package/property-expr)

<AstFn>

```js
{
    schema: 'string',
    tests: [['is', { ref: '$ctx.prop' }]]
}
```

```js
string(tests(is(ref('$ctx.prop'))));
```

</AstFn>

### Sibling

Sibling references are accessed by specifying the object property.

<AstFn>

```js
{
    schema: 'object',
    shape: {
        fieldA: {
            tests: [['oneOf', [{ ref: 'fieldB' }, { ref: 'fieldC' }]]]
        },
        fieldB: { schema: 'string' },
        fieldC: {
            schema: 'object',
            shape: {
                fieldD: { schema: 'string' }
            }
        }
    }
}
```

```js
object({
    fieldA: mixed(tests(oneOf([
        ref('fieldB'),
        ref('fieldC.fieldD')
    ]))),
    fieldB: string(),
    fieldC: object({
        fieldD: string()
    })
})
```

</AstFn>

### Context

Context can also be used to resolve conditions. Context is accessed using a special prefix (`$` by default, but this can be changed by setting the `contextPrefix` option when casting/validating a schema). 

<AstFn>

```js
{
    schema: 'string',
    conditions: [
        {
            when: { '$ctx.prop': { tests: [['is',5]] } },
            then: { tests: [['min',5]] },
            otherwise: { tests: [['min', {ref:'$ctx.otherProp'}]]}
        }
    ]
}
```

```js
string(
    conditions(
        when('$ctx.prop',{
            is:5,
            then: tests(min(5)),
            otherwise: tests(min(ref('$ctx.otherProp')))
        })
    )
)
```

</AstFn>

### Relative Refs (!)

Relative refs allow access to ancestors schemas/values from a child schema. They are defined by prefixing with a ref with a `.`. Every `.` in the prefix goes up "one level" of schema.

Casting the below object schema results in the following output:

```
{
    fielda: {
        field1: { 
            field1: 'bill',
            field2: 'joe' 
        },
        field3: { 
            field4: 'joe' 
        }
    },
    field5: 'joe'
}
```

<AstFn>

```js
{
    schema: 'object',
    shape: {
        fielda: {
            schema: 'object',
            shape: {
                field1: {
                    schema: 'object',
                    shape: {
                        field1: { default: 'bill' },
                        field2: { default: { ref: '.field3.field4' } }                        
                    }
                },
                field3: {
                    schema: 'object',
                    shape: {
                        field4: { default: { ref: '..field5' } }
                    }
                }
            }
        },
        field5: {
            default: 'joe'
        }
    }
}
```

```js
object({
    fielda: object({
        field1: object({
        field1: lazy(() => mixed(def('bill'))),
        field2: conditional(
            condition('.field3.field4', field => mixed(def(field)))
        ),
        }),
        field3: object({
        field4: conditional(
            condition('..field5', field => mixed(def(field)))
        ),
        }),
    }),
    field5: mixed(def('joe')),
})
```

</AstFn>