const client = require('./Client');

let msgs = {};
let myMsgs = {};
let totalMsgs = 0;
let myTotalMsgs = 0;

module.exports = {
  msgs: msgs,
  addMsg: function(msg) {
    if (!msg) return;
    let id = msg.channel.id;
    if (!msgs[id]) msgs[id] = [];
    msgs[id].push(msg);
    totalMsgs++;
    if (msg.author == client.id) {
      // The author is the user
      if (!myMsgs[id]) myMsgs[id] = [];
      myMsgs[id].push(msg);
      myTotalMsgs++;
    }
  },
  //   getMyMsgsInChannel: function(channelID){
  //       if(!channelID) return;
  //       if(myMsgs[channelID]) return;
  //   },
  msgCount: myTotalMsgs,
  totalMsgsForChannel: function(channelID) {
    if (!channelID) return;
    if (!msgs[channelID]) msgs[channelID] = [];
    return msgs[channelID].length;
  }
};
