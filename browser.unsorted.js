var {compareUnsorted, hashUnsorted} = require('./src/unsorted')
window.jsDeepEquals = {
  compareUnsorted,
  hashUnsorted
}