import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    ignores: ['**.config.js', 'dist/*', 'webpack.*.js'],
  },
  {
    files: ['src/**/*.js'],
    rules: {
      semi: ['error', 'always'],

      //references
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: true,
        },
      ],
      'no-var': 'error',
      'no-new-object': 'error',
      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true,
        },
      ],
      'quote-props': [
        'error',
        'as-needed',
        {
          keywords: false,
          unnecessary: true,
          numbers: false,
        },
      ],
      'no-prototype-builtins': 'error',

      //arrays
      'no-array-constructor': 'error',
      'array-callback-return': [
        'error',
        {
          allowImplicit: true,
        },
      ],

      //destructuring
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: false,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      'no-dupe-keys': 'error',

      //strings
      quotes: [
        'error',
        'single',
        {
          avoidEscape: false,
          allowTemplateLiterals: false,
        },
      ],
      'prefer-template': 'error',
      'template-curly-spacing': 'error',
      'no-eval': 'error',
      'no-useless-escape': 'error',

      //functions
      'func-style': ['off', 'expression'],
      'func-names': 'warn',
      'wrap-iife': [
        'error',
        'outside',
        {
          functionPrototypeMethods: false,
        },
      ],
      'no-loop-func': 'error',
      'prefer-rest-params': 'error',
      'default-param-last': 'error',
      'no-new-func': 'error',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'space-before-blocks': 'error',
      'no-param-reassign': [
        'error',
        {
          props: true,
        },
      ],
      'prefer-spread': 'error',
      'function-paren-newline': ['error', 'multiline-arguments'],
      'no-dupe-args': 'error',

      //arrow functions
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'arrow-spacing': [
        'error',
        {
          before: true,
          after: true,
        },
      ],
      'arrow-parens': ['error', 'always'],
      // 'arrow-body-style': [
      //   'error',
      //   'as-needed',
      //   {
      //     requireReturnForObjectLiteral: false,
      //   },
      // ],
      'no-confusing-arrow': [
        'error',
        {
          allowParens: true,
        },
      ],
      'implicit-arrow-linebreak': ['error', 'beside'],

      //classes & constructors
      'no-useless-constructor': 'error',
      'no-dupe-class-members': 'error',
      'class-methods-use-this': [
        'error',
        {
          exceptMethods: [],
        },
      ],
      'new-parens': 'error',

      //modules
      'no-duplicate-imports': 'error',
      // "import/no-mutable-exports": "error",
      // "import/first": "error",
      'object-curly-newline': ['off'],
      // "import/no-webpack-loader-syntax": "error",
      // "import/extensions": [
      //   "error",
      //   "ignorePackages",
      //   {
      //     js: "never",
      //     mjs: "never",
      //     jsx: "never",
      //   },
      // ],

      //iterators and generators
      'no-iterator': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
          selector: 'ForOfStatement',
          message:
            'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
        },
        {
          selector: 'LabeledStatement',
          message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          selector: 'WithStatement',
          message:
            '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
      ],

      //properties
      'dot-notation': [
        'error',
        {
          allowKeywords: true,
        },
      ],
      'dot-location': ['error', 'property'],
      'prefer-exponentiation-operator': 'error',

      //variables
      'one-var': ['error', 'never'],
      'no-multi-assign': 'error',
      'no-plusplus': 'error',
      'max-len': [
        'error',
        100,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          //ignores ternary
        },
      ],
      'operator-linebreak': [
        'error',
        'before',
        {
          overrides: { '=': 'none' },
        },
      ],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],
      'no-use-before-define': [
        'error',
        {
          functions: true,
          classes: true,
          variables: true,
        },
      ],
      'no-delete-var': 'error',

      //conditionals
      'no-cond-assign': 'error',
      // "no-const-condition": "error",
      'no-duplicate-case': 'error',

      //comparison operators & equality
      eqeqeq: [
        'error',
        'always',
        {
          null: 'ignore',
        },
      ],
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': [
        'error',
        {
          defaultAssignment: false,
        },
      ],
      'no-mixed-operators': [
        'error',
        {
          groups: [
            ['%', '**'],
            ['%', '+'],
            ['%', '-'],
            ['%', '*'],
            ['%', '/'],
            ['/', '*'],
            ['&', '|', '<<', '>>', '>>>'],
            ['==', '!=', '===', '!=='],
            ['&&', '||'],
          ],
          allowSamePrecedence: false,
        },
      ],

      //blocks
      'nonblock-statement-body-position': [
        'error',
        'beside',
        {
          overrides: {},
        },
      ],
      'brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      curly: 'error',
      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],

      //comments
      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            exceptions: ['-', '+'],
            markers: ['=', '!', '/'], // space here to support sprockets directives, slash for TS /// comments
          },
          block: {
            exceptions: ['-', '+'],
            markers: ['=', '!', ':', '::'], // space here to support sprockets directives and flow comment types
            balanced: true,
          },
        },
      ],

      //whitespace
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          // MemberExpression: null,
          FunctionDeclaration: {
            parameters: 1,
            body: 1,
          },
          FunctionExpression: {
            parameters: 1,
            body: 1,
          },
          CallExpression: {
            arguments: 1,
          },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          ignoreComments: false,
        },
      ],
      'space-infix-ops': 'error',
      'eol-last': ['error', 'always'],
      'newline-per-chained-call': [
        'error',
        {
          ignoreChainWithDepth: 4,
        },
      ],
      'no-whitespace-before-property': 'error',
      'padded-blocks': [
        'error',
        {
          blocks: 'never',
          classes: 'never',
          switches: 'never',
        },
        {
          allowSingleLineBlocks: true,
        },
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
      'space-in-parens': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'block-spacing': ['error', 'always'],
      'comma-spacing': ['error', { before: false, after: true }],
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'no-trailing-spaces': [
        'error',
        {
          skipBlankLines: false,
          ignoreComments: false,
        },
      ],

      //comma
      'comma-style': [
        'error',
        'last',
        {
          exceptions: {
            ArrayExpression: false,
            ArrayPattern: false,
            ArrowFunctionExpression: false,
            CallExpression: false,
            FunctionDeclaration: false,
            FunctionExpression: false,
            ImportDeclaration: false,
            ObjectExpression: false,
            ObjectPattern: false,
            VariableDeclaration: false,
            NewExpression: false,
          },
        },
      ],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],

      //naming
      'new-cap': [
        'error',
        {
          newIsCap: true,
          newIsCapExceptions: [],
          capIsNew: false,
          capIsNewExceptions: [
            'Immutable.Map',
            'Immutable.Set',
            'Immutable.List',
          ],
        },
      ],
      camelcase: 'error',

      //type casting & coercion
      'no-new-wrappers': 'error',
      radix: 'error',

      //standard library
      'no-restricted-globals': [
        'error',
        {
          name: 'isFinite',
          message:
            'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
        },
        {
          name: 'isNaN',
          message:
            'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
        },
      ],

      //lacking from airbnb: prefer-default-export, no-undef, id-length, no-underscore-dangle
    },
  },
];
