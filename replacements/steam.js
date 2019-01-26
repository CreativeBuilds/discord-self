const config = require('../config.json');
module.exports = {
  name: 'steam',
  onReplacement: function(cb) {
    if (!cb) return;
    cb();
  },
  replacement: function() {
    return config.steam;
  }
};
