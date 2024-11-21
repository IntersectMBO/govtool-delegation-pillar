const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');
const postcss = require('rollup-plugin-postcss');
const alias = require('@rollup/plugin-alias');
const babel = require('@rollup/plugin-babel');
const path = require('path');
const packageJson = require('./package.json');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
  input: 'src/DelegationPillar.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    alias({
      entries: [
        {
          find: 'components',
          replacement: path.resolve(__dirname, 'src/components'),
        },
        { find: 'consts', replacement: path.resolve(__dirname, 'src/consts') },
        {
          find: 'context',
          replacement: path.resolve(__dirname, 'src/context'),
        },
        { find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks') },
        { find: 'types', replacement: path.resolve(__dirname, 'src/types') },
        { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
      ],
    }),
    resolve({ extensions, browser: true }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json', sourceMap: true }),
    postcss({
      extract: true,
      modules: true,
      use: ['sass'],
    }),
    babel({
      extensions,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
    }),
    json(),
  ],
  external: [
    'react',
    'react-dom',
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ],
};
