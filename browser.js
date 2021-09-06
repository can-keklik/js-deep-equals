var {compareUnsorted, hashUnsorted} = require('./src/unsorted')
window.jsDeepEquals = {
  compare: require('./src/sorted'),
  compareUnsorted,
  hashUnsorted
}