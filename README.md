# @zuze/schema

[![npm version](https://img.shields.io/npm/v/@zuze/schema.svg)](https://npmjs.org/package/@zuze/schema)
[![Coverage Status](https://coveralls.io/repos/github/zuze-lab/schema/badge.svg)](https://coveralls.io/github/zuze-lab/schema)
[![Build Status](https://travis-ci.com/zuze-lab/schema.svg)](https://travis-ci.com/zuze-lab/schema)
[![Bundle Phobia](https://badgen.net/bundlephobia/minzip/@zuze/schema)](https://bundlephobia.com/result?p=@zuze/schema)

## Official Docs

[GitHub Pages Documentation](https://zuze-lab.github.io/schema/)

## What is this?

It's a schema validator (like [yup](https://github.com/jquense/yup) or [joi](https://github.com/hapijs/joi) or [ajv](https://github.com/epoberezkin/ajv)).

## So why should I use this one?

The philosophy behind **@zuze/schema** is to:

1. Be **functional/composable**

2. Be **configurable** (the exact opposite of 1) - via the [AST API](https://en.wikipedia.org/wiki/Abstract_syntax_tree) - to create schema definitions that can be stored once and run ANYWEHRE.

3. Be **fun** - check out how cool our [conditions](https://zuze-lab.github.io/schema/docs/ast#conditions) are!

@zuze/schema doesn't claim to be better (it's not) or faster (it's not) than any of the other schema validation projects, but it does aim to have a more fun API (whether you like to write functional code or appreciate some fine YML-like configuration via the AST API)!

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

## Further

It's all here https://zuze-lab.github.io/schema/!