const { exec } = require('@baleada/prepare')

module.exports = function(dependency) {
  exec(`npx babel src/${dependency} --out-file ${dependency}.js`)
}
