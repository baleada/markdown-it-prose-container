export default {
  files: [ 'tests/**/*.test.js' ],
  helpers: ['src/**/*.js', 'tests/test-util/*.js', 'tests/fixtures/*.js'],
  verbose: true,
  require: [
    './tests/test-util/setup.js'
  ],
  babel: {
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
