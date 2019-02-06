const fs = require('fs-extra');
const download = require('../helpers/download');
const { join } = require('path');

module.exports = {
  name: 'download',
  run: function(opts) {
    let { msg, vars } = opts;
    let url = vars[0];
    if (!url.includes('https') && !url.includes('http')) url = `https://${url}`;
    vars.shift();
    let arr = url.split('/');
    let fn = vars[0] || arr[arr.length - 1];
    let options = vars.join(' ');
    msg.delete().then(() => {
      let dir = join(__dirname, '../', 'downloads');
      fs.ensureDir(dir, err => {
        if (err) throw err;
        download(url, join(dir, fn), () => {});
      });
    });
  }
};
