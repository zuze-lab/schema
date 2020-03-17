---
id: validating
title: Validating
sidebar_label: Validating
---

## Sync vs Async

Almost all validation methods in **@zuze/schema** come in two flavors, async (default) and sync. Take a look at the api [schemas api](schemas.md#isvalid) for more information.

## Error Messages

Error messages can be configured in several ways.



### Global Error Messages

Error messages are passed as the `message` [ValidationOption](typeref.md#validationoptions).

Default error messages are defined [below](#defaults).

Global error messages are simply defined as a map where the keys can be

- `${schemaType}.${validatorName}`
- `${validatorName}`
- `default`

You can override global error messages like this:

```js
const messages = {
    `required`: 'This field is required',
    `string.required`: 'This string is required',
}

validateSync(string(required()), { messages }); // ValidationError: This string is required
validateSync(number(required()), { messages }); // ValidationError: This field is required
```

### Option to Validator

Almost all validators accept message as a parameter in the [last argument](validators.md#message).

This can be used to configure specific error messages for a given validator:

```js
getErrorsSync(object({
    firstName: string(tests(min(5, { message: 'You have a really short first name' }))),
    lastName: string(label('Last Name'), tests(min(5)));
}),{});

/*
 {
     firstName: 'You have a really short first name,
     lastName: 'Last Name must not be shorter than 5 characters
 }
*/

```

#### As functions

Both global and validator specific error messages can be specified as functions or strings that can be interpolated. 

By default `label` and `path` are provided as interpolation parameters. All over validators provide their own interpolation parameters specific to the validator (you can always override/extend these params using the [params](validators.md#params) option to a validator).

#### As strings

When supplying error messages as strings values inside `${}` are interpolated. 

**Note:** Do **NOT** put your message in backticks ``` if it is a string, this will treat it as a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) which results in immediate interpolation rather than at validation time.

## <a name="defaults"></a>Default validation messages

```js
{
  default: '${label} is invalid',
  required: '${label} is required',
  between: '${label} must be between ${low} and ${high}',
  defined: '${label} must be defined',
  different: '${label} cannot be the same as ${value}',
  same: '${label} must be the same as ${value}',
  not: '${label} must not be ${value}',
  is: '${label} must be ${value}',
  includes: '${label} must include ${value}',
  matches: '${label} must match ${regexp}',
  typeError:
    '${label} must be a ${schema} type, unable to coerce/use value ${value}',
  oneOf: ({ label, values }) =>
    `${label} must be ${
      values.length === 1 ? values[0] : `one of ${values.join(', ')}`
    }`,
  notOneOf: ({ label, values }) =>
    `${label} must not be ${
      values.length === 1 ? values[0] : `one of ${values.join(', ')}`
    }`,
   email: '${label} must be a valid e-mail address',    
  'string.max': '${label} must not be longer than ${max} characters',
  'string.min': '${label} must not be shorter than ${min} characters',  
  'string.between': '${label} must be between ${low} and ${high} characters',
  'date.max': ({ label, max }) =>
    `${label} must not be after ${max.getTime ? max.toISOString() : max}`,
  'number.max': '${label} must be no more than ${max}',
  'array.max': '${label} must have no more than ${max} items',
  'array.between': '${label} must have between ${low} and ${high} items',
  'date.min': ({ label, min }) =>
    `${label} must be after ${min.getTime ? min.toISOString() : min}`,
  'array.min': '${label} must have at least ${min} items',
  'number.min': '${label} must be no less than ${min}'
}
```