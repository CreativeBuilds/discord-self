module.exports = {
  name: 'alt',
  run: function(opts) {
    let { msg, vars } = opts;
    let str = vars.join(' ');
    let split = str.split('');
    let cap = false;
    split = split.map(char => {
      if (char === ' ') return char;
      cap = !cap;
      return cap ? char.toUpperCase() : char.toLowerCase();
    });
    str = split.join('');
    msg.edit(str);
  }
};
