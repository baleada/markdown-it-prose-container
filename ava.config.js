export default {
  files: [ 'tests/**/*.test.js' ],
  verbose: true,
  require: [
    './tests/test-util/setup.js'
  ],
  babel: {
    compileAsTests: [
      'src/**/*.js',
      'tests/test-util/*.js',
      'tests/fixtures/*.js',
      'node_modules/@baleada/vue-prose/propsInterfaces.js',
      'node_modules/@baleada/vue-prose/loopedIdPrefix.js',
    ],
    testOptions: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              chrome: '77',
            },
          },
        ],
      ],
    }
  }
}
