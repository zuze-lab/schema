/*! For license information please see d589d3a7.bdd7f699.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{116:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return s})),a.d(t,"rightToc",(function(){return l})),a.d(t,"default",(function(){return b}));var n=a(1),r=a(6),c=(a(0),a(122)),o=a(124),i={id:"getting-started",title:"Getting Started",sidebar_label:"Getting Started"},s={id:"getting-started",title:"Getting Started",description:"import { AstFn, ZuzeTabs } from '../src/examples/tabs';",source:"@site/docs/getting-started.md",permalink:"/schema/docs/getting-started",editUrl:"https://github.com/zuze-lab/schema/edit/master/website/docs/getting-started.md",sidebar_label:"Getting Started",sidebar:"someSidebar",next:{title:"Creating Schemas",permalink:"/schema/docs/creating-schemas"}},l=[{value:"Forward",id:"forward",children:[]},{value:"Installation",id:"installation",children:[]},{value:"Creating a Schema",id:"creating-a-schema",children:[]}],u={rightToc:l};function b(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},u,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"forward"},"Forward"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"@zuze/schema")," was created out of love and admiration for projects like ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/hapijs/joi"}),"joi"),", ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/jquense/yup"}),"yup"),", and ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/epoberezkin/ajv"}),"ajv")," which are all schema validators. Each package brings it's own strengths. The strength (I hope) that ",Object(c.b)("inlineCode",{parentName:"p"},"@zuze/schema")," brings is that it's fun to use, whether you're somebody who likes to write functional code or somebody who likes to write highly reusable configuration (who doesn't love a some good ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.reddit.com/r/ProgrammerHumor/comments/9fhvyl/writing_yaml/"}),"YAML"),"....but we use JSON.)"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"@zuze/schema")," is one package that comes in two flavors - ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Functional_programming"}),"functional")," or ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Abstract_syntax_tree"}),"ast"),"."),Object(c.b)("p",null,"Throughout these docs code examples will be presented in tabs in functional and AST form (where applicable). Pick the one that's right for you and your project!"),Object(c.b)("p",null,"More on that after the set up:"),Object(c.b)("h2",{id:"installation"},"Installation"),Object(c.b)("p",null,"Install ",Object(c.b)("strong",{parentName:"p"},"@zuze/schema")," using yarn or npm"),Object(c.b)(o.b,{tabs:["npm","yarn"],mdxType:"ZuzeTabs"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"npm install @zuze/schema\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"yarn install @zuze/schema\n"))),Object(c.b)("h2",{id:"creating-a-schema"},"Creating a Schema"),Object(c.b)("p",null,"Let's start by creating some very simple schemas:"),Object(c.b)(o.a,{mdxType:"AstFn"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { ast } from '@zuze/schema'\n\nconst { matches } = ast;\n\nmatches({ schema: 'string', tests: [['min', 10]] }, 'short'); // false\nmatches({ schema: 'string', tests: [['min', 10]] }, 'this should work'); // true            \n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { string, min, tests, isValidSync } from '@zuze/schema'\n\nconst schema = string(tests(min(10)));\n\nisValidSync(schema, 'short'); // false\nisValidSync(schema, 'this should work'); // true            \n"))))}b.isMDXComponent=!0},121:function(e,t,a){var n;!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var c=typeof n;if("string"===c||"number"===c)e.push(n);else if(Array.isArray(n)&&n.length){var o=r.apply(null,n);o&&e.push(o)}else if("object"===c)for(var i in n)a.call(n,i)&&n[i]&&e.push(i)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},122:function(e,t,a){"use strict";a.d(t,"a",(function(){return b})),a.d(t,"b",(function(){return d}));var n=a(0),r=a.n(n);function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){c(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createContext({}),u=function(e){var t=r.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i({},t,{},e)),a},b=function(e){var t=u(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=Object(n.forwardRef)((function(e,t){var a=e.components,n=e.mdxType,c=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=u(a),m=n,d=b["".concat(o,".").concat(m)]||b[m]||p[m]||c;return a?r.a.createElement(d,i({ref:t},l,{components:a})):r.a.createElement(d,i({ref:t},l))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=a.length,o=new Array(c);o[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:n,o[1]=i;for(var l=2;l<c;l++)o[l]=a[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"},124:function(e,t,a){"use strict";a.d(t,"b",(function(){return m})),a.d(t,"a",(function(){return d}));var n=a(0),r=a.n(n),c=a(121),o=a.n(c),i=a(93),s=a.n(i);const l=37,u=39;var b=function(e){const{block:t,children:a,defaultValue:c,values:i}=e,[b,p]=Object(n.useState)(c),m=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:o()("tabs",{"tabs--block":t})},i.map(({value:e,label:t})=>r.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":b===e,className:o()("tab-item",s.a.tabItem,{"tab-item--active":b===e}),key:e,ref:e=>m.push(e),onKeyDown:e=>((e,t,a)=>{switch(a.keyCode){case u:((e,t)=>{const a=e.indexOf(t)+1;e[a]?e[a].focus():e[0].focus()})(e,t);break;case l:((e,t)=>{const a=e.indexOf(t)-1;e[a]?e[a].focus():e[e.length-1].focus()})(e,t)}})(m,e.target,e),onFocus:()=>p(e),onClick:()=>p(e)},t))),r.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},n.Children.toArray(a).filter(e=>e.props.value===b)[0]))};var p=function(e){return r.a.createElement("div",null,e.children)};a(122);const m=({children:e,tabs:t,default:a})=>r.a.createElement(b,{defaultValue:a||t[0],values:t.map(e=>({label:e,value:e}))},t.map((t,a)=>r.a.createElement(p,{key:t,value:t},e[a]))),d=({children:e,link:t})=>r.a.createElement(r.a.Fragment,null,r.a.createElement(m,{tabs:["ast","functional"]},e),t&&r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{target:"_blank",href:t},"Try it on CodeSandbox!"),r.a.createElement("hr",null),r.a.createElement("br",null)))}}]);