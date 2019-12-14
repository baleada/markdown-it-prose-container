const generateIndex = require('./generateIndex'),
      babelify = require('./babelify')

function prepare () {
  generateIndex('./src/util')
  babelify()
}

prepare()
