import jest from 'eslint-plugin-jest'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import github from 'eslint-plugin-github'

export default [
  {
    ignores: [
      '**/dist/',
      '**/lib/',
      '**/node_modules/',
      '**/jest.config.js',
      '**/out/',
      'eslint.config.mjs'
    ]
  },
  github.getFlatConfigs().recommended,
  {
    files: ['**/*.ts'],
    ignores: ['__tests__/**/*.ts'],
    plugins: {
      jest,
      '@typescript-eslint': typescriptEslint,
      '@stylistic': stylistic
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        NodeJS: true
      },

      parser: tsParser,
      ecmaVersion: 9,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.eslint.json'
      }
    },

    rules: {
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',

      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true
        }
      ],

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public'
        }
      ],

      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-extraneous-class': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/unbound-method': 'error',
      camelcase: 'off',
      'eslint-comments/no-use': 'off',
      'github/filenames-match-regex': 'off',
      'i18n-text/no-en': 'off',
      'import/no-namespace': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off',
      semi: 'off',
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/type-annotation-spacing': 'error',
      '@typescript-eslint/no-var-requires': 'error'
    }
  },
  {
    files: ['__tests__/**/*.ts'],

    plugins: {
      jest,
      '@typescript-eslint': typescriptEslint,
      '@stylistic': stylistic
    },

    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node
      },

      parser: tsParser,
      ecmaVersion: 9,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.eslint.json'
      }
    },

    rules: {
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',

      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true
        }
      ],

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public'
        }
      ],

      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      camelcase: 'off',
      'eslint-comments/no-use': 'off',
      'filenames/match-regex': 0,
      'github/filenames-match-regex': 'off',
      'github/no-then': 'off',
      'i18n-text/no-en': 'off',
      'import/no-namespace': 'off',
      'prefer-const': 'error',
      'prefer-template': 'off',
      'no-var': 'error',
      'no-unused-vars': 'off',
      semi: 'off',
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/type-annotation-spacing': 'error',
      '@typescript-eslint/no-var-requires': 'error'
    }
  }
]
