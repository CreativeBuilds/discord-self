const fs = require('fs');

module.exports = {
  name: 'addChannel',
  run: function(opts) {
    let { msg, DNDByPass, NotifiableChannels } = opts;
    let id = msg.channel.id;
    if (!NotifiableChannels[id]) {
      NotifiableChannels[id] = true;
      fs.writeFile(
        join(__dirname, 'helpers', 'NotifiableChannels.json'),
        JSON.stringify(NotifiableChannels),
        err => {
          if (err) return console.error(err);
          DNDByPass.update();
        }
      );
    }

    msg.delete();
  }
};
