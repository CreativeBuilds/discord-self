var respawn = require('respawn');
const simpleGit = require('simple-git')(__dirname);
const importJsx = require('import-jsx');
const { h, render } = require('ink');

const Ui = importJsx('../components/ui');

render(h(Ui));
