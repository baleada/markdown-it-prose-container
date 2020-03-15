const generateIndex = require('./generateIndex'),
      rollup = require('./rollup')

function prepare () {
  generateIndex('./src/markdown-it/util')
  rollup('markdown-it')
}

prepare()
