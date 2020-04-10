import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

export default {
  external: [
    'markdown-it-container',
  ],
  input: [
    'src/index.js',
  ],
  output: { file: 'lib/index.js', format: 'esm' },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
  ]
}
