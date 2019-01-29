const client = require('./helpers/Client');
const fs = require('fs');
const { join } = require('path');
const Msgs = require('./helpers/msgs');
const DNDByPass = require('./helpers/DNDByPass');
let NotifiableChannels;
try {
  NotifiableChannels = require('./helpers/NotifiableChannels.json');
} catch (err) {
  NotifiableChannels = {};
  fs.writeFile(
    join(__dirname, 'helpers', 'NotifiableChannels.json'),
    JSON.stringify(NotifiableChannels),
    err => {
      if (err) return console.error(err);
      DNDByPass.update();
    }
  );
}

const notifier = require('./helpers/Notify');
let config = require('./config.json');

let pastMsgs = {};
let replacements = {};
let commands = {};

fs.readdir(join(__dirname, 'replacements'), function(err, files) {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  files.forEach(function(file, index) {
    if (file.includes('.json')) return;
    let imported = require(`./replacements/${file}`);
    replacements[imported.name] = imported;
  });
});

fs.readdir(join(__dirname, 'commands'), (err, files) => {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  files.forEach(file => {
    if (file.includes('.json')) return;
    let imported = require(`./commands/${file}`);
    commands[imported.name] = imported;
  });
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

handleMessage = (msg, dontAddToPastMsgs) => {
  Msgs.addMsg(msg);
  if (msg.author.id === client.user.id) {
    if (!pastMsgs[msg.channel.id]) pastMsgs[msg.channel.id] = [];
    if (!dontAddToPastMsgs) {
      pastMsgs[msg.channel.id].push(msg);
    }
    if (msg.content[0] == '!') {
      let vars = msg.content.split(' ');
      command = vars.shift();
      command = command.replace(config.prefix, '');

      if (commands[command]) {
        commands[command].run({ msg, NotifiableChannels, DNDByPass, pastMsgs });
      }
    }
    if (!!msg.content.match(/\{.*?\}/g)) {
      if (msg.editable) {
        let replacers = msg.content.match(/\{.*?\}/g);
        let content = msg.content;
        replacers.forEach(item => {
          let item2 = item.replace('{', '').replace('}', '');
          let name = item2;
          let vars;
          if (item2.includes(':')) {
            name = item2.substr(0, item2.indexOf(':'));
            vars = item2.substr(item2.indexOf(':') + 1, item2.length);
          }
          if (!replacements[name]) return;
          replacements[name].onReplacement(() => {
            content = content.replace(
              item,
              replacements[name].replacement(vars)
            );
          });
        });
        if (content !== msg.content) {
          msg.edit(content);
        }
      }
    }
  }
};

client.on('message', msg => {
  handleMessage(msg);
});

client.on('messageUpdate', msg => {
  handleMessage(msg, true);
});

client.login(`${config.token}`);
