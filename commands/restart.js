const fs = require('fs');

module.exports = {
  name: 'restart',
  run: function(opts) {
    let { msg } = opts;
    msg.delete().then(() => {
      process.exit(0);
    });
  }
};
