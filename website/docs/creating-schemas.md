---
id: creating-schemas
title: Creating Schemas
sidebar_label: Creating Schemas
---

import { AstFn, ZuzeTabs } from '../src/examples/tabs';

## About Schemas

A SchemaDefinition looks, quite literally, like this:

```js
{
    default?: value | Function; // default value for this schema if the value is undefined
    meta?: value | Function;
    label?: string | Function;
    shape?: {[key: string]: SchemaDefinition }; // for object schemas
    of?: SchemaDefinition; // for array schemas
    typeCheck?: Function; // determines if the final cast value (after transformations) is the appropriate type    
    typeError: string | Function; // error message/message function on validation if value doesn't pass the typeCheck
    test: ValidatorDef[]; // validations to be run
    transform: TransformFn[]; // transforms applied (usually to coerce values)
    condition: ConditionDef[]; // conditions that can be used to modify a schema
    nullable: boolean; // whether or not null is an acceptable value for this schema
}
```

SchemaDefinitions can be created using AST or functionally with the help of [utility methods](utilities.md)

<AstFn>

```js
import { ast } from '@zuze/schema'

const { createSchema } = ast;

const firstName = {
    schema: 'string',
    default: 'joe', // default value for this field is joe
    nullable: false,
    label: 'firstName',
    tests: ['required'],
    conditions:[
        {
            when: { lastName: { tests: [['is', 'smith']] } }, // if the lastName field is smith...
            then: { tests: [['min', 10]] }, // then this field should be at least 10 characters
            otherwise: { tests: [['min', 20]] } // otherwise it only needs to be 5 characters
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

mixed(label('my string'), def('joe')); 

// is equivalent to

mixed({ label: 'my string', default: 'joe' })

```

For further information see the [schemas api](schemas.md)

