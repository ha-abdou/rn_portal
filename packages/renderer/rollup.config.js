import jsx from 'acorn-jsx'
import resolve from '@rollup/plugin-node-resolve'
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.js',
  },
  external: ['@rn_portal/parser'],
  acornInjectPlugins: [jsx()],
  plugins: [
    external(),
    resolve({
      jail: path.resolve('./src'),
      extensions,
    }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'bundled',
      include: ['src/**/*'],
      comments: false,
    }),
  ],
}
