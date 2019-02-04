const fs = require('fs');

module.exports = {
  name: 'deleteGroups',
  run: function(opts) {
    let { msg, client, vars } = opts;
    client.channels.forEach(group => {
      if (vars.length === 0) {
        return msg.edit(
          'Command ex: !deleteGroups deleted or !deleteGroups dm'
        );
      }
      if (vars[0] === 'groups') {
        if (group.type === 'group') {
          group.delete();
        }
      } else if (vars[0] === 'deleted') {
        if (group.type === 'dm') {
          if (group.recipient.username.includes('Deleted User')) {
            group.delete();
          }
        }
      } else {
        console.log('vars', vars);
      }
    });
    msg.delete();
  }
};
