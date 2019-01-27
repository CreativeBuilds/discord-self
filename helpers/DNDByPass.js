// Allows for desktop notification of certain channels that match the channel id
const client = require('./Client');
const Notifier = require('./Notify');
let muted = false;
let Channels = {};
try {
  Channels = require('./NotifiableChannels.json');
} catch (err) {
  Channels = {};
}

client.on('message', msg => {
  let { channel } = msg;
  let { id } = channel;
  if (Channels[id] && msg.author.id !== client.user.id && !muted) {
    Notifier.notify({
      title: `${msg.author.username}#${msg.author.discriminator}`,
      message: msg.content
    });
  }
});

module.exports = {
  update: () => {
    Channels = require('./NotifiableChannels.json');
  },
  muteToggle: () => {
    muted = !muted;
  }
};
