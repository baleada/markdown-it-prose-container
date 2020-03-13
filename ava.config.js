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
      'node_modules/@baleada/prose/vue/propsInterfaces.js'
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
