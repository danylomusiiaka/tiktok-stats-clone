module.exports = {
  parser: 'typescript',
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 150,
  plugins: [
    require.resolve(
      'prettier-plugin-tailwindcss'
    ),
  ],
  tailwindAttributes: ['className'],
};
