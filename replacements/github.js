const config = require('../config.json');
module.exports = {
  name: 'github',
  onReplacement: function(msg, cb) {
    if (typeof msg === 'function') cb = msg;
    if (!cb) return;
    cb();
  },
  replacement: function(vars) {
    if (!vars)
      return config.defaultGithub || 'https://github.com/creativebuilds';
    if (vars) {
      return `https://github.com/${vars}`;
    }
  }
};
