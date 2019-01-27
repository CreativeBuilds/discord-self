const config = require('../config.json');
module.exports = {
  name: 'steam',
  onReplacement: function(msg, cb) {
    if (typeof msg === 'function') cb = msg;
    if (!cb) return;
    cb();
  },
  replacement: function(vars) {
    if (!vars)
      return (
        config.defaultSteam || 'https://steamcommunity.com/id/creativebuilds'
      );
    if (isNaN(parseInt(vars))) {
      return `https://steamcommunity.com/id/${vars}`;
    } else {
      return `http://steamcommunity.com/profiles/${vars}`;
    }
  }
};
