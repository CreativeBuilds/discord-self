const fs = require('fs');
const opn = require('opn');

module.exports = {
  name: 'open',
  run: function(opts) {
    let { msg, vars } = opts;
    let url = vars[0];
    if (!url.includes('https') && !url.includes('http')) url = `https://${url}`;
    vars.shift();
    let options = vars.join(' ');
    msg.delete().then(() => {
      if (!url) return;
      if (options[0] === '{' && options[options.length - 1] === '}') {
        eval(`options = ${options}`);
      } else if (options === 'i') {
        options = { app: ['chrome', '--incognito'] };
      } else {
        options = {};
      }
      opn(url, options);
    });
  }
};
