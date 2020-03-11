# @zuze/schema

<!--
[![npm version](https://img.shields.io/npm/v/@zuze/schema.svg)](https://npmjs.org/package/@zuze/schema)
--> 
[![Coverage Status](https://coveralls.io/repos/github/zuze-lab/schema/badge.svg)](https://coveralls.io/github/zuze-lab/schema)
[![Build Status](https://travis-ci.org/zuze-lab/schema.svg)](https://travis-ci.org/zuze-lab/schema)

## What is this?

It's a schema validator (like [yup](https://github.com/jquense/yup) or [joi](https://github.com/hapijs/joi) or [ajv](https://github.com/epoberezkin/ajv)).

## So why can't I use yup or joi or ajv?

You can, they're great! The philosophy behind @zuze/schema was to:

1. Be **functional/composable** (i.e. tree-shakable, only include the validators/transforms/schemas you actually need)

2. Be **configurable** (the exact opposite of 1) - via the AST - to create schema definitions that can be stored once and run ANYWEHRE.

@zuze/schema doesn't claim to be better (it's not) or faster (it's not) than any of the other schema validation projects, but it does aim to have a more fun whether you like to write code or configuration alike!

## What are schema validators good for?

Two things:

1. Validating data structures and providing error messages (forms, API endpoints, etc).

2. Creating configurable everything*.

*`isValid(schema,value)` returns a `boolean` - so it's as good as an `if-else` statement, but better. If your application can consume its logic from a source external to itself (a config file, a service, etc) you get to replace a lot of code with configuration (that your backend might want to share with your frontend), do a lot less releases, and expose yourself to a lot less risk.

## Getting Started

Install it:

```bash
npm install @zuze/schema
# or
yarn install @zuze/schema
```

## Conditional Schemas

Preferred way of creating conditions is by using the AST form of an @zuze/schema

```js
{
    condition({
        when:{
                fieldA: { tests:['required',['min',5]]},
                fieldB: { tests:['required',['min',5]]}
        },
        then?: ...ast
        otherwise?: ...ast
    })
}
```

But you can also do it yup-like:

```js
condition(['fieldA','fieldB'],{
    is:'someVal',
    then?: schema or func
    otherwise?: schema or func
})

// or 

condition(['fieldA','fieldB'],(fieldA,fieldB,originalSchema) => nextSchema)
```

## AST

The declarative nature of a schema makes ASTs pretty straightforward to generate.

While @zuze/schema is a "functional" library, the power of it really lies in it's AST transformer.

Declare a schema as JSON and then transform it into a zuze schema:

when:[
    {
        fieldA:[ast],
        fieldB:[ast]
    }
],
then: ast,
otherwise: ast

```js
{
    schema: 'object' | 'array' | 'string' | 'mixed' | 'date' | 'boolean' | 'number',
    default: 'some value',
    label: 'some label',
    tests:[
        'required', // the name of a validator
        ['max',10] // if an array, the first entry is the name of a validator and all others are passed as arguments to the validator
        ['is',{ref:'$field'}] // works with refs
        ['oneOf',['1','2',{ref:'$field.path'}]], // and nested refs
    ],
    conditions:[
        when: {
            fieldA:{tests:['required']},
            fieldB:{tests:[['oneOf',['jim','joe','bill']]]}
        },
        how:'some',
        then: AST
        otherwise: AST
    ]

    // when schema is 'array' it can accept "of"
    of: {
        schema: 'string',
        tests: [...]
    },

    // when schema is 'object', it can accept "shape":
    shape: {
        fieldA: { schema: 'string' },
        fieldB: { schema: 'mixed' },
    }
}
```