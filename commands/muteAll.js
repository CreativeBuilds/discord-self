module.exports = {
  name: 'muteAll',
  run: function(opts) {
    let { msg, DNDByPass } = opts;
    DNDByPass.muteToggle();
    msg.delete();
  }
};
