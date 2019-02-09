const fs = require('fs-extra');
const download = require('../helpers/download');
const { join } = require('path');
const config = require('../config.json');

module.exports = {
  name: 'copyemoji',
  run: function(opts) {
    let { msg, vars, client } = opts;
    client.guilds.map(guild => {
      if (guild.id === config.guildid && guild.available) {
        let url = vars[0];
        if (!url.includes('https') && !url.includes('http'))
          url = `https://${url}`;
        vars.shift();
        let arr = url.split('/');
        let name = vars[0];
        if (!name) return msg.delete();
        vars.shift();
        let fn = vars[0] || arr[arr.length - 1];
        let options = vars.join(' ');
        msg.delete().then(() => {
          guild.createEmoji(url, name);
        });
      }
    });
  }
};
