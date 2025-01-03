
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./mhah-panchang.cjs.production.min.js')
} else {
  module.exports = require('./mhah-panchang.cjs.development.js')
}
