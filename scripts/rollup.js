const { exec } = require('@baleada/prepare')

module.exports = function(dependency) {
  const command = `rollup --config rollup/${dependency}.config.js`
  exec(command)
}
