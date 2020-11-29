(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{72:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return b}));var a=n(3),r=n(7),c=(n(0),n(91)),o=n(95),s={id:"extending",title:"Extending",sidebar_label:"Extending"},i={unversionedId:"extending",id:"extending",isDocsHomePage:!1,title:"Extending",description:"One of the best parts of @zuze/schema (aside from the cool conditions) is the ability to extend it with your own custom validators/transforms.",source:"@site/docs/extending.md",slug:"/extending",permalink:"/schema/docs/extending",editUrl:"https://github.com/zuze-lab/schema/edit/master/website/docs/extending.md",version:"current",sidebar_label:"Extending",sidebar:"someSidebar",previous:{title:"Conditions",permalink:"/schema/docs/conditions"},next:{title:"Schemas",permalink:"/schema/docs/schemas"}},l=[{value:"Creating Validators",id:"creating-validators",children:[{value:"Async",id:"async",children:[]},{value:"Accepting Arguments",id:"accepting-arguments",children:[]}]},{value:"Creating Transforms",id:"creating-transforms",children:[]}],u={rightToc:l};function b(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"One of the best parts of ",Object(c.b)("strong",{parentName:"p"},"@zuze/schema")," (aside from the cool ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/ast#conditions"}),"conditions"),") is the ability to extend it with your own custom validators/transforms."),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Note:")," There are some special rules about using custom transforms/validators when using the ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/ast#custom-transformsvalidators"}),"AST API"),"."),Object(c.b)("h2",{id:"creating-validators"},"Creating Validators"),Object(c.b)("p",null,"Validators are simple objects ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/type-reference#validatordefinition"}),"definitions"),", the only required properties are ",Object(c.b)("inlineCode",{parentName:"p"},"name")," and ",Object(c.b)("inlineCode",{parentName:"p"},"test"),"."),Object(c.b)("p",null,"For convenience there's a ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/utilities#test"}),"helper method")," to help in creating custom tests."),Object(c.b)("p",null,"No matter what type of validator ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"#async"}),"async")," or ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"#sync"}),"sync")," the validator must return a boolean or ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/type-reference#validationerror"}),"ValidationError"),", the latter can be created using the ",Object(c.b)("inlineCode",{parentName:"p"},"createError")," method passed in to the validator function."),Object(c.b)("p",null,"The signature of a validator test looks like:"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"test(\n    value: any, \n    { \n        schema: SchemaDefinition, \n        options: ValidationOptions, \n        createError: ({message?: string or () => string, params?: object, name?: string }), \n        resolve: (optionalRef: any) => resolvedValue\n    }\n) : boolean | ValidationError | Promise<boolean | ValidationError> \n")),Object(c.b)("p",null,"To return a ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/type-reference#validationerror"}),"ValidationError"),":"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const mustBeJim = (value, {createError}) => value === 'jim' || createError();\n")),Object(c.b)("p",null,"If ",Object(c.b)("inlineCode",{parentName:"p"},"optionalRef")," is not a ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/conditions#ref"}),"ref")," then it will be returned, otherwise the resolved value will be returned:"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const myTest = (arg) => (value,{resolve}) => {\n    console.log(resolve(arg));\n};\n\nconst context = { a: 'jim' }\n\nvalidate(mixed(tests(myTest('a'))), 'some value'); // logs 'a';\nvalidate(mixed(tests(myTest(ref('$a')))), 'some value', { context } ); // logs 'jim'\n")),Object(c.b)("h3",{id:"async"},"Async"),Object(c.b)("p",null,"Async validators are trivial to create - just use async-await."),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Note:")," ",Object(c.b)("inlineCode",{parentName:"p"},"async")," validators will ",Object(c.b)("strong",{parentName:"p"},"not be run")," (a ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/utilities#warning"}),"warning")," will be logged) in the schema is being validated synchronously."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const mustBeSomethingAsync = async (value,{createError}) => {\n    try {\n        await someAsyncCall(value);\n        return true;\n    } catch(err) {\n        return createError({message:err})\n    }\n}\n")),Object(c.b)("h3",{id:"accepting-arguments"},"Accepting Arguments"),Object(c.b)("p",null,"Most validators require arguments to function correct like:"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"min(10);\nbetween(10,15);\noneOf(['a','b',ref('fieldA')])\n")),Object(c.b)("p",null,"To create a validator that accepts arguments is straightforward:"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"\nconst containsCharater = character = test(\n    'containsCharacter',\n    (value,{createError,resolve}) => value.matches(new RegExp(resolve(character)))\n)\n\nconst context = { char: 'i' };\nmixed(tests(containsCharacter(ref('$char'))), 'jim', { context });\n")),Object(c.b)("h2",{id:"creating-transforms"},"Creating Transforms"),Object(c.b)("p",null,Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/type-reference#transformfn"}),"Transform functions")," are run in the order they have been added to a ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/type-reference#schemadefinition"}),"SchemaDefinition")," (unless strict is false). ",Object(c.b)("strong",{parentName:"p"},"@zuze/schema")," includes a lot of neat ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/transforms"}),"transforms")," by default, but in case you wanted to extend it, it's pretty easy:"),Object(c.b)(o.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const replaceAllAsWith = replaceWith => val => val.replace(/a/gi,replaceWith);\n\nconst schema = createSchema(\n    {\n        schema: 'string',\n        transforms: [['replaceAllAsWith','b']]\n    },\n    {\n        transforms: { replaceAllAsWith: () => replaceAllAsWith }\n    }\n);\ncast(schema, `Alas, it's too late!`); // 'blbs, it's too lbte!'\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const replaceAllAsWith = replaceWith => \n    val => val.replace(/a/gi,replaceWith);\n\nconst schema = string(transforms(replaceAllAsWith('b')))\ncast(schema, `Alas, it's too late!`); // 'blbs, it's too lbte!'\n"))))}b.isMDXComponent=!0},90:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}},91:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),u=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},b=function(e){var t=u(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},p=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,o=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),b=u(n),p=a,d=b["".concat(o,".").concat(p)]||b[p]||m[p]||c;return n?r.a.createElement(d,s(s({ref:t},l),{},{components:n})):r.a.createElement(d,s({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,o=new Array(c);o[0]=p;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<c;l++)o[l]=n[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},93:function(e,t,n){"use strict";var a=n(0),r=n(94);t.a=function(){var e=Object(a.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},94:function(e,t,n){"use strict";var a=n(0),r=Object(a.createContext)(void 0);t.a=r},95:function(e,t,n){"use strict";n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return f}));var a=n(0),r=n.n(a),c=n(93),o=n(90),s=n(53),i=n.n(s),l=37,u=39;var b=function(e){var t=e.lazy,n=e.block,s=e.children,b=e.defaultValue,m=e.values,p=e.groupId,d=e.className,f=Object(c.a)(),h=f.tabGroupChoices,O=f.setTabGroupChoices,j=Object(a.useState)(b),g=j[0],v=j[1];if(null!=p){var y=h[p];null!=y&&y!==g&&m.some((function(e){return e.value===y}))&&v(y)}var N=function(e){v(e),null!=p&&O(p,e)},w=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(o.a)("tabs",{"tabs--block":n},d)},m.map((function(e){var t=e.value,n=e.label;return r.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":g===t,className:Object(o.a)("tabs__item",i.a.tabItem,{"tabs__item--active":g===t}),key:t,ref:function(e){return w.push(e)},onKeyDown:function(e){!function(e,t,n){switch(n.keyCode){case u:!function(e,t){var n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()}(e,t);break;case l:!function(e,t){var n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()}(e,t)}}(w,e.target,e)},onFocus:function(){return N(t)},onClick:function(){N(t)}},n)}))),t?Object(a.cloneElement)(s.filter((function(e){return e.props.value===g}))[0],{className:"margin-vert--md"}):r.a.createElement("div",{className:"margin-vert--md"},s.map((function(e,t){return Object(a.cloneElement)(e,{key:t,hidden:e.props.value!==g})}))))},m=n(3);var p=function(e){var t=e.children,n=e.hidden,a=e.className;return r.a.createElement("div",Object(m.a)({role:"tabpanel"},{hidden:n,className:a}),t)},d=(n(91),function(e){var t=e.children,n=e.tabs,a=e.default;return r.a.createElement(b,{defaultValue:a||n[0],values:n.map((function(e){return{label:e,value:e}}))},n.map((function(e,n){return r.a.createElement(p,{key:e,value:e},t[n])})))}),f=function(e){var t=e.children,n=e.link;return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,{tabs:["ast","functional"]},t),n&&r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{target:"_blank",href:n},"Try it on CodeSandbox!"),r.a.createElement("hr",null),r.a.createElement("br",null)))}}}]);