export default {
  files: [ 'tests/**/*.test.js' ],
  verbose: true,
  require: [
    './tests/test-util/setup.js'
  ],
  babel: {
    compileAsTests: [
      'lib/**/*.js',
      'src/**/*.js',
      'tests/test-util/*.js',
      'tests/fixtures/*.js',
      'node_modules/**/*.js',
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
