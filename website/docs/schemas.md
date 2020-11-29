---
id: schemas
title: Schemas
sidebar_label: Schemas
---

import { AstFn, ZuzeTabs } from '../src/examples/tabs';

**@zuze/schema** makes the following schemas available for you to use:

- [mixed](#mixed)
- [string](#string)
- [number](#number)
- [boolean](#boolean)
- [date](#date)
- [lazy](#lazy)
- [object](#object)
- [array](#array)
- [tuple](#tuple)

Unlike yup, joi, and ajv, **@zuze/schema** was designed to be functional and that means that it doesn't use methods. All validators can be added to all schemas regardless of if they make sense (but we'll warn you if you're doing something silly) via the [`tests`](utilities.md#tests) function.

Because of this, our documentation of each schema focuses primarily on the default transforms that come with each schema because, again, schemas don't have methods.

## Schemas

All schema constructor functions (except [lazy](#lazy)) have the same signature:

```js
schema(...defs: Partial<SchemaDefinition>[])
```

[object](#object), [array](#array) and [date](#date) may also accept different parameters as their first parameter.

### mixed

A mixed schema is an abstract schema, it's use is generally not encouraged except maybe for the base of a conditional schema. 

[Partial definitions](creating-schemas.md#partial-definitions) can be passed to it as arguments just like any other:

**NOTE: `mixed` schemas DO NOT perform any default transform on its value at validation/cast time.**

<AstFn>

```js
import { ast } from '@zuze/schema'
const { createSchema } = ast;

const sku = createSchema({
    schema: 'mixed',
    nullable: true,
    label:'sku',
    // a contrived example, I know :)
    conditons:[
        {
            when: { product: { tests: [['is','snowboard']]} },
            then: { schema: 'string', tests: [['matches','^[0-9A-Z]{10,20}$']]] },
            otherwise: { schema: 'number', tests: [['min',10]] }
        }
    ]
});
```

```js
import { string, label, nullable, conditions, when, tests, matches, min } from '@zuze/schema';

const sku = mixed(
  label('sku'),
  nullable(true),
  conditions(
    when('product', {
      is: 'snowboard',
      then: () => string(tests(matches('^[0-9A-Z]{10,20}$'))),
      otherwise: () => number(tests(min(10)))
    })
  )
);
```

</AstFn>

### string

Accepts values that are strings and attempts to cast the subject value to a string at validation/cast time.

<AstFn>

```js
import { ast, cast, getErrors } from '@zuze/schema'
const { createSchema } = ast;

const schema = createSchema({
    schema: 'string',
    tests: ['required', ['min',10]]
});

cast(schema,9) // "9"
isValidSync(schema,9); //false
getErrors(schema,9); // field must not be shorter than 10 characters
```

```js
import { string, tests, required, min, getErrors, isValidSync } from '@zuze/schema';

const schema = string(tests(required(),min(10)))

cast(schema,9) // "9"
isValidSync(schema,9); //false
getErrors(schema,9); // field must not be shorter than 10 characters
```

</AstFn>

### number

A number schema attempts to coerce the subject value to a numeric value, if it isn't one.

<AstFn>

```js
import { ast, cast, getErrors } from '@zuze/schema'
const { createSchema } = ast;

const schema = createSchema({
    schema: 'number',
    tests: ['required', ['between',10,20]]
});

cast(schema, "18") // "18"
isValidSync(schema, "18"); // true
getErrors(schema, "7"); // field must be between 10 and 20
```

```js
import { string, tests, required, between, getErrors, isValidSync } from '@zuze/schema';

const schema = string(tests(required(),between(10,20)))

cast(schema, "18") // 18
isValidSync(schema, "18"); // true
getErrors(schema, "7"); // field must be between 10 and 20
```

</AstFn>

### boolean

A boolean schema attempts to coerce the subject value to a boolean (starting to notice a pattern?)

<AstFn>

```js
import { ast, cast, validateSync, getErrors } from '@zuze/schema'
const { createSchema } = ast;

const schema = createSchema({
    schema: 'boolean',
    typeError: 'must be a boolean'
});

cast(schema, "ture") // TypeError
validateSync(schema,"ture") // ValidationError - must be a boolean
isValidSync(schema, "true"); // true
getErrors(schema, "ture"); // must be a boolean
```

```js
import { cast, boolean, typeError, getErrors, validateSync, isValidSync } from '@zuze/schema';

const schema = boolean(typeError('must be a boolean'))

cast(schema, "ture") // throws TypeError
validateSync(schema,"ture") // throws ValidationError - must be a boolean
isValidSync(schema, "true"); // true
getErrors(schema, "ture"); // must be a boolean
```

</AstFn>

### date

A date schema is the first deviation from the regular pattern. Instead of only accepting partial schema definitions, it can accept a function (**only as it's first parameter**). If a function is given, that function will be used as a mechanism to parse the subject value to convert it to a Date object. If no function is given it will use [date-fns parseISO](https://date-fns.org/v2.10.0/docs/parseISO) (optional dependency, don't forget to install it!).

Providing your own parser allows you to tree-shake date-fns if you don't need it, or it also allows you to do some really cool [relative date parsing](https://sugarjs.com/dates/#/Parsing) using other libraries.

<AstFn>

```js
import { Date as SugarDate } from 'sugar-date';
import { ast, cast } from '@zuze/schema';
const { createSchema } = ast;

const schema = createSchema({schema: 'date'},{dateParser:SugarDate.create});
cast(schema, 'last wednesday'); //Wed Mar 11 2020 00:00:00 GMT-0300 (Atlantic Daylight Time)
```

```js
import { Date as SugarDate } from 'sugar-date';
import { cast, date } from '@zuze/schema';

cast(date(SugarDate.create), 'last wednesday'); //Wed Mar 11 2020 00:00:00 GMT-0300 (Atlantic Daylight Time)
```

</AstFn>

### lazy

A lazy schema has no AST-equivalent because it doesn't need one. It's for developers who like to write functional code. 

It accepts only a single parameter - a function that is called with the subject value that must return a schema.

```js
import { lazy, getErrors, isValidSync } from '@zuze/schema';

const schema = lazy(value => value === 9 ? number(tests(min(9))) : string(tests(min(9))));

getErrors(schema,"9"); // field must be no shorter than 9 characters
isValidSync(schema,9); // true
```

### object

`object` and [`array`](#array) are special schemas in that they have **inner**'s. They can have their own transforms/validations and they can also transform/validate their subschemas. In the case of an object this is done via it's [`shape`](utilities.md#shape)

<AstFn>

```js
const schema = {
    schema:'object',
    shape: {
        firstName:{
            schema:'string',
            tests:['required', ['min',5] ]
        },
        lastName:{
            schema:'string',
            tests:['required', ['min',5] ]
        },        
        address: {
            schema: 'object',
            shape: {
                address1:{
                    schema:'string',
                    tests:['required', ['max',60] ]
                },
                province: {
                    schema:'string',
                    tests:['required',['oneOf',['BC','NL']]]
                }
                postalCode:{
                    schema:'string',
                    tests:['required', ['matches',/^[A-Z]\d[A-Z]\d[A-Z]\d$/i]],
                    conditions:[
                        {
                            // when province is BC
                            when: { province: { tests: [['is','BC']] } },
                            // postal code must start with a V
                            then: { tests: ['matches',/^V/i]] }
                        },
                        {
                            // when province is NL
                            when: { province: { tests: [['is','NL']] } },
                            // postal code must start with a A
                            then: { tests: ['matches',/^V/i]] }
                        },                        
                    ],
                    transforms:['strip'],
                }            
            }
        },
    }
}
```

```js
object({
    firstName: string(tests(required(), min(5))),
    lastName: string(tests(required(), min(5))),
    address: object({
        address1: string(tests(required(), max(60))),
        province: string(tests(required(), oneOf(['BC','NL']))),
        postalCode: string(
            transforms(strip()),
            tests(required(), matches(/^[A-Z]\d[A-Z]\d[A-Z]\d$/i)),
            conditions(
                when('province', {
                    is: 'BC',
                    then: schema => extend(schema, tests(matches(/^V/i)))
                }),
                when('province', {
                    is: 'NL',
                    then: schema => extend(schema, tests(matches(/^A/i)))
                })                
            )
        )
    })
})
```

</AstFn>


### array

An array schema's subschema is given to it via [of](utilities.md#of)

Let's validate the following structure

```js
{
   users: [
       {
           firstName: 'freddie',
           lastName: 'mercury'
       }
   ]
}
```

<AstFn>

```js
const schema = {
    schema: 'object',
    shape: {
        users: {
             schema: 'array',
             of: {
                 schema: 'object',
                 shape: {
                     firstName: { 
                         schema: 'string', 
                         tests: ['required'] 
                     },
                     lastName: { 
                        schema: 'string', 
                        tests: ['required'] 
                     },
                 }
             },
             tests: [ ['min',4] ] // at least 4 user objects 
        }
    }
}
```

```js
object({
    users: array(
        of(
            object({
                firstName: string(tests(required())),
                lastName: string(tests(required())),
            })
        ),
        tests( min(4) )
    )
})
```

</AstFn>

### tuple

A `tuple` is an fixed length array of values. Instead of having a `tuple` schema, we just use `array` but instead of passing `of` a single schema, we pass it an array of schemas:

Let's look at a similar structure to above:

```js
{
    users: [ ['Freddie', 'Mercury'] ]
}
```

<AstFn>

```js
const schema = {
  schema: 'object',
  shape: {
    users: {
      schema: 'array',
      of: {
        schema: 'array',
        of: [
          {
            schema: 'string',
            label: 'first name',
            tests: ['required'],
          },
          {
            schema: 'string',
            label: 'last name',
            tests: ['required'],
          },
        ],
      },
      tests: [['min', 4]],
    },
  },
};

```

```js
object({
  users: array(
    array([
      string(label('first name'), tests(required())),
      string(label('last name'), tests(required())),
    ]),
    tests(min(4))
  ),
});
```

</AstFn>

## Functions

All schema operating functions accept the following arguments:

- schema: [SchemaDefinition](typeref.md#schemadefinition)
- value: any;
- options?: [ValidationOptions](typeref.md#validationoptions)

### cast

**`cast(schema: SchemaDefinition, value: any, options?: ValidationOptions): any`**

Casts a value using a schema's transforms. Transforms are not run when the [ValidationOption](typeref.md#validationptions) `strict` is `true`.

```js
cast(string(), 9); // 9
cast(array(compact()),[1,0]); // [1]
```

### validate

**`validate(schema: SchemaDefinition, value: any, options: ValidationOptions): any`**

When sync is false, returns a Promise that resolves to the passed in value or rejects with a [ValidationError](typeref.md#validationerror).

```js
await validate(string(tests(required())), ''); // ValidationError: field is required
```

### validateSync

Alias for [validate](#validate) with `{ sync: true }` option. Returns the passed in value or throws a [ValidationError](typeref.md#validationerror)

### validateAt

**`validateAt(path: string, schema: SchemaDefinition, value: object | any[], options: ValidationOptions): any`**

**Note:** The `value` passed in must be the value described by the entire schema definition, **not the value at `path`**.

```js
const schema = object({
    fieldA:array(object({
        fieldB:string(tests(min(10)))
    }))
})

await validateAt('fieldA[1].fieldB', schema, {
    fieldA:[
        { fieldB: 9 },
        { fieldB: 'short' }
    ]
});

// throws ValidationError field must be no shorter than 10 characters
```

### validateAtSync

Alias for [validateAt](#validateat) with `{ sync: true }` option.

### isValid

**`isValid(schema: SchemaDefinition, value: any, options: ValidationOptions): Promise<boolean>`**

`isValid` and `isValidSync` **do not throw errors**. These methods always return booleans or Promises that resolve to a boolean.

### isValidSync

Alias for [isValid](#isValid) with `{ sync: true }` option.

### isValidAt

**`isValid(path: string, schema: SchemaDefinition, value: any, options: ValidationOptions): boolean | Promise<boolean>`**

Same as validateAt except this method always returns a boolean or a Promise that resolves to a boolean.

### isValidSyncAt

Alias for [isValidAt](#isValidAt) with `{ sync: true }` option.

### getErrors

**`getErrors(schema: SchemaDefinition, value: any, options?: ValidationOptions)`**

`getErrors` is similar to `validate` except that it returns (instead of throws) error messages.

If accepts an option of `multi: true` to return error messages as an array if `abortEarly` is false.

```js
const schema = string(tests(required(),between(5,10),email()));

getErrors(schema, 'jim'); // field must be between 5 and 10 characters

getErrors(schema, 'jim', { abortEarly: false, multi: true});
/*
[
 'field must be between 5 and 10 characters'
 'field must be a valid email address'
]
*/
```

In the case of on object schema it maps errors to an object where the paths are the keys:

```js
getErrors(
    object({
        firstName: string(tests(min(5))),
        lastName: string(tests(between(5,10))),
        address: object({
            street: string(tests(required())),
            city: string(tests(not('london'))), 
            postal: string(tests(max(6))),
        })
    }),
    {
        firstName: 'joe',
        lastName: 'fred',
        address: {
            city: 'london',
            postal: 'not a postal'
        }
    },
    { 
        abortEarly: false, 
        sync: true 
    }
);

/*
{
    firstName: 'firstName must be not shorter than 5 characters',
    lastName: 'lastName must be between 5 and 10 characters',
    address.street: 'address.street is required',
    address.city: 'address.city must not be london',
    address.postal: 'address.postal must be no longer than 6 characters'
}
*/
```

### getErrorsSync

Alias for [getErrors](#getErrors) with `{ sync: true }` option.