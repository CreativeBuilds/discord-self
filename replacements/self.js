module.exports = {
  name: 'self',
  onReplacement: function(msg, cb) {
    if (typeof msg === 'function') cb = msg;
    if (!cb) return;
    cb();
  },
  replacement: function(vars) {
    return `https://github.com/CreativeBuilds/discord-self`;
  }
};
