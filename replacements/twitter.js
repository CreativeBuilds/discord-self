const config = require('../config.json');
module.exports = {
  name: 'twitter',
  onReplacement: function(msg, cb) {
    if (typeof msg === 'function') cb = msg;
    if (!cb) return;
    cb();
  },
  replacement: function(vars) {
    if (!vars)
      return config.defaultTwitterLink || 'https://twitter.com/creativebuilds';
    return `https://twitter.com/${vars}`;
  }
};
