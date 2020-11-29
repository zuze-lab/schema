(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{75:function(e,a,n){"use strict";n.r(a),n.d(a,"frontMatter",(function(){return l})),n.d(a,"metadata",(function(){return b})),n.d(a,"rightToc",(function(){return o})),n.d(a,"default",(function(){return m}));var t=n(3),r=n(7),c=(n(0),n(91)),s=n(95),l={id:"transforms",title:"Transforms",sidebar_label:"Transforms"},b={unversionedId:"transforms",id:"transforms",isDocsHomePage:!1,title:"Transforms",description:"Transform Functions",source:"@site/docs/transforms.md",slug:"/transforms",permalink:"/schema/docs/transforms",editUrl:"https://github.com/zuze-lab/schema/edit/master/website/docs/transforms.md",version:"current",sidebar_label:"Transforms",sidebar:"someSidebar",previous:{title:"Schemas",permalink:"/schema/docs/schemas"},next:{title:"Validators",permalink:"/schema/docs/validators"}},o=[{value:"Transform Functions",id:"transform-functions",children:[]},{value:"string",id:"string",children:[{value:"uppercase",id:"uppercase",children:[]},{value:"lowercase",id:"lowercase",children:[]},{value:"trim",id:"trim",children:[]},{value:"strip",id:"strip",children:[]}]},{value:"number",id:"number",children:[]},{value:"boolean",id:"boolean",children:[]},{value:"date",id:"date",children:[]},{value:"array",id:"array",children:[{value:"unique",id:"unique",children:[]},{value:"compact",id:"compact",children:[]}]},{value:"object",id:"object",children:[{value:"entries",id:"entries",children:[]},{value:"stripWhere",id:"stripwhere",children:[]},{value:"allowWhere",id:"allowwhere",children:[]},{value:"stripKeys",id:"stripkeys",children:[]},{value:"allowKeys",id:"allowkeys",children:[]},{value:"stripUnknown",id:"stripunknown",children:[]},{value:"from",id:"from",children:[]}]}],i={rightToc:o};function m(e){var a=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(t.a)({},i,n,{components:a,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"transform-functions"},"Transform Functions"),Object(c.b)("p",null,Object(c.b)("a",Object(t.a)({parentName:"p"},{href:"#transformfn"}),"Transform functions")," are run during casting/validation in the order they exist in a schema definitions ",Object(c.b)("inlineCode",{parentName:"p"},"transform")," array."),Object(c.b)("p",null,"It is important to note that ",Object(c.b)("inlineCode",{parentName:"p"},"transforms")," are never run when the initial value is ",Object(c.b)("inlineCode",{parentName:"p"},"undefined")," or ",Object(c.b)("inlineCode",{parentName:"p"},"null"),"."),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const double = val => val*2;\nconst schema = createSchema(\n    {\n        schema: 'number',\n        transforms:['double']\n    },\n    {\n        transforms:{\n            double:() => double\n        }\n    }\n);\n\nconst multiply = by => val => val*by;\nconst schema = createSchema(\n    {\n        schema: 'number',\n        transforms:[['multiply',2]]\n    },\n    {\n        transforms:{\n            multiply:() => multiply\n        }\n    }\n);\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const double = val => val*2;\nnumber(transforms(double));\n\nconst multiply = by => val => val*by;\nnumber(transforms(multiply(2)));\n"))),Object(c.b)("p",null,"If the option ",Object(c.b)("inlineCode",{parentName:"p"},"strict:true")," is passed to cast/validation then no transforms will be run."),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const multiply = by => val => val*by;\nconst schema = createSchema(\n    {\n        schema:'number',\n        transforms:[['multiply',2]]\n    },\n    {\n        transforms:{\n            multiply:() => multiply\n        }\n    }\n)\ncast(schema, 10); // 20;\ncast(schema, 10, { strict:true }); // 10\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const multiply = by => val => val*by;\ncast(number(transforms(multiply(2))), 10); // 20;\ncast(number(transforms(multiply(2))), 10, { strict:true }); // 10\n"))),Object(c.b)("p",null,"Some schemas include default transforms. The default transforms behave like any other transforms with the exception that they are always applied first - this means that if ",Object(c.b)("inlineCode",{parentName:"p"},"strict:true")," is passed as an option, the default transforms won't be run either."),Object(c.b)("h2",{id:"string"},"string"),Object(c.b)("p",null,"The default transform for a ",Object(c.b)("inlineCode",{parentName:"p"},"string")," schema is simply ",Object(c.b)("inlineCode",{parentName:"p"},"toString()")),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"cast(createSchema({schema:'string'}),9); // \"9\"\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),'cast(string(),9); // "9"\n'))),Object(c.b)("p",null,"Some other useful transforms are available in ",Object(c.b)("strong",{parentName:"p"},"@zuze/schema")," for ",Object(c.b)("inlineCode",{parentName:"p"},"string")," schemas:"),Object(c.b)("h3",{id:"uppercase"},"uppercase"),Object(c.b)("p",null,"Converts a string to uppercase"),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema:'string',\n    transforms:['uppercase']\n}\ncast(createSchema(schema),\"key\"); // \"KEY\"\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),'cast(string(transforms(uppercase())),"key"); // "KEY"\n'))),Object(c.b)("h3",{id:"lowercase"},"lowercase"),Object(c.b)("p",null,"Converts a string to lowercase"),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema:'string',\n    transforms:['lowercase']\n}\ncast(createSchema(schema),\"Some Value\"); // \"some value\"\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),'cast(string(transforms(lowercase())),"Some Value"); // "some value"\n'))),Object(c.b)("h3",{id:"trim"},"trim"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"trim({start = true,end = true})"))),Object(c.b)("p",null,"Removes whitespace from beginning and end of a string. Can pass an object as an argument that refines this behavior:"),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema:'string',\n    transforms:[['trim',{end:false}]\n}\ncast(createSchema(schema),\"  A string with whitespace  \"); \n// \"A string with whitespace  \"\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),'cast(string(transforms(trim({end:false}))),"  A string with whitespace  "); \n// "A string with whitespace  "\n'))),Object(c.b)("h3",{id:"strip"},"strip"),Object(c.b)("p",null,"Removes ",Object(c.b)("strong",{parentName:"p"},"all")," whitespace from a string"),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema:'string',\n    transforms:['strip']\n}\ncast(createSchema(schema),\" A string with whitespace \"); // \"Astringwithwhitespace\"\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),'cast(string(transforms(strip()))," A string with whitespace "); // "Astringwithwhitespace"\n'))),Object(c.b)("h2",{id:"number"},"number"),Object(c.b)("p",null,"The default transform for a number schema attempts to coerce the value to a numeric type."),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"cast(createSchema({schema:'number'}),\"100.7\"); // 100.7\ncast(createSchema({schema:'number'}),\"not a number\"); // throws TypeError\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),'cast(number(),"100.7"); // 100.7\ncast(number(),"not a number"); // throws TypeError\n'))),Object(c.b)("h2",{id:"boolean"},"boolean"),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"cast(createSchema({schema:'boolean'}),'true'); // true\ncast(createSchema({schema:'boolean'}),1); // true\ncast(createSchema({schema:'boolean'}),0); // false\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"cast(boolean(),'true'); // true\ncast(boolean(),1); // true\ncast(boolean(),0); // false\n"))),Object(c.b)("h2",{id:"date"},"date"),Object(c.b)("p",null,"The default transform for date is to use ",Object(c.b)("a",Object(t.a)({parentName:"p"},{href:"https://date-fns.org/v2.11.0/docs/parseISO"}),"parseISO")," to convert the value being cast/validated to a Date object."),Object(c.b)("p",null,"This can be changed by providing a different parser as the first argument to a date schema or by providing the ",Object(c.b)("inlineCode",{parentName:"p"},"dateParser")," option to ",Object(c.b)("inlineCode",{parentName:"p"},"createSchema(s)"),"/",Object(c.b)("inlineCode",{parentName:"p"},"matches")," when creating schemas via the AST api. ",Object(c.b)("a",Object(t.a)({parentName:"p"},{href:"https://sugarjs.com/dates"}),"SugarDate")," allows you to do some pretty cool things"),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import { Date as SugarDate } from 'sugar-date';\n\nconst astDateSchema = createSchema(\n    {\n        schema:'date',\n    },\n    {\n        dateParser:SugarDate.create\n    }\n);\n\ncast(astDateSchema,'last Wednesday');\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import { Date as SugarDate } from 'sugar-date';\ncast(date(SugarDate.create),'last Wednesday');\n"))),Object(c.b)("h2",{id:"array"},"array"),Object(c.b)("p",null,"The default transform for an ",Object(c.b)("inlineCode",{parentName:"p"},"array")," is to use ",Object(c.b)("inlineCode",{parentName:"p"},"JSON.parse"),", if applicable. "),Object(c.b)("h3",{id:"unique"},"unique"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"unique(by?: ((a:any,b:any) => boolean) | string)"))),Object(c.b)("p",null,"Unique checks by equality, but it also accepts a comparator function OR a string (interpreted as a path used by ",Object(c.b)("a",Object(t.a)({parentName:"p"},{href:"https://github.com/jquense/expr"}),"property-expr"),")"),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"// simple\nconst simple = {\n    schema: 'array',\n    transforms: ['unique']\n};\n\ncast(createSchema(simple),['a','b','c','a']);\n// ['a','b,'c']\n\nconst schema = {\n    schema: 'array',\n    transforms: [['unique', 'id']]\n};\n\nconst value = [{id:1}, {id:2}, {id:1}];\ncast(createSchema(schema),value);\n// [{id:1}, {id:2}]\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"// simple\nconst simple = array(transforms(unique()));\ncast(simple,['a','b','c','a']);\n// ['a','b,'c']\n\nconst schema = array(transforms(unique('id')));\nconst value = [{id:1}, {id:2}, {id:1}];\ncast(schema,value);\n// [{id:1}, {id:2}]\n"))),Object(c.b)("h3",{id:"compact"},"compact"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"compact(rej?: value => boolean)"))),Object(c.b)("p",null,"Compact removes all false-y values from an array. Accepts an optional function parameter to choose whether to reject a value"),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"// simple\nconst simple = {\n    schema: 'array',\n    transforms: ['compact']\n};\n\ncast(createSchema(simple),['a',null,1,10,0,false]);\n// ['a', 1, 10]\n\nconst schema = {\n    schema: 'array',\n    transforms: [['compact', { tests:[['min',5]] }]]\n};\n\nconst value = [1,7,9,4,3,10];\ncast(createSchema(schema),value);\n// [7, 9, 10]\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"// simple\nconst simple = array(transforms(compact()));\ncast(simple,['a',null,1,10,0,false]);\n// ['a', 1, 10]\n\nconst schema = array(transforms(unique(val => val > 5)));\nconst value = [1,7,9,4,3,10];\ncast(schema,value);\n// [7, 9, 10]\n"))),Object(c.b)("h2",{id:"object"},"object"),Object(c.b)("p",null,"Like ",Object(c.b)("a",Object(t.a)({parentName:"p"},{href:"#array"}),"array"),", the default transform for an object schema is to use ",Object(c.b)("inlineCode",{parentName:"p"},"JSON.parse"),", if applicable."),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const subject = { a:'b', c:'d' };\nconst stringSubject = '{\"a\":\"b\",\"c\":\"d\"}';\ncast(createSchema({schema:'object'}),subject); \n// { a:'b', c:'d' };\n\ncast(createSchema({schema:'object'}),stringSubject); \n// { a:'b', c:'d' };\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const subject = { a:'b', c:'d' };\nconst stringSubject = '{\"a\":\"b\",\"c\":\"d\"}';\ncast(object(),subject); \n// { a:'b', c:'d' };\n\ncast(object(),stringSubject);\n// { a:'b', c:'d' };\n"))),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"object")," schemas also support some further useful transforms you may use:"),Object(c.b)("h3",{id:"entries"},"entries"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"entries((key:string,value:any) => Object | undefined)"))),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"entries")," can be used to transform entries of an object, it accepts a function that gets called with a key and value and returns an object or undefined."),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const entryTransform = (key,value) => {\n    // change this entry\n    if(key === 'jim') return ({'joe':value});\n\n    // remove this entry\n    if(key === 'fred') return;\n\n    // otherwise leave untransformed\n    return ({[key]:value});\n}\n\nconst value = {\n    jim:'nice!',\n    fred:'not nice :(',\n    jane:'ok'\n}\n\ncast(object(transforms(entries(entryTransform)),value);\n// { joe: 'nice!', jane: 'ok' }\n")),Object(c.b)("h3",{id:"stripwhere"},"stripWhere"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"stripWhere((key: string, value: any) => boolean)"))),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"stripWhere")," is very closely related to ",Object(c.b)("a",Object(t.a)({parentName:"p"},{href:"#entries"}),"entries")," except it's callback function returns a boolean."),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema:'object',\n    transforms:[['stripWhere',[\n        { key: { tests: [['is', 'jim']] } },\n        { value: { tests: [['is', 'first']] } },\n    ]]]\n}\n\nconst value = {\n    jim:'nice!',\n    fred:'first',\n    jane:'ok'\n}\n\ncast(createSchema(schema),value);\n// { jane: 'ok' }\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const stripTransform = (key,value) => key === 'jim' || value === 'first';\n\nconst value = {\n    jim:'nice!',\n    fred:'first',\n    jane:'ok'\n}\n\ncast(object(transforms(stripWhere(stripTransform)),value);\n// { jane: 'ok' }\n\n"))),Object(c.b)("h3",{id:"allowwhere"},"allowWhere"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"allowWhere((key: string, value: any) => boolean)"))),Object(c.b)("p",null,"Inverse of ",Object(c.b)("a",Object(t.a)({parentName:"p"},{href:"#stripWhere"}),"stripWhere")),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const allowTransform = (key,value) => key === 'jim' || value === 'first';\n\nconst schema = {\n    schema: 'object',\n    transforms:[['allowWhereWhere',[\n        { key: { tests: [['is', 'jim']] } },\n        { value: { tests: [['is', 'first']] } },\n    ]]]\n}\n\nconst value = {\n    jim:'nice!',\n    fred:'first',\n    jane:'ok'\n}\n\ncast(object(transforms(allowWhere(allowTransform)),value);\n// { jim: 'nice!', fred: 'first' }\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const allowTransform = (key,value) => key === 'jim' || value === 'first';\n\nconst value = {\n    jim:'nice!',\n    fred:'first',\n    jane:'ok'\n}\n\ncast(object(transforms(allowWhere(allowTransform)),value);\n// { jim: 'nice!', fred: 'first' }\n"))),Object(c.b)("h3",{id:"stripkeys"},"stripKeys"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"stripKeys(...string[])"))),Object(c.b)("p",null,"Same as ",Object(c.b)("a",Object(t.a)({parentName:"p"},{href:"#stripWhere"}),"stripWhere")," except the arguments are the keys to blacklist."),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'object',\n    shape: { \n        a: { schema: 'number' },\n        d: { schema: 'number' }\n    },\n    transforms:[['stripKeys','a','b'];\n}\n\nconst value = { a:1, b:2, c:3, d:4 }\ncast(createSchema(schema),value);\n// {  c: 3, d: 4 }\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = object(\n    {\n        a:number(),\n        b:number()\n    },\n    transforms(stripKeys('a','b'))\n)\n\nconst value = { a:1, b:2, c:3, d:4 }\ncast(schema,value);\n// {  c: 3, d: 4 }\n")),Object(c.b)("h3",{id:"allowkeys"},"allowKeys"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"allowKeys(...string[])"))),Object(c.b)("p",null,"Same as ",Object(c.b)("a",Object(t.a)({parentName:"p"},{href:"#allowWhere"}),"allowWhere")," except the arguments are the keys to blacklist."),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'object',\n    shape: { \n        a: { schema: 'number' },\n        d: { schema: 'number' }\n    },\n    transforms:[['allowKeys','a','b'];\n}\n\nconst value = { a:1, b:2, c:3, d:4 }\ncast(createSchema(schema),value);\n// {  a: 1, b: 2 }\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = object(\n    {\n        a:number(),\n        b:number()\n    },\n    transforms(allowKeys('a','b'))\n)\n\nconst value = { a:1, b:2, c:3, d:4 }\ncast(schema,value);\n// {  a: 1, b: 2 }\n")),Object(c.b)("h3",{id:"stripunknown"},"stripUnknown"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"stripUnknown()"))),Object(c.b)("p",null,"Removes all keys not part of the inner schema (",Object(c.b)("inlineCode",{parentName:"p"},"shape"),"):"),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'object',\n    shape: { \n        a: { schema: 'number' },\n        d: { schema: 'number' }\n    },\n    transforms:['stripUnknown'];\n}\n\nconst value = { a:1, b:2, c:3, d:4 }\ncast(createSchema(schema),value);\n// { a: 1, d: 4 }\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = object(\n    {\n        a:number(),\n        b:number()\n    },\n    transforms(stripUnknown())\n)\n\nconst value = { a:1, b:2, c:3, d:4 }\ncast(schema,value);\n// { a: 1, d: 4 }\n"))),Object(c.b)("h3",{id:"from"},"from"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"from(frm: string, to: string, alias = false)"))),Object(c.b)("p",null,"Converts a key to another key. If ",Object(c.b)("inlineCode",{parentName:"p"},"alias")," is true, then the original key will be retained."),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'object',\n    shape: { \n        a: { schema: 'number' },\n        d: { schema: 'number' }\n    },\n    transforms:[['from','a','x',true]];\n}\n\nconst value = { a:1, b:2, c:3, d:4 }\ncast(createSchema(schema),value);\n// { a: 1, b: 2, c: 3, d: 4, x: 1 }\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const schema = object(\n    {\n        a:number(),\n        b:number()\n    },\n    transforms(from('a','x',true))\n)\n\nconst value = { a:1, b:2, c:3, d:4 }\ncast(schema,value);\n// { a: 1, b: 2, c: 3, d: 4, x: 1 }\n"))))}m.isMDXComponent=!0},90:function(e,a,n){"use strict";function t(e){var a,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(a=0;a<e.length;a++)e[a]&&(n=t(e[a]))&&(r&&(r+=" "),r+=n);else for(a in e)e[a]&&(r&&(r+=" "),r+=a);return r}a.a=function(){for(var e,a,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(a=t(e))&&(r&&(r+=" "),r+=a);return r}},91:function(e,a,n){"use strict";n.d(a,"a",(function(){return m})),n.d(a,"b",(function(){return j}));var t=n(0),r=n.n(t);function c(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function s(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?s(Object(n),!0).forEach((function(a){c(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function b(e,a){if(null==e)return{};var n,t,r=function(e,a){if(null==e)return{};var n,t,r={},c=Object.keys(e);for(t=0;t<c.length;t++)n=c[t],a.indexOf(n)>=0||(r[n]=e[n]);return r}(e,a);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(t=0;t<c.length;t++)n=c[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=r.a.createContext({}),i=function(e){var a=r.a.useContext(o),n=a;return e&&(n="function"==typeof e?e(a):l(l({},a),e)),n},m=function(e){var a=i(e.components);return r.a.createElement(o.Provider,{value:a},e.children)},u={inlineCode:"code",wrapper:function(e){var a=e.children;return r.a.createElement(r.a.Fragment,{},a)}},p=r.a.forwardRef((function(e,a){var n=e.components,t=e.mdxType,c=e.originalType,s=e.parentName,o=b(e,["components","mdxType","originalType","parentName"]),m=i(n),p=t,j=m["".concat(s,".").concat(p)]||m[p]||u[p]||c;return n?r.a.createElement(j,l(l({ref:a},o),{},{components:n})):r.a.createElement(j,l({ref:a},o))}));function j(e,a){var n=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var c=n.length,s=new Array(c);s[0]=p;var l={};for(var b in a)hasOwnProperty.call(a,b)&&(l[b]=a[b]);l.originalType=e,l.mdxType="string"==typeof e?e:t,s[1]=l;for(var o=2;o<c;o++)s[o]=n[o];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},93:function(e,a,n){"use strict";var t=n(0),r=n(94);a.a=function(){var e=Object(t.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},94:function(e,a,n){"use strict";var t=n(0),r=Object(t.createContext)(void 0);a.a=r},95:function(e,a,n){"use strict";n.d(a,"b",(function(){return j})),n.d(a,"a",(function(){return d}));var t=n(0),r=n.n(t),c=n(93),s=n(90),l=n(53),b=n.n(l),o=37,i=39;var m=function(e){var a=e.lazy,n=e.block,l=e.children,m=e.defaultValue,u=e.values,p=e.groupId,j=e.className,d=Object(c.a)(),h=d.tabGroupChoices,O=d.setTabGroupChoices,f=Object(t.useState)(m),g=f[0],y=f[1];if(null!=p){var v=h[p];null!=v&&v!==g&&u.some((function(e){return e.value===v}))&&y(v)}var N=function(e){y(e),null!=p&&O(p,e)},w=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(s.a)("tabs",{"tabs--block":n},j)},u.map((function(e){var a=e.value,n=e.label;return r.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":g===a,className:Object(s.a)("tabs__item",b.a.tabItem,{"tabs__item--active":g===a}),key:a,ref:function(e){return w.push(e)},onKeyDown:function(e){!function(e,a,n){switch(n.keyCode){case i:!function(e,a){var n=e.indexOf(a)+1;e[n]?e[n].focus():e[0].focus()}(e,a);break;case o:!function(e,a){var n=e.indexOf(a)-1;e[n]?e[n].focus():e[e.length-1].focus()}(e,a)}}(w,e.target,e)},onFocus:function(){return N(a)},onClick:function(){N(a)}},n)}))),a?Object(t.cloneElement)(l.filter((function(e){return e.props.value===g}))[0],{className:"margin-vert--md"}):r.a.createElement("div",{className:"margin-vert--md"},l.map((function(e,a){return Object(t.cloneElement)(e,{key:a,hidden:e.props.value!==g})}))))},u=n(3);var p=function(e){var a=e.children,n=e.hidden,t=e.className;return r.a.createElement("div",Object(u.a)({role:"tabpanel"},{hidden:n,className:t}),a)},j=(n(91),function(e){var a=e.children,n=e.tabs,t=e.default;return r.a.createElement(m,{defaultValue:t||n[0],values:n.map((function(e){return{label:e,value:e}}))},n.map((function(e,n){return r.a.createElement(p,{key:e,value:e},a[n])})))}),d=function(e){var a=e.children,n=e.link;return r.a.createElement(r.a.Fragment,null,r.a.createElement(j,{tabs:["ast","functional"]},a),n&&r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{target:"_blank",href:n},"Try it on CodeSandbox!"),r.a.createElement("hr",null),r.a.createElement("br",null)))}}}]);