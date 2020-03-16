---
id: creating-schemas
title: Creating Schemas
sidebar_label: Creating Schemas
---

import { AstFn, ZuzeTabs } from '../src/examples/tabs';

## About Schemas

A schema definition looks, quite literally, like this:

```js
{
    default: value | Function;
    meta: value | Function;
    label: string | Function;
    typeError: string | Function; // error message/message function on validation if value cannot be coerced
    test: ValidatorDef[]; // validations to be run
    transform: TransformFn[]; // transforms applied (usually to coerce values)
    condition: ConditionDef[]; // conditions that can be used to modify a schema
    nullable: boolean; // whether or not null is an acceptable value for this schema
}
```

Schema definitions can be created using AST or functionally with the help of [utility methods](utilities.md)

<AstFn>

```js
import { ast } from '@zuze/schema'

const { createSchema } = ast;

const firstName = {
    schema: 'string',
    default: 'joe', // default value for this field is joe
    nullable: false,
    label: 'firstName',
    tests:['required'],
    conditions:[
        {
            when: { lastName: { tests: [['is','smith']] } }, // if the lastName field is smith...
            then: { tests: [['min',10]] }, // then this field should be at least 10 characters
            otherwise: { tests: [['min',20]] } // otherwise it only needs to be 5 characters
        }
    ]
};

const lastName = { schema: 'string' }

const form = {
    schema: 'object',
    shape: { firstName, lastName }
};

const formSchema = createSchema(form);
```

```js
import { string, object, min, conditions, def, tests, required, when, label, nullable } from '@zuze/schema';

const firstName = string(
  label('firstName'),
  nullable(false),
  def('joe'),
  tests(required()),
  conditions(
    when('lastName', {
      is: 'smith',
      then: tests(min(10)),
      otherwise: tests(min(20)),
    })
  )
);

const lastName = string();

const formSchema = object({ firstName, lastName });
```
</AstFn>

## Partial Definitions

A partial schema definition is just that, it is some part of the object that makes up a whole schema definition. The following would be partial schema definitions:

```js
const label = { label:'joe' };
const nullable = { nullable: true };
const meta = { meta: { someKey: 'some value'} };
```

Partial definitions can be passed as arguments to any [schema constructor](#schemas). **@zuze/schema** supplies (sometimes trivial) [utility methods](utilities.md) to construct partial defintions for you:

```js
import { mixed, label, def } from '@zuze/schema';

mixed(label('my string'),def('joe')); 

// is equivalent to

mixed({ label: 'my string', 'default': 'joe' })

```

## Schemas
**@zuze/schema** makes the following schemas available for you to use:

- [mixed](#mixed)
- [string](#string)
- [number](#number)
- [boolean](#boolean)
- [date](#date)
- [lazy](#lazy)
- [object](#object)
- [array](#array)

Unlike yup, joi, and ajv, **@zuze/schema** was designed to be functional and that means that it doesn't use methods. All validators can be added to all schemas regardless of if they make sense (but we'll warn you if you're doing something silly) via the [`tests`](utilities.md#tests) function.

Because of this, our documentation of each schema focuses primarily on the default transforms that come with each schema because, again, schemas don't have methods.

### mixed

A mixed schema is an abstract schema, it's use is generally not encouraged except maybe for the base of a conditional schema. 

[Partial definitions](#partial-definitions) can be passed to it as arguments just like any other:

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

### lazy

A lazy schema has no AST-equivalent because it doesn't need one. It's for developers who like to write functional code. 

It accepts only a single parameter - a function that is called with the subject value that must return a schema.

<AstFn>

```js
// N/A
```

```js
import { lazy, getErrors, isValidSync } from '@zuze/schema';

const schema = lazy(value => value === 9 ? number(tests(min(9))) : string(tests(min(9))));

getErrors(schema,"9"); // field must be no shorter than 9 characters
isValidSync(schema,9); // true
```

</AstFn>

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
        address1: string(required(), max(60)),
        province: string(required(), oneOf(['BC','NL'])),
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

An array schema's subschema (it can only accept one - no support for **ordered** multi-type arrays...yet) is given to it via [of](utilities.md#of)

<AstFn>

```js
const schema = {
    schema: 'array',
    of: {
        schema: 'object',
        shape: {
            firstName: { schema: 'string' },
            lastName: { schema: 'string' },
        }
    }
}
```

```js
array(
    object({
        firstName: string(),
        lastName: string()
    })
)
```

</AstFn>

