/*! For license information please see 91472d53.a9f56050.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{113:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return l})),t.d(n,"metadata",(function(){return o})),t.d(n,"rightToc",(function(){return s})),t.d(n,"default",(function(){return b}));var a=t(1),i=t(6),r=(t(0),t(122)),c=t(124),l={id:"conditions",title:"Conditions",sidebar_label:"Conditions"},o={id:"conditions",title:"Conditions",description:"import { AstFn, ZuzeTabs } from '../src/examples/tabs';",source:"@site/docs/conditions.md",permalink:"/schema/docs/conditions",editUrl:"https://github.com/zuze-lab/schema/edit/master/website/docs/conditions.md",sidebar_label:"Conditions",sidebar:"someSidebar",previous:{title:"Validating",permalink:"/schema/docs/validating"},next:{title:"Extending",permalink:"/schema/docs/extending"}},s=[{value:"Creating Conditions",id:"creating-conditions",children:[{value:"Functional",id:"functional",children:[]},{value:"AST Syntax",id:"ast-syntax",children:[]}]},{value:"Refs",id:"refs",children:[{value:"Sibling",id:"sibling",children:[]},{value:"Context",id:"context",children:[]},{value:"Relative Refs (!)",id:"relative-refs-",children:[]}]}],d={rightToc:s};function b(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},d,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Conditions are arguably the most powerful part of ",Object(r.b)("strong",{parentName:"p"},"@zuze/schema"),". Some methods to handle conditional validations is present in virtually all schemas, but ",Object(r.b)("strong",{parentName:"p"},"@zuze/schema")," aims to to boil complicated conditional logic when it comes to schema validation down to a very simple and intuitive API (especially via the ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/type-reference#ast"}),"AST"),")"),Object(r.b)("p",null,"Schemas can be conditional based on two properties, "),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"fields somewhere in the value being validated or"),Object(r.b)("li",{parentName:"ol"},"context.")),Object(r.b)("p",null,"Both of which are accessible via ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"#refs"}),"refs")),Object(r.b)("h2",{id:"creating-conditions"},"Creating Conditions"),Object(r.b)("p",null,"There are multiple supported syntaxes to create conditions, almost all of which are based on a WTO (when-then-otherwise) concept. Arguably the easiest to understand is ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/ast#conditions"}),"AST")," format."),Object(r.b)("h3",{id:"functional"},"Functional"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"when")," can accept two arguments, the first is a string (or an array of strings) and the second is a function that accepts the resolved values of the specified dependencies and the original schema."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const conditional = string(\n    tests(required()),\n    conditions(when('fieldA', (fieldA, schema) => {\n        return fieldA >= 10 ? schema : extend(schema,tests(min(20)))\n    }))\n)\n\nconst schema = object({c:conditional})\n\nisValidSync(schema, {fieldA: 10, c: 19}); // true\nisValidSync(schema, {fieldA: 8, c: 19}); // false\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"// array of dependencies\nconst conditional = string(\n    tests(required()),\n    conditions(when(['fieldA','fieldB'], (fieldA, fieldB, schema) => { ... }))\n)\n")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"when")," can also accept an object format as it's second argument"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"// then or otherwise do not both need to specified, but at least one of them is required\n\nconst conditional = string(\n    tests(required()),\n    conditions(when('fieldA', {\n        is: fieldA => fieldA >= 10,\n        otherwise: tests(min(20))\n    }))\n)\n\nconst schema = object({c:conditional})\n\nisValidSync(schema, {fieldA: 10, c: 19}); // false\nisValidSync(schema, {fieldA: 8, c: 19}); // true\n")),Object(r.b)("h3",{id:"ast-syntax"},"AST Syntax"),Object(r.b)("p",null,"The AIM of AST syntax is to be extremely readable:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const conditional = createSchema({\n    schema: 'string',\n    tests: ['required'],\n    conditions: [\n        {\n            // if the value at fieldA does not pass these validators\n            when: { fieldA: { tests: [['min',10]] } },\n            // ... add in the following AST schema definition\n            otherwise: { tests: [['min',20]] }\n        }\n    ]\n});\n\nisValidSync(schema, {fieldA: 10, c: 19}); // false\nisValidSync(schema, {fieldA: 8, c: 19}); // true\n\n")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"conditions")," is an array and you can create as many conditions as you need. They will be evaluated in the order they were added to the SchemaDefinition."),Object(r.b)("h2",{id:"refs"},"Refs"),Object(r.b)("p",null,"A ref (i.e. reference) is a pointer to a sibling/ancestor in the value that is being validated or a value from context. They are used in ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"#validators.md"}),"validators")," (where supported) and to resolve conditional schemas. "),Object(r.b)("p",null,"Refs are also accessed via the path notation using ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.npmjs.com/package/property-expr#getterexpression--safeaccess-"}),"getter")," from ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.npmjs.com/package/property-expr"}),"property-expr")),Object(r.b)(c.a,{mdxType:"AstFn"},Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    schema: 'string',\n    tests: [['is', { ref: '$ctx.prop' }]]\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"string(tests(is(ref('$ctx.prop'))));\n"))),Object(r.b)("h3",{id:"sibling"},"Sibling"),Object(r.b)("p",null,"Sibling references are accessed by specifying the object property."),Object(r.b)(c.a,{mdxType:"AstFn"},Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    schema: 'object',\n    shape: {\n        fieldA: {\n            tests: [['oneOf', [{ ref: 'fieldB' }, { ref: 'fieldC' }]]]\n        },\n        fieldB: { schema: 'string' },\n        fieldC: {\n            schema: 'object',\n            shape: {\n                fieldD: { schema: 'string' }\n            }\n        }\n    }\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"object({\n    fieldA: mixed(tests(oneOf([\n        ref('fieldB'),\n        ref('fieldC.fieldD')\n    ]))),\n    fieldB: string(),\n    fieldC: object({\n        fieldD: string()\n    })\n})\n"))),Object(r.b)("h3",{id:"context"},"Context"),Object(r.b)("p",null,"Context can also be used to resolve conditions. Context is accessed using a special prefix (",Object(r.b)("inlineCode",{parentName:"p"},"$")," by default, but this can be changed by setting the ",Object(r.b)("inlineCode",{parentName:"p"},"contextPrefix")," option when casting/validating a schema). "),Object(r.b)(c.a,{mdxType:"AstFn"},Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    schema: 'string',\n    conditions: [\n        {\n            when: { '$ctx.prop': { tests: [['is',5]] } },\n            then: { tests: [['min',5]] },\n            otherwise: { tests: [['min', {ref:'$ctx.otherProp'}]]}\n        }\n    ]\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"string(\n    conditions(\n        when('$ctx.prop',{\n            is:5,\n            then: tests(min(5)),\n            otherwise: tests(min(ref('$ctx.otherProp')))\n        })\n    )\n)\n"))),Object(r.b)("h3",{id:"relative-refs-"},"Relative Refs (!)"),Object(r.b)("p",null,"Relative refs allow access to ancestors schemas/values from a child schema. They are defined by prefixing with a ref with a ",Object(r.b)("inlineCode",{parentName:"p"},"."),". Every ",Object(r.b)("inlineCode",{parentName:"p"},"."),' in the prefix goes up "one level" of schema.'),Object(r.b)("p",null,"Casting the below object schema results in the following output:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"{\n    fielda: {\n        field1: { \n            field1: 'bill',\n            field2: 'joe' \n        },\n        field3: { \n            field4: 'joe' \n        }\n    },\n    field5: 'joe'\n}\n")),Object(r.b)(c.a,{mdxType:"AstFn"},Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    schema: 'object',\n    shape: {\n        fielda: {\n            schema: 'object',\n            shape: {\n                field1: {\n                    schema: 'object',\n                    shape: {\n                        field1: { default: 'bill' },\n                        field2: { default: { ref: '.field3.field4' } }                        \n                    }\n                },\n                field3: {\n                    schema: 'object',\n                    shape: {\n                        field4: { default: { ref: '..field5' } }\n                    }\n                }\n            }\n        },\n        field5: {\n            default: 'joe'\n        }\n    }\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"object({\n    fielda: object({\n        field1: object({\n        field1: lazy(() => mixed(def('bill'))),\n        field2: conditional(\n            condition('.field3.field4', field => mixed(def(field)))\n        ),\n        }),\n        field3: object({\n        field4: conditional(\n            condition('..field5', field => mixed(def(field)))\n        ),\n        }),\n    }),\n    field5: mixed(def('joe')),\n})\n"))))}b.isMDXComponent=!0},122:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return u}));var a=t(0),i=t.n(a);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=i.a.createContext({}),d=function(e){var n=i.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l({},n,{},e)),t},b=function(e){var n=d(e.components);return i.a.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},f=Object(a.forwardRef)((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,c=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),b=d(t),f=a,u=b["".concat(c,".").concat(f)]||b[f]||p[f]||r;return t?i.a.createElement(u,l({ref:n},s,{components:t})):i.a.createElement(u,l({ref:n},s))}));function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,c=new Array(r);c[0]=f;var l={};for(var o in n)hasOwnProperty.call(n,o)&&(l[o]=n[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,c[1]=l;for(var s=2;s<r;s++)c[s]=t[s];return i.a.createElement.apply(null,c)}return i.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"},123:function(e,n,t){var a;!function(){"use strict";var t={}.hasOwnProperty;function i(){for(var e=[],n=0;n<arguments.length;n++){var a=arguments[n];if(a){var r=typeof a;if("string"===r||"number"===r)e.push(a);else if(Array.isArray(a)&&a.length){var c=i.apply(null,a);c&&e.push(c)}else if("object"===r)for(var l in a)t.call(a,l)&&a[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(a=function(){return i}.apply(n,[]))||(e.exports=a)}()},124:function(e,n,t){"use strict";t.d(n,"b",(function(){return f})),t.d(n,"a",(function(){return u}));var a=t(0),i=t.n(a),r=t(123),c=t.n(r),l=t(93),o=t.n(l);const s=37,d=39;var b=function(e){const{block:n,children:t,defaultValue:r,values:l}=e,[b,p]=Object(a.useState)(r),f=[];return i.a.createElement("div",null,i.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:c()("tabs",{"tabs--block":n})},l.map(({value:e,label:n})=>i.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":b===e,className:c()("tab-item",o.a.tabItem,{"tab-item--active":b===e}),key:e,ref:e=>f.push(e),onKeyDown:e=>((e,n,t)=>{switch(t.keyCode){case d:((e,n)=>{const t=e.indexOf(n)+1;e[t]?e[t].focus():e[0].focus()})(e,n);break;case s:((e,n)=>{const t=e.indexOf(n)-1;e[t]?e[t].focus():e[e.length-1].focus()})(e,n)}})(f,e.target,e),onFocus:()=>p(e),onClick:()=>p(e)},n))),i.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},a.Children.toArray(t).filter(e=>e.props.value===b)[0]))};var p=function(e){return i.a.createElement("div",null,e.children)};t(122);const f=({children:e,tabs:n,default:t})=>i.a.createElement(b,{defaultValue:t||n[0],values:n.map(e=>({label:e,value:e}))},n.map((n,t)=>i.a.createElement(p,{key:n,value:n},e[t]))),u=({children:e,link:n})=>i.a.createElement(i.a.Fragment,null,i.a.createElement(f,{tabs:["ast","functional"]},e),n&&i.a.createElement(i.a.Fragment,null,i.a.createElement("a",{target:"_blank",href:n},"Try it on CodeSandbox!"),i.a.createElement("hr",null),i.a.createElement("br",null)))}}]);