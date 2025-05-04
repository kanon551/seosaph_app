// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 100,
  endOfLine: 'auto', // Ensures consistent line endings
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
}

export default config
