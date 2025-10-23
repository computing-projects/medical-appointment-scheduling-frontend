import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.base.json',
          './tsconfig.spec.json'
        ]
      },
      globals: {
        browser: true
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin
    },
    rules: {
      // Possible Errors
      'no-console': 'warn',

      // Best Practices
      'dot-notation': 'error',
      'no-param-reassign': 'error',
      'no-unused-expressions': 'warn',
      'radix': 'warn',

      // Variables
      'no-unused-vars': 'off',
      'no-shadow': 'off',

      // Stylistic Issues
      'camelcase': 'off',
      'comma-dangle': ['error', 'never'],
      'max-len': ['warn', {
        code: 140,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true
      }],
      'operator-linebreak': ['error', 'before'],
      'padded-blocks': ['error', {
        blocks: 'never',
        classes: 'always',
        switches: 'never'
      }],
      'eol-last': 'error',
      'indent': ['error', 2],
      'space-before-function-paren': ['error','never'],
      'quotes': ['error', 'single'],
      'no-var': 'error',
      'prefer-template': 'error',
      'curly': 'error',
      'object-curly-spacing': ['error', 'always'],
      'eqeqeq': ['error', 'smart'],
      'id-blacklist': ['error', 'any', 'number', 'String', 'string', 'Boolean', 'boolean', 'Undefined', 'undefined'],
      'id-match': 'error',
      'new-parens': 'error',
      'no-async-promise-executor': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-condition': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-empty-pattern': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'semi': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-import-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-misleading-character-class': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-new-symbol': 'error',
      'no-new-wrappers': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-restricted-imports': ['error', 'rxjs/Rx'],
      'no-self-assign': 'error',
      'no-setter-return': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      'no-trailing-spaces': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unused-labels': 'error',
      'no-useless-escape': 'error',
      'no-with': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'prefer-const': 'warn',
      'quote-props': ['error', 'as-needed'],
      'require-yield': 'error',
      'spaced-comment': ['error', 'always'],
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'space-in-parens': 'error',
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',

      // TypeScript Rules
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/naming-convention': ['error', { selector: 'variable', format: ['strictCamelCase', 'snake_case', 'UPPER_CASE'] }],
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true
      }],
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-magic-numbers': ['warn', {
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignore: [-1, 0, 1]
      }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-useless-constructor': 'warn',
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/promise-function-async': ['error', { checkArrowFunctions: false }],
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/consistent-type-assertions': ['warn', { assertionStyle: 'angle-bracket' }],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/member-ordering': 'warn',
      '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error'
    }
  }
];
