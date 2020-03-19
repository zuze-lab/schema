/*! For license information please see 734c4bed.1aa5f601.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{112:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return i})),t.d(a,"metadata",(function(){return o})),t.d(a,"rightToc",(function(){return l})),t.d(a,"default",(function(){return m}));var n=t(1),r=t(6),c=(t(0),t(122)),s=t(124),i={id:"ast",title:"AST",sidebar_label:"AST"},o={id:"ast",title:"AST",description:"import { AstFn, ZuzeTabs } from '../src/examples/tabs';",source:"@site/docs/ast.md",permalink:"/schema/docs/ast",editUrl:"https://github.com/zuze-lab/schema/edit/master/website/docs/ast.md",sidebar_label:"AST",sidebar:"someSidebar",previous:{title:"Utilities",permalink:"/schema/docs/utilities"},next:{title:"Type Reference",permalink:"/schema/docs/type-reference"}},l=[{value:"Passing Arguments",id:"passing-arguments",children:[{value:"Conditions",id:"conditions",children:[]},{value:"Refs",id:"refs",children:[]}]},{value:"Custom Transforms/Validators",id:"custom-transformsvalidators",children:[]},{value:"AST Transforms",id:"ast-transforms",children:[{value:"unique",id:"unique",children:[]},{value:"compact",id:"compact",children:[]}]},{value:"AST Validators",id:"ast-validators",children:[{value:"oneOfType",id:"oneoftype",children:[]},{value:"negate",id:"negate",children:[]},{value:"serial",id:"serial",children:[]}]},{value:"API",id:"api",children:[{value:"matches",id:"matches",children:[]},{value:"createSchema",id:"createschema",children:[]},{value:"createSchemas",id:"createschemas",children:[]}]}],b={rightToc:l};function m(e){var a=e.components,t=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},b,t,{components:a,mdxType:"MDXLayout"}),Object(c.b)("p",null,"The Abstract Syntax Tree (AST) format for ",Object(c.b)("strong",{parentName:"p"},"@zuze/schema")," is intuitive. It mirrors the functional API virtually completely. "),Object(c.b)("h2",{id:"passing-arguments"},"Passing Arguments"),Object(c.b)("p",null,"When it comes to ",Object(c.b)("inlineCode",{parentName:"p"},"tests")," and ",Object(c.b)("inlineCode",{parentName:"p"},"transforms"),", each item in the array is evaluated as a function name. Or, in the case of the item in the array being an array itself, the first item is used as the function name and all subsequent values in the array will be passed to it as arguments."),Object(c.b)(s.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"{\n    schema: 'array',\n    tests: [ 'required', ['min', 5, { message: 'At least 5 items required' } ] ],\n    transforms: [ 'compact' ]\n}\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"array(\n    tests( required(), min(5, { message: 'At least 5 items required' } )),\n    transforms( compact() )\n)\n"))),Object(c.b)("h3",{id:"conditions"},"Conditions"),Object(c.b)("p",null,"Using the AST API conditions is an array of ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#astcondition"}),"ASTCondition")," objects:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"// ConditionObject\n\nwhen: ObjectAST | ObjectAST[],\nthen?: Partial<AST>,\notherwise?: Partial<AST>\n\n")),Object(c.b)("p",null,"When ",Object(c.b)("inlineCode",{parentName:"p"},"when")," is an array, if ANY of the ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#objectast"}),Object(c.b)("inlineCode",{parentName:"a"},"ObjectAST's"))," are matched (using ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#matches"}),"matches"),"), the ",Object(c.b)("inlineCode",{parentName:"p"},"then")," will be applied (if present). If not, the ",Object(c.b)("inlineCode",{parentName:"p"},"otherwise")," will be applied (if present)."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'mixed',\n    conditions: [\n        {\n            when: {\n                someField: { tests: [['is','jim']] }\n            },\n            then: {\n                schema: 'string',\n                tests: ['required']    \n            },\n            otherwise: {\n                schema: 'number',\n                tests: [ ['min', 10] ]\n            }\n        }\n    ]\n}\n")),Object(c.b)("h3",{id:"refs"},"Refs"),Object(c.b)("p",null,"Refs are created in AST via ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#astref"}),"ASTRef")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'string',\n    conditions: [\n        {\n            when: {\n                fieldA: [['is',{ref:'fieldB'}]]\n            }\n        }\n    ]\n}\n")),Object(c.b)("h2",{id:"custom-transformsvalidators"},"Custom Transforms/Validators"),Object(c.b)("p",null,"By default, all transforms/validators available in ",Object(c.b)("strong",{parentName:"p"},"@zuze/schema")," are available via the AST. But part of the beauty of ",Object(c.b)("strong",{parentName:"p"},"@zuze/schema")," is being able to ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/extending"}),"create your own transforms/validators"),". "),Object(c.b)("p",null,"When using the AST, each custom transform/validator must be a function (called with the ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#astschemaoptions"}),"options")," passed to ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#createSchemas"}),Object(c.b)("inlineCode",{parentName:"a"},"createSchema(s)")),"/",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#matches"}),Object(c.b)("inlineCode",{parentName:"a"},"matches"))," that returns a function called with the arguments in the AST."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"// validator\nconst customASTValidator = options => (...args) => ValidatorDefinition\n\n// transform\nconst customASTTransform = options => (...args) => TransFormFunction\n")),Object(c.b)("p",null,"The user-supplied transforms/validators need to be given in options argument of ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#createSchemas"}),Object(c.b)("inlineCode",{parentName:"a"},"createSchema(s)")),"/",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#matches"}),Object(c.b)("inlineCode",{parentName:"a"},"matches")),"."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema:'mixed',\n    transforms:[ ['customASTTransform', 'arg1', 'arg2'] ],\n    tests:[ ['customASTValidator', 'arg1', 'arg2'] ]\n}\n\nconst schema = createSchema(schema,{\n    transforms: { customASTTransform },\n    validators: { customASTValidator }\n});\n")),Object(c.b)("h2",{id:"ast-transforms"},"AST Transforms"),Object(c.b)("p",null,"Some transforms in ",Object(c.b)("inlineCode",{parentName:"p"},"@zuze/schema")," have AST-specific implementations:"),Object(c.b)("h3",{id:"unique"},"unique"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'array',\n    transforms: [['unique','id']]\n}\n\nconst subject = [{ id: 1, a: 'a'},{id: 2, a: 'b'},{id: 1,a: 'c'}];\ncast(createSchema(schema,subject)); // [ {id:1,a:'a'}, {id:2,a:'b'} ] \n")),Object(c.b)("h3",{id:"compact"},"compact"),Object(c.b)("p",null,Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/transforms#compact"}),"compact")," accepts a rejector function in the functional form. In the AST form it accepts an argument that will be passed to ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#matches"}),"matches"),". Any value in the array that passes ",Object(c.b)("inlineCode",{parentName:"p"},"matches")," will be excluded."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'array',\n    transforms: [['compact', { tests:[['is', 'jim']] } ]]\n}\n\nconst subject = ['first', 'jim', 'third', 9];\ncast(createSchema(schema,subject)); // ['first', 'third', 9]\n")),Object(c.b)("h2",{id:"ast-validators"},"AST Validators"),Object(c.b)("p",null,"There are some functional validators that require some tweaking to be mirrored by the AST - namely ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/validators#oneOfType"}),Object(c.b)("inlineCode",{parentName:"a"},"oneOfType")),", ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/validators#negate"}),Object(c.b)("inlineCode",{parentName:"a"},"negate")),", and ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/validators#serial"}),Object(c.b)("inlineCode",{parentName:"a"},"serial")),"."),Object(c.b)("h3",{id:"oneoftype"},"oneOfType"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'mixed',\n    tests: [['oneOfType',[\n        {\n            schema: 'string',\n            tests: [['min',5]]\n        },\n        {\n            schema: 'number',\n            tests: [['between',10,20]]\n        }\n    ]]]\n}\n")),Object(c.b)("h3",{id:"negate"},"negate"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'number',\n    tests: [['negate',['between',10,20]]]\n}\n")),Object(c.b)("h3",{id:"serial"},"serial"),Object(c.b)("p",null,"As you'll remember, ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/validators#serial"}),"serial")," is a validator that runs the ValidatorDefinitions passed to it sequentially, stopping after the first one fails. It's only necessary when dependent async validations."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const schema = {\n    schema: 'number',\n    tests: [['serial', [['between', 10, 20]]]]\n}\n")),Object(c.b)("h2",{id:"api"},"API"),Object(c.b)("h3",{id:"matches"},"matches"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"matches(AST | AST[], options?: ASTMatchesOptions): boolean | Promise<boolean>"))),Object(c.b)("p",null,"Not to be confused with the matches validator:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { ast } from '@zuze/schema';\nconst { matches } = ast;\n")),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"matches")," runs synchronously BY DEFAULT unless ",Object(c.b)("inlineCode",{parentName:"p"},"sync:false")," is passed as an option.\nIt is equivalent to running ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/schemas#isValidSync"}),"isValidSync")," on a SchemaDefinition"),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"matches")," accepts ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#ast"}),"AST")," or an array of ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#ast"}),"ASTs")," and returns true (or a Promise resolving to true) if ",Object(c.b)("strong",{parentName:"p"},"any")," of the ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#ast"}),"ASTs")," are valid. If you pass ",Object(c.b)("inlineCode",{parentName:"p"},"{how:'all'}")," (see ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#astmatchesoptions"}),"ASTMatchesOptions"),") as an option then it will only return true if all of the ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#ast"}),"ASTs")," are valid."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const defs = [\n    { schema:'string', tests:[['min',15]] },\n    { schema:'string', tests:['email'] }\n]\n\nmatches(defs, 'at least 15 chars'); // true\nmatches(defs, 'me@you.com'); // true\nmatches(defs, 'me@you.com', {how:'every'}); // false\nmatches(defs, 'me@muchlongeraddress.com', {how:'every'}); // true\n")),Object(c.b)("h3",{id:"createschema"},"createSchema"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"createSchema(schema: AST, options?: ASTSchemaOptions): Schema"))),Object(c.b)("p",null,"Converts an ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#ast"}),"AST")," to a SchemaDefinition that can be passed to one of the functional methods like ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/schemas#cast"}),"cast"),", ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/schemas#validate"}),"validate"),"/",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/schemas#validateSync"}),"validateSync"),", ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/schemas#isValid"}),"isValid"),"/",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/schemas#isValidSync"}),"isValidSync"),", ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/schemas#validateAt"}),"validateAt"),"/",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/schemas#validateSync"}),"validateAtSync")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"createSchema({schema:'string'}); // equivalent to string()\n")),Object(c.b)("h3",{id:"createschemas"},"createSchemas"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},Object(c.b)("inlineCode",{parentName:"strong"},"createSchemas(schemas: AST | AST[], options?: ASTSchemaOptions): Schema[]"))),Object(c.b)("p",null,"Same as ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#createschema"}),"createSchema")," except it returns an array of SchemaDefinitions and can accept a single ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/schema/docs/type-reference#ast"}),"AST")," or an array"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"createSchema([{schema:'string'},{schema:'number'}]);\n// returns eqivalent of [ string(), number() ]\n")))}m.isMDXComponent=!0},122:function(e,a,t){"use strict";t.d(a,"a",(function(){return m})),t.d(a,"b",(function(){return u}));var n=t(0),r=t.n(n);function c(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function s(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?s(Object(t),!0).forEach((function(a){c(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function o(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)t=c[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)t=c[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=r.a.createContext({}),b=function(e){var a=r.a.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):i({},a,{},e)),t},m=function(e){var a=b(e.components);return r.a.createElement(l.Provider,{value:a},e.children)},p={inlineCode:"code",wrapper:function(e){var a=e.children;return r.a.createElement(r.a.Fragment,{},a)}},h=Object(n.forwardRef)((function(e,a){var t=e.components,n=e.mdxType,c=e.originalType,s=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),m=b(t),h=n,u=m["".concat(s,".").concat(h)]||m[h]||p[h]||c;return t?r.a.createElement(u,i({ref:a},l,{components:t})):r.a.createElement(u,i({ref:a},l))}));function u(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var c=t.length,s=new Array(c);s[0]=h;var i={};for(var o in a)hasOwnProperty.call(a,o)&&(i[o]=a[o]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var l=2;l<c;l++)s[l]=t[l];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,t)}h.displayName="MDXCreateElement"},123:function(e,a,t){var n;!function(){"use strict";var t={}.hasOwnProperty;function r(){for(var e=[],a=0;a<arguments.length;a++){var n=arguments[a];if(n){var c=typeof n;if("string"===c||"number"===c)e.push(n);else if(Array.isArray(n)&&n.length){var s=r.apply(null,n);s&&e.push(s)}else if("object"===c)for(var i in n)t.call(n,i)&&n[i]&&e.push(i)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(a,[]))||(e.exports=n)}()},124:function(e,a,t){"use strict";t.d(a,"b",(function(){return h})),t.d(a,"a",(function(){return u}));var n=t(0),r=t.n(n),c=t(123),s=t.n(c),i=t(93),o=t.n(i);const l=37,b=39;var m=function(e){const{block:a,children:t,defaultValue:c,values:i}=e,[m,p]=Object(n.useState)(c),h=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:s()("tabs",{"tabs--block":a})},i.map(({value:e,label:a})=>r.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":m===e,className:s()("tab-item",o.a.tabItem,{"tab-item--active":m===e}),key:e,ref:e=>h.push(e),onKeyDown:e=>((e,a,t)=>{switch(t.keyCode){case b:((e,a)=>{const t=e.indexOf(a)+1;e[t]?e[t].focus():e[0].focus()})(e,a);break;case l:((e,a)=>{const t=e.indexOf(a)-1;e[t]?e[t].focus():e[e.length-1].focus()})(e,a)}})(h,e.target,e),onFocus:()=>p(e),onClick:()=>p(e)},a))),r.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},n.Children.toArray(t).filter(e=>e.props.value===m)[0]))};var p=function(e){return r.a.createElement("div",null,e.children)};t(122);const h=({children:e,tabs:a,default:t})=>r.a.createElement(m,{defaultValue:t||a[0],values:a.map(e=>({label:e,value:e}))},a.map((a,t)=>r.a.createElement(p,{key:a,value:a},e[t]))),u=({children:e,link:a})=>r.a.createElement(r.a.Fragment,null,r.a.createElement(h,{tabs:["ast","functional"]},e),a&&r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{target:"_blank",href:a},"Try it on CodeSandbox!"),r.a.createElement("hr",null),r.a.createElement("br",null)))}}]);