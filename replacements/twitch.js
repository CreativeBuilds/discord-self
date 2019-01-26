module.exports = {
  name: 'twitch',
  onReplacement: function(msg, cb) {
    if (typeof msg === 'function') cb = msg;
    if (!cb) return;
    cb();
  },
  replacement: function(vars) {
    if (!vars) return 'https://twitch.tv/creativebuilds';
    return `https://twitch.tv/${vars}`;
  }
};
