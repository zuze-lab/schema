/*! For license information please see da1477f0.d82627bd.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{117:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return b})),n.d(t,"default",(function(){return m}));var a=n(1),r=n(6),s=(n(0),n(122)),c=n(124),l={id:"utilities",title:"Utilities",sidebar_label:"Utilities"},i={id:"utilities",title:"Utilities",description:"Utility methods are methods designed to functionally manipulate a schema definition.",source:"@site/docs/utilities.md",permalink:"/schema/docs/utilities",editUrl:"https://github.com/zuze-lab/schema/edit/master/website/docs/utilities.md",sidebar_label:"Utilities",sidebar:"someSidebar",previous:{title:"Validators",permalink:"/schema/docs/validators"},next:{title:"AST",permalink:"/schema/docs/ast"}},b=[{value:"nullable",id:"nullable",children:[]},{value:"typeError",id:"typeerror",children:[]},{value:"def",id:"def",children:[]},{value:"label",id:"label",children:[]},{value:"meta",id:"meta",children:[]},{value:"tests",id:"tests",children:[]},{value:"test",id:"test",children:[]},{value:"transforms",id:"transforms",children:[]},{value:"conditions",id:"conditions",children:[]},{value:"when/condition",id:"whencondition",children:[]},{value:"ref",id:"ref",children:[]},{value:"without",id:"without",children:[]},{value:"of",id:"of",children:[]},{value:"shape",id:"shape",children:[]},{value:"withoutAny",id:"withoutany",children:[]},{value:"warnings",id:"warnings",children:[]}],o={rightToc:b};function m(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(s.b)("wrapper",Object(a.a)({},o,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Utility methods are methods designed to functionally manipulate a schema definition."),Object(s.b)("p",null,"AST examples are provided, where applicable, for the sake of completeness."),Object(s.b)("h2",{id:"nullable"},"nullable"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"nullable(isNullable: boolean = true)"))),Object(s.b)("p",null,"Indicates whether ",Object(s.b)("inlineCode",{parentName:"p"},"null")," is a valid value for this schema."),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"isValidSync(createSchema({nullable:true}), nullable()),null); // true\nisValidSync(createSchema({}) ,null); // false\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"isValidSync(mixed(tests(required()), nullable()),null); // true\nisValidSync(mixed(tests(required())) ,null); // false\n"))),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},"Note:")," ",Object(s.b)("inlineCode",{parentName:"p"},"nullable() === nullable(true)")),Object(s.b)("h2",{id:"typeerror"},"typeError"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"typeError(string | ({value,label}) => string)"))),Object(s.b)("p",null,"Sets the error message for the typeError. ",Object(s.b)("inlineCode",{parentName:"p"},"value")," and ",Object(s.b)("inlineCode",{parentName:"p"},"label")," are available as interpolation parameters."),Object(s.b)("h2",{id:"def"},"def"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"def(value | () => value)"))),Object(s.b)("p",null,"Sets the default value of a schema when the provided value is ",Object(s.b)("inlineCode",{parentName:"p"},"undefined"),"."),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"cast(createSchema({default:'jim'})); // \"jim\"\ncast(createSchema({default:() => new Date()})), undefined); // Sun Mar 15 2020 11:26:32 GMT-0300 (Atlantic Daylight \n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"cast(mixed(def('jim')), undefined); // \"jim\"\ncast(mixed(def(() => new Date()),undefined); // Sun Mar 15 2020 11:26:32 GMT-0300 (Atlantic Daylight Time)\n"))),Object(s.b)("h2",{id:"label"},"label"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"label(string | () => string)"))),Object(s.b)("p",null,"Sets the label on a schema - used for interpolation in error messages."),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    schema:'string',\n    label:'firstName'\n}\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"string(label('firstName'));\n"))),Object(s.b)("h2",{id:"meta"},"meta"),Object(s.b)("p",null,"Sets the meta property on a schema"),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    schema:'string',\n    meta: {\n        someKey:'someVal'\n    }\n}\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"string(meta({someKey:'someVal'}));\n"))),Object(s.b)("h2",{id:"tests"},"tests"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"tests(...ValidatorDefinition[])"))),Object(s.b)("p",null,"Adds tests to a schema"),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'string',\n    tests: ['required',['min',10]]\n};\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"string(tests(required(),min(10)))\n"))),Object(s.b)("h2",{id:"test"},"test"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"(name: string,TestFn: (value,{schema,options}) => boolean | ValidationError | Promise<boolean | ValidationError>)"))),Object(s.b)("p",null,"Functional way to create a validator"),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const isJim = test('isJim',value => value === 'jim');\n\nconst async = test('asyncValidator',async value => {\n    try {\n        await doSomething(value);\n        return true;\n    } catch(err) {\n        return false;\n    }\n});\n\nmixed(tests(isJim,async));\n\n// create a validator that accepts an argument\nconst isThing = (arg) => test('isThing',value => value === arg);\nmixed(tests(isThing('one')));\n")),Object(s.b)("h2",{id:"transforms"},"transforms"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"transforms(...TransformFn[])"))),Object(s.b)("p",null,"Adds transforms to a schema"),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'string',\n    transforms: ['strip','uppercase']\n};\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"string(transforms(strip(),uppercase()))\n"))),Object(s.b)("h2",{id:"conditions"},"conditions"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"conditions(...Condition[])"))),Object(s.b)("p",null,"Adds conditions to a schema"),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'string',\n    conditions: [\n        {\n            when: { fieldA: { tests: [['is','jim']] } },\n            then: { tests: [['min', 10]] },\n            otherwise: { tests: [['min', 20]] }\n        }\n    ]\n};\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"string(conditions(when('fieldA',{\n    is: 'jim',\n    then: tests(min(10)),\n    otherwise: tests(min(20))\n})))\n"))),Object(s.b)("h2",{id:"whencondition"},"when/condition"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"when")," is an alias of the ",Object(s.b)("inlineCode",{parentName:"p"},"condition")),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema:'string',\n    conditions: [\n        {\n            when: {\n                dep1: { tests:['required', ['is','jim']] },\n                dep2: { schema: 'number', tests: [['min',10],['max',20]]}\n            },\n            then:{\n                schema: 'string',\n                tests: ['required']\n            },\n            otherwise:{\n                schema: 'number',\n                tests: [['min',10]]\n            }\n        }\n    ]\n}\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const first = when(\n    ['dep1','dep2'],\n    (dep1,dep2,schema) => nextSchema)\n);\n\nconst second = when(\n    ['dep1','dep2'],\n    {\n        is: (dep1,dep2) => boolean,\n        then: Schema | Partial<Schema> | (schema: Schema) => nextSchema,\n        otherwise: Schema | Partial<Schema> | (schema: Schema) => nextSchema\n    }\n);\n"))),Object(s.b)("h2",{id:"ref"},"ref"),Object(s.b)("p",null,"Create a ",Object(s.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/conditions#refs"}),"reference")," to another field or ",Object(s.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/conditions#context"}),"context")),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'object',\n    shape: {\n        fieldA: {\n            schema: 'string',\n            tests: [['oneOf',[{ref:'fieldA'},ref:{'$context.field'}]]]\n        }\n    }\n}\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const schema = object({\n    fieldA: string(tests(\n        oneOf([\n            ref('fieldA'),\n            ref('$context.field')\n        ])\n    ))\n})\n"))),Object(s.b)("hr",null),Object(s.b)("p",null,"The following two utility method are used to manipulate a schema definition "),Object(s.b)("h2",{id:"without"},"without"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},"without(property: string, schema: Schema, ...refs: any[]): Schema")),Object(s.b)("p",null,"Removes a property from a schema definition. If the property is an array it removes any reference given by ",Object(s.b)("inlineCode",{parentName:"p"},"...refs")," from the array."),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const schema = string(label('my field'));\nconst labelessSchema = without('label', schema);\n\n// IMPORTANT: schema !== labelessSchema\n\nconst minTest = min(10);\nconst maxTest = max(20);\n\nconst schema = string(tests(minTest, maxTest));\n\n// returns a schema without minTest\nconst withoutMin = without('test', schema, minTest);\n")),Object(s.b)("h2",{id:"of"},"of"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"of(schema: Schema)"))),Object(s.b)("p",null,"Defines the inner schema of an array schema."),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    schema: 'array',\n    of: { schema: 'number', tests: [['min',10]] }\n}\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"array(of(number(tests(min(10)))));\n"))),Object(s.b)("h2",{id:"shape"},"shape"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"shape({[key: string]: Schema})"))),Object(s.b)("p",null,"Defines the inner schema of an object schema."),Object(s.b)(c.a,{mdxType:"AstFn"},Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    schema: 'object',\n    shape: {\n        fieldA: { schema: 'number', tests: [['min', 10]] },\n        fieldB: { schema: 'string', tests: ['required'] }\n    }\n}\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"object(shape({\n    fieldA: number(tests(min(10))),\n    fieldB: string(tests(required()))\n}))\n"))),Object(s.b)("h2",{id:"withoutany"},"withoutAny"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},"withoutAny(property: string, schema: Schema): Schema")),Object(s.b)("p",null,"Removes all transforms/conditions/tests from a schema"),Object(s.b)("pre",null,Object(s.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const schema = string(tests(min(10),max(20)));\nconst withoutValidations = withoutAny('test',schema);\n")),Object(s.b)("h2",{id:"warnings"},"warnings"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},Object(s.b)("inlineCode",{parentName:"strong"},"warnings(shouldWarn: boolean = false)"))),Object(s.b)("p",null,"There are certain warnings that occur in ",Object(s.b)("strong",{parentName:"p"},"@zuze/schema")," that you may want to suppress in a production environment. Warnings are enabled by default and can be turned off by calling ",Object(s.b)("inlineCode",{parentName:"p"},"warnings(false)"),"."))}m.isMDXComponent=!0},121:function(e,t,n){var a;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var s=typeof a;if("string"===s||"number"===s)e.push(a);else if(Array.isArray(a)&&a.length){var c=r.apply(null,a);c&&e.push(c)}else if("object"===s)for(var l in a)n.call(a,l)&&a[l]&&e.push(l)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()},122:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b=r.a.createContext({}),o=function(e){var t=r.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):l({},t,{},e)),n},m=function(e){var t=o(e.components);return r.a.createElement(b.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,b=i(e,["components","mdxType","originalType","parentName"]),m=o(n),u=a,d=m["".concat(c,".").concat(u)]||m[u]||p[u]||s;return n?r.a.createElement(d,l({ref:t},b,{components:n})):r.a.createElement(d,l({ref:t},b))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,c=new Array(s);c[0]=u;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,c[1]=l;for(var b=2;b<s;b++)c[b]=n[b];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},124:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return d}));var a=n(0),r=n.n(a),s=n(121),c=n.n(s),l=n(93),i=n.n(l);const b=37,o=39;var m=function(e){const{block:t,children:n,defaultValue:s,values:l}=e,[m,p]=Object(a.useState)(s),u=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:c()("tabs",{"tabs--block":t})},l.map(({value:e,label:t})=>r.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":m===e,className:c()("tab-item",i.a.tabItem,{"tab-item--active":m===e}),key:e,ref:e=>u.push(e),onKeyDown:e=>((e,t,n)=>{switch(n.keyCode){case o:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case b:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(u,e.target,e),onFocus:()=>p(e),onClick:()=>p(e)},t))),r.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},a.Children.toArray(n).filter(e=>e.props.value===m)[0]))};var p=function(e){return r.a.createElement("div",null,e.children)};n(122);const u=({children:e,tabs:t,default:n})=>r.a.createElement(m,{defaultValue:n||t[0],values:t.map(e=>({label:e,value:e}))},t.map((t,n)=>r.a.createElement(p,{key:t,value:t},e[n]))),d=({children:e,link:t})=>r.a.createElement(r.a.Fragment,null,r.a.createElement(u,{tabs:["ast","functional"]},e),t&&r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{target:"_blank",href:t},"Try it on CodeSandbox!"),r.a.createElement("hr",null),r.a.createElement("br",null)))}}]);