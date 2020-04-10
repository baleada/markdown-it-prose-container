const { empty, generateIndex } = require('@baleada/prepare'),
      compile = require('./compile')

function prepare () {
  empty('lib')
  generateIndex('./src/util')
  compile()
}

prepare()
