import ts from 'rollup-plugin-ts';

const output = {
  format: 'cjs',
  file: './build/index.js',
  exports: 'default',
};

const plugins = [ts()];

const config = {
  input: './src/index.ts',
  output,
  plugins,
};

export default config;
