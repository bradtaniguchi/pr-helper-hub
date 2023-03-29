/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  entryPoints: ['./src/index.ts'],
  tsconfig: './tsconfig.json',
  out: '../../dist/docs/common',
  readme: './README.md',
};
