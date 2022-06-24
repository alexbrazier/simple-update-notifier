const ts = require('rollup-plugin-ts');

const output = {
  format: 'cjs',
  file: './build/index.js',
  exports: 'default',
};

const plugins = [ts()];

module.exports = {
  input: './src/index.ts',
  output,
  plugins,
};
