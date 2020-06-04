---
id: validators
title: Validators
sidebar_label: Validators
---

import { AstFn, ZuzeTabs } from '../src/examples/tabs';

## Options

All validators accept as their final argument the same set of options (optional):

```js
{
    name?: string; // the "type" of error in a ValidationError
    params? object; // any parameters that can be interpolated into the message
    message?: string | (params) => string; // the error message in the ValidationError
}
```

### name

By default, `name` is the `name` of the validator you are calling - i.e. the name for the [oneOf](#oneOf) validator is `oneOf`.

### params

`params` differ from validator to validator and are provided to the string/message function for convenience. `label` is the only common parameter always available for interpolation. For more information about error messages see [error messages](validating.md#messages).

### message

`message` is a string or a function used to define the error message for this specific validator. If a string the appropriate parameters will be interpolated using `${interpolationparam}`.

<AstFn>

```js
const schema = {
    schema:'string',
    label:'first name',
    tests: [['includes','fred',{ message:'The value of ${label} should include ${value}' }]
}

getErrorsSync(createSchema(schema),'jim'); // The value of first name should include fred
```

```js
const schema = string(label('first name'),tests(includes('fred',{ message:'The value of ${label} should include ${value}' })));

getErrorsSync(schema,'jim'); // The value of first name should include fred
```

</AstFn>

## Validators

Validators aren't always applicable to all schemas ([min](#min) is not relevant for a [boolean schema](schemas.md#boolean), for instance) This is accomplished via a pre-validation hook which verifies that the current [ValidatorDefinition](#validatordefinition) is applicable to the current schema.

**Note:** `undefined` is considered a valid value for all validators except [required](#required).

### required

**`required(options: ValidatorOptions)`**

Applicable to schemas: **ALL**

Most of the time `undefined` is not validated. This is accomplished via the pre-validation `check` function that determines if a validator is applicable given a schema type/value.

`required` does validate the value of `undefined` and it returns false if the value being validated is `undefined` or `null`.

In the case of an array, it also requires at least 1 element and in the case of a string it requires the string be non-empty (not `""`).

<AstFn>

```js

matches({schema:'string', tests: ['required']}, null); // false
matches({schema:'string', tests: ['required']}, undefined); // false
matches({schema:'string', tests: ['required']}, ''); // false
matches({schema:'string', tests: ['required']}, 'a string!'); // true

matches({schema:'array', tests: ['required']}, []); // false
matches({schema:'array', tests: ['required']}, ['not empty']); // true

```

```js

isValidSync(string(tests(required()))); // false
isValidSync(string(tests(required()))); // false
isValidSync(string(tests(required()))); // false
isValidSync(string(tests(required()))); // false

```

</AstFn>

### is

**`is(value: any | Ref, options: ValidatorOptions)`**

Applicable to schemas: **ALL**

Value being validated must equal (`===`) the value/ref.

**Note:** This validator is equivalent to [oneOf([value: any | Ref])](#oneOf), except the ValidationError `type` is `is`.

<AstFn>

```js
const schema = {
    schema: 'object',
    shape: {
        fieldB: {
            tests: [['is', { ref: 'fieldA' }]]
        }
    }
};

matches(schema, { fieldA: 'jim', fieldB: 'jim'}); // true
matches(schema, { fieldA: 'fred', fieldB: 'jim'}); // false
matches(schema, { fieldB: 'jim'}); // false
```

```js
const schema = object({
    fieldB: schema(tests(is(ref('fieldA'))))
});

isValidSync(schema, { fieldA: 'jim', fieldB: 'jim'}); // true
isValidSync(schema, { fieldA: 'fred', fieldB: 'jim'}); // false
isValidSync(schema, { fieldB: 'jim'}); // false
```

</AstFn>

### not

**`not(value: any | Ref, options: ValidatorOptions)`**

Applicable to schemas: **ALL**

[negate](#negate)-d form of [is](#is)

<AstFn>

```js
const schema = {
    schema:'object',
    shape: {
        fieldB: {
            tests: [['not', { ref:'fieldA' }]]
        }
    }
};

matches(schema, { fieldA: 'jim', fieldB: 'jim' }); // false
matches(schema, { fieldA: 'fred', fieldB: 'jim' }); // true
matches(schema, { fieldB: 'jim' }); // true
```

```js
const schema = object({
    fieldB: schema(tests(not(ref('fieldA'))))
});

isValidSync(schema, { fieldA: 'jim', fieldB: 'jim' }); // false
isValidSync(schema, { fieldA: 'fred', fieldB: 'jim' }); // true
isValidSync(schema, { fieldB: 'jim' }); // true
```

</AstFn>


### oneOf

**`oneOf(value: Ref | Array<any | Ref>, options: ValidatorOptions)`**

Applicable to schemas: **ALL**

Value being validated must be one of the values given to `oneOf` OR if `value` is a [ref](typeref.md#astRef) then the value being validated must be one of the values in the reference.

**Note:** Just a reminder that `undefined` is considered a valid value. If you need to test for `undefined` use [required](#required).

<AstFn>

```js
const schema = {
    schema:'object',
    shape: {
        fieldB: {
            tests: [['oneOf', ['a', 9, { ref: 'fieldA' }]]]
        },
        fieldC: {
            tests: [['oneOf', { ref: 'fieldD' }]]
        }
    }
};

matches(schema, { fieldA: 'jim', fieldB: 'jim'}); // true
matches(schema, { fieldA: 'fred', fieldB: 'a'}); // true
matches(schema, { fieldB: 'jim'}); // false
matches(schema, { fieldC: 'jim', fieldD: ['joe','fred' ]}); // false
matches(schema, { fieldC: 'joe', fieldD: ['joe','fred' ]}); // true
```

```js
const schema = object({
    fieldB:schema(tests(oneOf(['a', 9, { ref: 'fieldA' })))
});

isValidSync(schema, { fieldA: 'jim', fieldB: 'jim'}); // true
isValidSync(schema, { fieldA: 'fred', fieldB: 'a'}); // true
isValidSync(schema, { fieldB: 'jim'}); // false
```

</AstFn>



### notOneOf

**`notOneOf(value: Array<any | Ref>, options: ValidatorOptions)`**

Applicable to schemas: **ALL**

[negate](#negate)-d form of [oneOf](#oneOf)

<AstFn>

```js
const schema = {
    schema:'object',
    shape: {
        fieldB: {
            tests: [['notOneOf', ['a', 9, ref:{ 'fieldA' }]]]
        }
    }
};

matches(schema, { fieldA: 'jim', fieldB: 'jim'}); // false
matches(schema, { fieldA: 'fred', fieldB: 'a'}); // false
matches(schema, { fieldB: 'jim'}); // true
```

```js
const schema = object({
    fieldB:schema(tests(notOneOf(['a', 9, { ref: 'fieldA' })))
});

isValidSync(schema, { fieldA: 'jim', fieldB: 'jim'}); // false
isValidSync(schema, { fieldA: 'fred', fieldB: 'a'}); // false
isValidSync(schema, { fieldB: 'jim'}); // true
```

</AstFn>

### same

**`same(value: string, options: ValidatorOptions)`**

Applicable to schemas: **ALL**

Validation-sugar for `is(ref(value))`.

<AstFn>

```js
const schema = {
    schema: 'string',
    tests: [['same', '$ctxValue']]
}

const context = { ctxValue: 'someVal' };

matches(schema, 'someVal', { context }); // true
matches(schema, 'not some val', { context }); // false
matches(schema, 'someVal'); // false
```

```js
const schema = string(tests(same('$ctxValue')))

isValidSync(schema, 'someVal', { context }); // true
isValidSync(schema, 'not some val', { context }); // false
isValidSync(schema, 'someVal'); // false
```

</AstFn>

### different

**`different(value: string, options: ValidatorOptions)`**

Applicable to schemas: **ALL**

[negate](#negate)-d form of [same](#same)

<AstFn>

```js
const schema = {
    schema: 'string',
    tests: [['different', '$ctxValue']]
}

const context = { ctxValue: 'someVal' };

matches(schema, 'someVal', { context }); // false
matches(schema, 'not some val', { context }); // true
matches(schema, 'someVal'); // true
```

```js
const schema = string(tests(different('$ctxValue')))

isValidSync(schema, 'someVal', { context }); // false
isValidSync(schema, 'not some val', { context }); // true
isValidSync(schema, 'someVal'); // true
```

</AstFn>

### matches
**`matches(value: string | RegExp | Array<string | RegExp>, options = { validateEmpty: boolean, ...ValidatorOptions })`**

Applicable to schemas: **STRING**

Validates that the value being validated matches the provided string/regexp.
In the case of an array, the value being validated must match one of the provided string/regexp.

Empty strings always return true unless `validateEmpty: true` is passed as an option.

<AstFn>

```js
matches({schema:'string', tests: [['matches', 'rick']]}, ''); // true
matches({schema:'string', tests: [['matches', 'rick', { validateEmpty: true }]}, ''); // false
matches({schema:'string', tests: [['matches', 'rick']]}, 'frederick'); // true
matches({schema:'string', tests: [['matches', ['rick', 'joe']]] }, 'fredeoe'); // false
matches({schema:'string', tests: [['matches', ['rick', 'joe']]] }, 'fred and joe'); // true
```

```js
isValidSync(string(tests(matches('rick'))), ''); // true
isValidSync(string(tests(matches('rick', { validateEmpty: true}))), ''); // false
isValidSync(string(tests(matches('rick'))), 'frederick'); // true
isValidSync(string(tests(matches(['rick', 'joe']))), 'frederoe'); // false
isValidSync(string(tests(matches(['rick', 'joe']))), 'fred and joe'); // true
```

</AstFn>

### email
**`email(options = { validateEmpty: boolean, ...ValidatorOptions })`**

Applicable to schemas: **STRINGS**

Validates that the value is a valid e-mail address

<AstFn>

```js
matches({schema:'string', tests: ['email']}, ''); // true
matches({schema:'string', tests: ['email', { validateEmpty:true }]}, ''); // false
matches({schema:'string', tests: ['email']}, 'me@you.com'); // true
```

```js
isValidSync(string(tests(email())), ''); // true
isValidSync(string(tests(email({ validateEmpty: true }))),''); // false
isValidSync(string(tests(email())), 'me@you.com'); // true
```

</AstFn>

### min
**`min(value: number | Ref, options = { inclusive: boolean, ...ValidatorOptions})`**

Applicable to schemas: **DATE, STRING, NUMBER, ARRAY**

Validates a date, string, number, or array is no less than the given number or ref. 
`inclusive` is true by default, if passed as false, then the value must be more than min

<AstFn>

```js
matches({schema: 'string', tests: [['min', 10]]}, 'short'); // false
matches({schema: 'string', tests: [['min', 5]]}, 'short'); // true
matches({schema: 'string', tests: [['min', 5, { inclusive: false }]]}, 'short'); // false
```

```js
isValidSync(string(tests(min(10))), 'short'); // false
isValidSync(string(tests(min(5))), 'short'); // true
isValidSync(string(tests(min(5, { inclusive: false }))), 'short'); // false
```

</AstFn>

### max
**`max(value: number | Ref, options = { inclusive: boolean = true, ...ValidatorOptions})`**

Applicable to schemas: **DATE, STRING, NUMBER, ARRAY**

Validates a date, string, number, or array is no more than the given number or ref. 
`inclusive` is true by default, if passed as false, then the value must be less than max.

<AstFn>

```js
matches({schema: 'string', tests: [['max', 5]]}, 'not short'); // false
matches({schema: 'string', tests: [['max', 5]]}, 'short'); // true
matches({schema: 'string', tests: [['max', 5, { inclusive: false }]]}, 'short'); // false
```

```js
isValidSync(string(tests(max(5))), 'not short'); // false
isValidSync(string(tests(max(5))), 'short'); // true
isValidSync(string(tests(max(5, { inclusive: false }))), 'short'); // false
```

</AstFn>

### includes
**`includes(value: any | Ref, options: ValidatorOptions)`**

Applicable to schemas: **STRING, ARRAY**

Validates a string or array value includes the value (or ref):

<AstFn>

```js
const schema = {
    schema: 'string',
    tests: [['includes', 'rick']]
};

matches(schema, 'frederick'); // true
matches(schema, 'frederoe'); // false

const arr = {
    schema: 'array',
    tests: [['includes', 'rick']]
};

matches(arr, ['joe', 'jim', 'frederick']); // false
matches(arr, ['joe', 'jim', 'rick']); // false
```

```js
isValidSync(string(includes('rick')), 'frederick'); // true
isValidSync(string(includes('rick')), 'frederoe'); // false

isValidSync(array(includes('rick')), ['joe', 'jim', 'frederick']); // false
isValidSync(array(includes('rick')), ['joe', 'jim', 'rick']); // true
```

</AstFn>

### oneOfType
**`oneOfType(schemas: Schema[], options: ValidatorOptions)`**

Applicable to schemas: **MIXED**

This is a special validator (similar to joi's [alternatives](https://github.com/hapijs/joi/blob/master/API.md#alternatives)) that validates a value to be one of a schema type.

<AstFn>

```js
const schema = {
    schema: 'mixed',
    tests: ['oneOfType',[
        {
            schema: 'number',
            tests: ['required',['min',5]]
        },
        {
            schema: 'string',
            tests: ['required','email']
        }        
    ]]
};
```

```js

const num = number(tests(required(), min(5)));
const str = string(tests(required(), email()));
mixed(tests(oneOfType([num,str])));
```

</AstFn>

## Combination

There are certain utility validators that can be used to combine/alter validators in certain ways.

### negate

Inverts the logic for any validator. This validator is used internally for validator pairs like [same](#same)/[different](#different), [is](#is)/[not](#not) and [oneOf](#oneOf)/[notOneOf](#notOneOf).

<AstFn>

```js
const schema = {
    schema:'string',
    // field must NOT be oneOf a, b, or c
    tests: [['negate',['oneOf',['a','b','c']]]
}

matches(schema,'f'); // true
matches(schema,'a'); // false
```

```js
const schema = string(tests(negate(oneOf(['a','b','c']))));
isValidSync(schema,'f'); // true
isValidSync(schema,'a'); // false
```

</AstFn>


### combine

Combines multiple validators into a new validator. Used internally to create the [between](#between) validator.

<AstFn>

```js
const schema = {
    schema:'string',
    tests: [['combine',[['min',5],['max',15]]]
}

matches(schema,'at least 5'); // true
matches(schema,'no'); // false
matches(schema,'this is way longer than 15'); // false
```

```js
const schema = string(tests(combine(min(5),max(15))));
isValidSync(schema,'at least 5'); // true
isValidSync(schema,'no'); // false
isValidSync(schema,'this is way longer than 15'); // false
```

</AstFn>

### serial

Essentially a "real" `abortEarly:true` for async validators.

<AstFn>

```js
const firstAsync = async val => {
    // do something async
    // const result = await someAsyncFunc(val)
    return val === 'bad';
}

const secondAsync = async val => {
    // do something async
    // const result = await someAsyncFunc(val)
    return val === 'good';
}


const schema = createSchema(
    {
        schema:'string',
        tests: [
            [
                'serial',
                [
                    ['firstAsync',{message:'Failed Async 1'}],
                    ['secondAsync',{message:'Failed Async 2'}]
                ]
            ]
        ]
    },
    // supply custom validators when compiling AST
    {
        validators: { firstAsync,secondAsync }
    }
);

validate(createSchema(schema),'good'); // Promise<ValidationError> - Failed Async 1
validate(createSchema(schema),'bad'); // Promise<ValidationError> - Failed Async 2
```

```js
const firstAsync = async val => {
    // do something async
    // const result = await someAsyncFunc(val)
    return val === 'bad';
}

const secondAsync = async val => {
    // do something async
    // const result = await someAsyncFunc(val)
    return val === 'good';
}

const schema = string(tests(
    test('firstAsync', firstAsync, { message:'Failed Async 1' }),
    test('secondAsync', secondAsync, { message:'Failed Async 2' }),
));

validate(schema,'good', { abortEarly: false }); // Promise<ValidationError> - Failed Async 1
validate(schema,'bad', { abortEarly: false }); // Promise<ValidationError> - Failed Async 2
```

</AstFn>

