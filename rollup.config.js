import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import virtual from '@baleada/rollup-plugin-virtual'
import createFilesToIndex from '@baleada/source-transform-files-to-index'

const utilIndexTest = ({ id }) => /src\/util\/[^\/]+.(?:js|vue)$/.test(id),
      utilFilesToIndex = createFilesToIndex({ test: utilIndexTest })

export default [
  {
    external: [
      'markdown-it-container',
      '@baleada/logic',
      /@baleada\/vue-prose/,
      /@babel\/runtime/,
    ],
    input: 'src/index.js',
    output: [
      { file: 'lib/index.js', format: 'cjs' },
      { file: 'lib/index.esm.js', format: 'esm' },
    ],
    plugins: [
      nodeResolve(),
      virtual({
        test: ({ id }) => id.endsWith('src/util'),
        transform: utilFilesToIndex,
      }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
      }),
    ]
  },
  // {
  //   input: 'src/index.js',
  //   output: [
  //     { file: 'tests/fixtures/index.js', format: 'cjs' },
  //   ],
  //   plugins: [
  //     nodeResolve(),
  //     virtual({
  //       test: ({ id }) => id.endsWith('src/util'),
  //       transform: utilFilesToIndex,
  //     }),
  //     babel({
  //       exclude: 'node_modules/**',
  //       babelHelpers: 'runtime',
  //     }),
  //   ]
  // }
]
