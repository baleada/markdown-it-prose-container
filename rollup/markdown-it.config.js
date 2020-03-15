import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

export default {
  external: [
    'markdown-it-container',
  ],
  input: [
    'src/markdown-it/index.js',
  ],
  output: {
    dir: 'markdown-it',
    format: 'esm',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
  ]
}
