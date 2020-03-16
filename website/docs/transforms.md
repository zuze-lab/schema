---
id: transforms
title: Transforms
sidebar_label: Transforms
---

import { AstFn, ZuzeTabs } from '../src/examples/tabs';

## Transform Functions

[Transform functions](#transformfn) are run during casting/validation in the order they exist in a schema definitions `transform` array.

It is important to note that `transforms` are never run when the initial value is `undefined` or `null`.

<AstFn>

```js
const double = val => val*2;
const schema = createSchema(
    {
        schema: 'number',
        transforms:['double']
    },
    {
        transforms:{
            double:() => double
        }
    }
);

const multiply = by => val => val*by;
const schema = createSchema(
    {
        schema: 'number',
        transforms:[['multiply',2]]
    },
    {
        transforms:{
            multiply:() => multiply
        }
    }
);
```

```js
const double = val => val*2;
number(transforms(double));

const multiply = by => val => val*by;
number(transforms(multiply(2)));
```

</AstFn>

If the option `strict:true` is passed to cast/validation then no transforms will be run.

<AstFn>

```js
const multiply = by => val => val*by;
const schema = createSchema(
    {
        schema:'number',
        transforms:[['multiply',2]]
    },
    {
        transforms:{
            multiply:() => multiply
        }
    }
)
cast(schema, 10); // 20;
cast(schema, 10, { strict:true }); // 10
```

```js
const multiply = by => val => val*by;
cast(number(transforms(multiply(2))), 10); // 20;
cast(number(transforms(multiply(2))), 10, { strict:true }); // 10
```

</AstFn>

Some schemas include default transforms. The default transforms behave like any other transforms with the exception that they are always applied first - this means that if `strict:true` is passed as an option, the default transforms won't be run either.

## string

The default transform for a `string` schema is simply `toString()`

<AstFn>

```js
cast(createSchema({schema:'string'}),9); // "9"
```

```js
cast(string(),9); // "9"
```

</AstFn>

Some other useful transforms are available in **@zuze/schema** for `string` schemas:

### uppercase

Converts a string to uppercase

<AstFn>

```js
const schema = {
    schema:'string',
    transforms:['uppercase']
}
cast(createSchema(schema),"key"); // "KEY"
```

```js
cast(string(transforms(uppercase())),"key"); // "KEY"
```

</AstFn>

### lowercase

Converts a string to lowercase

<AstFn>

```js
const schema = {
    schema:'string',
    transforms:['lowercase']
}
cast(createSchema(schema),"Some Value"); // "some value"
```

```js
cast(string(transforms(lowercase())),"Some Value"); // "some value"
```

</AstFn>

### trim

**`trim({start = true,end = true})`**

Removes whitespace from beginning and end of a string. Can pass an object as an argument that refines this behavior:

<AstFn>

```js
const schema = {
    schema:'string',
    transforms:[['trim',{end:false}]
}
cast(createSchema(schema),"  A string with whitespace  "); 
// "A string with whitespace  "
```

```js
cast(string(transforms(trim({end:false}))),"  A string with whitespace  "); 
// "A string with whitespace  "
```

</AstFn>

### strip

Removes **all** whitespace from a string

<AstFn>

```js
const schema = {
    schema:'string',
    transforms:['strip']
}
cast(createSchema(schema)," A string with whitespace "); // "Astringwithwhitespace"
```

```js
cast(string(transforms(strip()))," A string with whitespace "); // "Astringwithwhitespace"
```

</AstFn>

## number

The default transform for a number schema attempts to coerce the value to a numeric type.

<AstFn>

```js
cast(createSchema({schema:'number'}),"100.7"); // 100.7
cast(createSchema({schema:'number'}),"not a number"); // throws TypeError
```

```js
cast(number(),"100.7"); // 100.7
cast(number(),"not a number"); // throws TypeError
```

</AstFn>

## boolean

<AstFn>

```js
cast(createSchema({schema:'boolean'}),'true'); // true
cast(createSchema({schema:'boolean'}),1); // true
cast(createSchema({schema:'boolean'}),0); // false
```

```js
cast(boolean(),'true'); // true
cast(boolean(),1); // true
cast(boolean(),0); // false
```

</AstFn>

## date

The default transform for date is to use [parseISO](https://date-fns.org/v2.11.0/docs/parseISO) to convert the value being cast/validated to a Date object.

This can be changed by providing a different parser as the first argument to a date schema or by providing the `dateParser` option to `createSchema(s)`/`matches` when creating schemas via the AST api. [SugarDate](https://sugarjs.com/dates) allows you to do some pretty cool things

<AstFn>

```js
import { Date as SugarDate } from 'sugar-date';

const astDateSchema = createSchema(
    {
        schema:'date',
    },
    {
        dateParser:SugarDate.create
    }
);

cast(astDateSchema,'last Wednesday');
```

```js
import { Date as SugarDate } from 'sugar-date';
cast(date(SugarDate.create),'last Wednesday');
```

</AstFn>

## array

The default transform for an `array` is to use `JSON.parse`, if applicable. 

### unique

**`unique(by?: ((a:any,b:any) => boolean) | string)`**

Unique checks by equality, but it also accepts a comparator function OR a string (interpreted as a path used by [property-expr](https://github.com/jquense/expr))

<AstFn>

```js
// simple
const simple = {
    schema: 'array',
    transforms: ['unique']
};

cast(createSchema(simple),['a','b','c','a']);
// ['a','b,'c']

const schema = {
    schema: 'array',
    transforms: [['unique', 'id']]
};

const value = [{id:1}, {id:2}, {id:1}];
cast(createSchema(schema),value);
// [{id:1}, {id:2}]
```

```js
// simple
const simple = array(transforms(unique()));
cast(simple,['a','b','c','a']);
// ['a','b,'c']

const schema = array(transforms(unique('id')));
const value = [{id:1}, {id:2}, {id:1}];
cast(schema,value);
// [{id:1}, {id:2}]
```

</AstFn>

### compact

**`compact(rej?: value => boolean)`**

Compact removes all false-y values from an array. Accepts an optional function parameter to choose whether to reject a value

<AstFn>

```js
// simple
const simple = {
    schema: 'array',
    transforms: ['compact']
};

cast(createSchema(simple),['a',null,1,10,0,false]);
// ['a', 1, 10]

const schema = {
    schema: 'array',
    transforms: [['compact', { tests:[['min',5]] }]]
};

const value = [1,7,9,4,3,10];
cast(createSchema(schema),value);
// [7, 9, 10]
```

```js
// simple
const simple = array(transforms(compact()));
cast(simple,['a',null,1,10,0,false]);
// ['a', 1, 10]

const schema = array(transforms(unique(val => val > 5)));
const value = [1,7,9,4,3,10];
cast(schema,value);
// [7, 9, 10]
```

</AstFn>

## object

Like [array](#array), the default transform for an object schema is to use `JSON.parse`, if applicable.

<AstFn>

```js
const subject = { a:'b', c:'d' };
const stringSubject = '{"a":"b","c":"d"}';
cast(createSchema({schema:'object'}),subject); 
// { a:'b', c:'d' };

cast(createSchema({schema:'object'}),stringSubject); 
// { a:'b', c:'d' };
```

```js
const subject = { a:'b', c:'d' };
const stringSubject = '{"a":"b","c":"d"}';
cast(object(),subject); 
// { a:'b', c:'d' };

cast(object(),stringSubject);
// { a:'b', c:'d' };
```

</AstFn>

`object` schemas also support some further useful transforms you may use:

### entries

**`entries((key:string,value:any) => Object | undefined)`**

`entries` can be used to transform entries of an object, it accepts a function that gets called with a key and value and returns an object or undefined.

```js
const entryTransform = (key,value) => {
    // change this entry
    if(key === 'jim') return ({'joe':value});

    // remove this entry
    if(key === 'fred') return;

    // otherwise leave untransformed
    return ({[key]:value});
}

const value = {
    jim:'nice!',
    fred:'not nice :(',
    jane:'ok'
}

cast(object(transforms(entries(entryTransform)),value);
// { joe: 'nice!', jane: 'ok' }
```

### stripWhere

**`stripWhere((key: string, value: any) => boolean)`**

`stripWhere` is very closely related to [entries](#entries) except it's callback function returns a boolean.

<AstFn>

```js
const schema = {
    schema:'object',
    transforms:[['stripWhere',[
        { key: { tests: [['is', 'jim']] } },
        { value: { tests: [['is', 'first']] } },
    ]]]
}

const value = {
    jim:'nice!',
    fred:'first',
    jane:'ok'
}

cast(createSchema(schema),value);
// { jane: 'ok' }
```

```js
const stripTransform = (key,value) => key === 'jim' || value === 'first';

const value = {
    jim:'nice!',
    fred:'first',
    jane:'ok'
}

cast(object(transforms(stripWhere(stripTransform)),value);
// { jane: 'ok' }

```

</AstFn>

### allowWhere

**`allowWhere((key: string, value: any) => boolean)`**

Inverse of [stripWhere](#stripWhere)

<AstFn>

```js
const allowTransform = (key,value) => key === 'jim' || value === 'first';

const schema = {
    schema: 'object',
    transforms:[['allowWhereWhere',[
        { key: { tests: [['is', 'jim']] } },
        { value: { tests: [['is', 'first']] } },
    ]]]
}

const value = {
    jim:'nice!',
    fred:'first',
    jane:'ok'
}

cast(object(transforms(allowWhere(allowTransform)),value);
// { jim: 'nice!', fred: 'first' }
```

```js
const allowTransform = (key,value) => key === 'jim' || value === 'first';

const value = {
    jim:'nice!',
    fred:'first',
    jane:'ok'
}

cast(object(transforms(allowWhere(allowTransform)),value);
// { jim: 'nice!', fred: 'first' }
```

</AstFn>

### stripKeys

**`stripKeys(...string[])`**

Same as [stripWhere](#stripWhere) except the arguments are the keys to blacklist.

```js
const schema = {
    schema: 'object',
    shape: { 
        a: { schema: 'number' },
        d: { schema: 'number' }
    },
    transforms:[['stripKeys','a','b'];
}

const value = { a:1, b:2, c:3, d:4 }
cast(createSchema(schema),value);
// {  c: 3, d: 4 }
```

```js
const schema = object(
    {
        a:number(),
        b:number()
    },
    transforms(stripKeys('a','b'))
)

const value = { a:1, b:2, c:3, d:4 }
cast(schema,value);
// {  c: 3, d: 4 }
```

### allowKeys

**`allowKeys(...string[])`**

Same as [allowWhere](#allowWhere) except the arguments are the keys to blacklist.

```js
const schema = {
    schema: 'object',
    shape: { 
        a: { schema: 'number' },
        d: { schema: 'number' }
    },
    transforms:[['allowKeys','a','b'];
}

const value = { a:1, b:2, c:3, d:4 }
cast(createSchema(schema),value);
// {  a: 1, b: 2 }
```

```js
const schema = object(
    {
        a:number(),
        b:number()
    },
    transforms(allowKeys('a','b'))
)

const value = { a:1, b:2, c:3, d:4 }
cast(schema,value);
// {  a: 1, b: 2 }
```

### stripUnknown

**`stripUnknown()`**

Removes all keys not part of the inner schema (`shape`):

<AstFn>

```js
const schema = {
    schema: 'object',
    shape: { 
        a: { schema: 'number' },
        d: { schema: 'number' }
    },
    transforms:['stripUnknown'];
}

const value = { a:1, b:2, c:3, d:4 }
cast(createSchema(schema),value);
// { a: 1, d: 4 }
```

```js
const schema = object(
    {
        a:number(),
        b:number()
    },
    transforms(stripUnknown())
)

const value = { a:1, b:2, c:3, d:4 }
cast(schema,value);
// { a: 1, d: 4 }
```

</AstFn>

### from

**`from(frm: string, to: string, alias = false)`**

Converts a key to another key. If `alias` is true, then the original key will be retained.

<AstFn>

```js
const schema = {
    schema: 'object',
    shape: { 
        a: { schema: 'number' },
        d: { schema: 'number' }
    },
    transforms:[['from','a','x',true]];
}

const value = { a:1, b:2, c:3, d:4 }
cast(createSchema(schema),value);
// { a: 1, b: 2, c: 3, d: 4, x: 1 }
```

```js
const schema = object(
    {
        a:number(),
        b:number()
    },
    transforms(from('a','x',true))
)

const value = { a:1, b:2, c:3, d:4 }
cast(schema,value);
// { a: 1, b: 2, c: 3, d: 4, x: 1 }
```

</AstFn>

## Types

### TransformFn

```js
(value: any, originalValue: any ,{schema,options}) => value: any
```