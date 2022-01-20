import jsx from 'acorn-jsx'
import resolve from '@rollup/plugin-node-resolve'
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import fs from 'fs'

const packageJson = JSON.parse(fs.readFileSync(path.resolve('package.json')).toString())

const input = path.resolve(packageJson.main)
const outputFile = path.resolve('dist/index.js')

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default async () => ({
  input,
  output: {
    file: outputFile,
  },
  acornInjectPlugins: [jsx()],
  plugins: [
    resolve({
      jail: path.resolve('./src'),
      extensions,
    }),
    commonjs(),
    babel({
      configFile: path.resolve(__dirname, '.babelrc'),
      extensions,
      babelHelpers: 'bundled',
      include: ['src/**/*'],
      comments: false,
    }),
  ],
})
