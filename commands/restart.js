const fs = require('fs');

module.exports = {
  name: 'restart',
  run: function(opts) {
    let { msg } = opts;
    process.exit(0);
  }
};
