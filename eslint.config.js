import js from '@eslint/js'

import reactPlugin from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Base ignores
  {
    ignores: ['dist', 'node_modules', 'public'],
  },

  // JavaScript/TypeScript base config
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // React specific config
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React rules
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // JSX prop sorting
      'react/jsx-sort-props': [
        'error',
        {
          shorthandFirst: true,
          callbacksLast: true,
          reservedFirst: ['key', 'ref'],
        },
      ],

      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // React Compiler
      'react-compiler/react-compiler': 'error',
      'react-hooks/react-compiler': 'error',

      // Additional React rules
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-pascal-case': 'error',
      'react/self-closing-comp': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // Logical grouping
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: 'function',
        },
        { blankLine: 'always', prev: 'function', next: 'function' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  }
)
