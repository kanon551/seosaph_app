export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier', // Add this line
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/semi': 0,
    'react/react-in-jsx-scope': 0,
    'no-console': 0,
    'linebreak-style': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // Add this to configure Prettier
      },
    ],
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/jsx-no-constructed-context-values': 0,
    'react/function-component-definition': 0,
    'no-plusplus': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'consistent-return': 0,
    'no-trailing-spaces': 'error', // Add this line
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'react/button-has-type': 0,
    'react/no-unstable-nested-components': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    'react/display-name': 0,
    'no-nested-ternary': 0,
    'react/jsx-no-useless-fragment': 0,
    'no-restricted-syntax': 0,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
    'no-unsafe-optional-chaining': 0,
    '@typescript-eslint/no-shadow': 0,
    'react/require-default-props': 0,
    'react/destructuring-assignment': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['draft'] }],
  },
}
