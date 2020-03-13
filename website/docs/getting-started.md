---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

import { AstFn, ZuzeTabs } from '../src/examples/tabs';

## Forward

*@zuze/schema* was created out of love and admiration for projects like [joi](https://github.com/hapijs/joi), [yup](https://github.com/jquense/yup), and [ajv](https://github.com/epoberezkin/ajv) which are all schema validators. Each package brings it's own strengths. The strength (I hope) that `@zuze/schema` brings is that it's fun to use, whether you're somebody who likes to write functional code or somebody who likes to write highly reusable configuration (who doesn't love a some good [YAML](https://www.reddit.com/r/ProgrammerHumor/comments/9fhvyl/writing_yaml/)....but we use JSON.)

*@zuze/schema* is one package that comes in two flavors - [functional](https://en.wikipedia.org/wiki/Functional_programming) or [ast](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

Throughout these docs code examples will be presented in tabs in functional and AST form. Pick the one that's right for you and your project!

More on that after the set up:

## Installation 

Install @zuze/schema using yarn or npm

<ZuzeTabs tabs={['npm','yarn']}>

```bash
npm install @zuze/schema
```

```bash
yarn install @zuze/schema
```

</ZuzeTabs>

## Creating a Schema

Let's start by creating some very simple schemas:

<AstFn link={'https://codesandbox.io/s/zuze-schema-getting-started-d8q04'}>

```js
import { ast } from '@zuze/schema'

const { matches } = ast;

matches({ schema: 'string', tests: [['min', 10]] }, 'short'); // false
matches({ schema: 'string', tests: [['min', 10]] }, 'this should work'); // true            
```

```js
import { string, min, tests, isValidSync } from '@zuze/schema'

const schema = string(tests(min(10)));

isValidSync(schema, 'short'); // false
isValidSync(schema, 'this should work'); // true            
```

</AstFn>
