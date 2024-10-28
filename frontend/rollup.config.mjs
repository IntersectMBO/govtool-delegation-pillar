import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import path from 'path';

const packageJson = require('./package.json');

export default [
  {
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
          {
            find: 'consts',
            replacement: path.resolve(__dirname, 'src/consts'),
          },
          {
            find: 'context',
            replacement: path.resolve(__dirname, 'src/context'),
          },
          { find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks') },
          { find: 'types', replacement: path.resolve(__dirname, 'src/types') },
          { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
        ],
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss(),
      json(),
    ],
  },
];
