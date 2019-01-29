module.exports = {
  name: 'vanish',
  run: function(opts) {
    let { msg, pastMsgs } = opts;
    pastMsgs[msg.channel.id].forEach((msg, index) => {
      msg.delete();
    });
    pastMsgs[msg.channel.id] = [];
  }
};
