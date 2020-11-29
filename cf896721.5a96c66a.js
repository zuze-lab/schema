(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{83:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return c})),t.d(n,"rightToc",(function(){return s})),t.d(n,"default",(function(){return b}));var a=t(3),r=t(7),i=(t(0),t(91)),o={id:"type-reference",title:"Type Reference",sidebar_label:"Type Reference"},c={unversionedId:"type-reference",id:"type-reference",isDocsHomePage:!1,title:"Type Reference",description:"SchemaDefinition",source:"@site/docs/typeref.md",slug:"/type-reference",permalink:"/schema/docs/type-reference",editUrl:"https://github.com/zuze-lab/schema/edit/master/website/docs/typeref.md",version:"current",sidebar_label:"Type Reference",sidebar:"someSidebar",previous:{title:"AST",permalink:"/schema/docs/ast"}},s=[{value:"SchemaDefinition",id:"schemadefinition",children:[]},{value:"ValidationError",id:"validationerror",children:[]},{value:"ValidatorDef",id:"validatordef",children:[]},{value:"ValidationOptions",id:"validationoptions",children:[]},{value:"TransformFn",id:"transformfn",children:[]},{value:"ConditionDef",id:"conditiondef",children:[]},{value:"ValidatorOptions",id:"validatoroptions",children:[]},{value:"AST",id:"ast",children:[{value:"AST",id:"ast-1",children:[]},{value:"ASTFn",id:"astfn",children:[]},{value:"ASTCondition",id:"astcondition",children:[]},{value:"ObjectAST",id:"objectast",children:[]},{value:"ASTRef",id:"astref",children:[]},{value:"ASTMatchesOptions",id:"astmatchesoptions",children:[]},{value:"ASTSchemaOptions",id:"astschemaoptions",children:[]},{value:"ASTCustomValidator",id:"astcustomvalidator",children:[]},{value:"ASTCustomTransform",id:"astcustomtransform",children:[]}]}],l={rightToc:s};function b(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"schemadefinition"},"SchemaDefinition"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    default: any | () => any;\n    meta: any | () => any;\n    label: string | () => string;\n    typeError: string | () => string; // error message/message function on validation if value cannot be coerced\n    test: ValidatorDef[]; // validations to be run\n    transform: TransformFn[]; // transforms applied (usually to coerce values)\n    condition: ConditionDef[]; // conditions that can be used to modify a schema\n    nullable: boolean; // whether or not null is an acceptable value for this schema\n}\n")),Object(i.b)("h2",{id:"validationerror"},"ValidationError"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    name: 'ValidationError';\n    value: any; // value being validated\n    path: string; // path at which the error occurred\n    type: string; // validator name\n    message: string;\n    inner: ValidationError[]; // when more than one ValidationError occurred\n}\n")),Object(i.b)("h2",{id:"validatordef"},"ValidatorDef"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    // name of validator\n    name: string;\n\n    // the test\n    test: (value: any, {schema: SchemaDefinition, options: ValidationOptions}) => boolean | ValidationError | Promise<boolean | ValidationError>;\n\n    // error message if the test fails\n    message?: string | (params: object) => string;\n\n    // whether multiple of tests with this name should be run\n    exclusive?: boolean;\n    // pre-validation check to see if validator is applicable to the current schema/value\n    check?: (value: any, schema: SchemaDefinition) => boolean \n}\n")),Object(i.b)("h2",{id:"validationoptions"},"ValidationOptions"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    context: object = {};\n    contextPrefix: string = '$'; // access refs by prefixing them with this character\n    abortEarly: boolean = true; // stops synchronous schemas \n    strict: boolean = false; // if true, transforms will not be run\n    recursive: boolean = true; // validate inner schemas (relevant to array/object schemas)\n    messages: object = defaultValidationMessages;\n}\n")),Object(i.b)("h2",{id:"transformfn"},"TransformFn"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"(\n    value: any, \n    originalValue: any, \n    { schema: SchemaDefintion, options: ValidationOptions }\n) => any\n")),Object(i.b)("h2",{id:"conditiondef"},"ConditionDef"),Object(i.b)("p",null,"Note, this is different than the ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/ast#astcondition"}),"ASTCondition")),Object(i.b)("p",null,"In practice, the ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/schema/docs/utilities#condition"}),"when/condition")," function is used to generate this:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    resolve: (...args,schema: SchemaDefinition) => SchemaDefinition\n    refs: [ ...dependencies: string[] ]\n}\n")),Object(i.b)("h2",{id:"validatoroptions"},"ValidatorOptions"),Object(i.b)("p",null,"The final object argument that can be passed to most validator functions:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    name?: string;\n    params?: object;\n    message?: string | (params: object) => string;\n}\n")),Object(i.b)("h2",{id:"ast"},"AST"),Object(i.b)("p",null,"Types for constructing schemas using the AST syntax:"),Object(i.b)("h3",{id:"ast-1"},"AST"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    schema: 'mixed' | 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array';\n    default: any;\n    tests: ASTFn[];\n    transforms: ASTFn[];\n    conditions: ASTCondition[];\n    meta: any;\n    label: string;\n    shape: ObjectAST;\n    of: AST;\n    nullable: boolean;\n    typeError: string;\n}\n")),Object(i.b)("h3",{id:"astfn"},"ASTFn"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"string | [string, ...args: any[]]\n")),Object(i.b)("h3",{id:"astcondition"},"ASTCondition"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    when: ObjectAST | ObjectAST[];\n    then?: Partial<AST>;\n    otherwise: Partial<AST>\n}\n")),Object(i.b)("h3",{id:"objectast"},"ObjectAST"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    [fieldName: string]: AST | AST[],\n    ...\n}\n")),Object(i.b)("h3",{id:"astref"},"ASTRef"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    ref: string\n}\n")),Object(i.b)("h3",{id:"astmatchesoptions"},"ASTMatchesOptions"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    how?: 'all',\n    // returns boolean | Promise<boolean> only when all provided schemas are true\n    // default is undefined\n    ...ASTSchemaOptions\n}\n")),Object(i.b)("h3",{id:"astschemaoptions"},"ASTSchemaOptions"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n    validators?: {\n        [key: string]: ASTCustomValidator,\n        ...\n    },\n    transforms?: {\n        [key: string]: ASTCustomTransform,\n        ...\n    },\n    ...ValidationOptions\n}\n")),Object(i.b)("h3",{id:"astcustomvalidator"},"ASTCustomValidator"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"(options: ASTSchemaOptions) => (...args: any[]) => ValidatorDefinition \n")),Object(i.b)("h3",{id:"astcustomtransform"},"ASTCustomTransform"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"(options: ASTSchemaOptions) => (...args: any[]) => TransformFn;\n")))}b.isMDXComponent=!0},91:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return m}));var a=t(0),r=t.n(a);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=r.a.createContext({}),b=function(e){var n=r.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},d=function(e){var n=b(e.components);return r.a.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},u=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=b(t),u=a,m=d["".concat(o,".").concat(u)]||d[u]||p[u]||i;return t?r.a.createElement(m,c(c({ref:n},l),{},{components:t})):r.a.createElement(m,c({ref:n},l))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=u;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=t[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);