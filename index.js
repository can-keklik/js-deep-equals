const compare = require('./src/sorted')
const {compareUnsorted, hashUnsorted} = require('./src/unsorted')

module.exports = {
  compareUnsorted,
  hashUnsorted,
  compare
}
