---
id: conditions
title: Conditions
sidebar_label: Conditions
---

**@zuze/schema** aims to boil complicated conditional logic when it comes to schema validation down to a very simple and intuitive API.

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

A ref (i.e. reference) is a pointer to a sibling/relative field being validated

### Sibling

Sibling references are accessed by specifying the field name.

### Context

Context can also be used to resolve conditions. Context is accessed using a special prefix (`$` by default, but this can be changed by setting the `contextPrefix` option when casting/validating a schema). 

### Self-Reference

A self-reference is accessed by doing `ref(.)` This is actually how [lazy](schemas.md#lazy) are created.

### Relative

**@zuze/schema** also allows accessing relative refs with a special syntax using `.`.

If a string key is prefaced by one or more dots (`.`) then it will be resolved relatively. The presence of one dot (`.field3`) means go "up one level", two dots (`..field3`) means go up two levels, etc.