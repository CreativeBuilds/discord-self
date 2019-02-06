var respawn = require('respawn');
const simpleGit = require('simple-git')(__dirname);

var monitor = respawn(['node', 'index.js'], {
  name: 'discord', // set monitor name
  env: { ENV_VAR: 'test' }, // set env vars
  cwd: '.', // set cwd
  maxRestarts: 10, // how many restarts are allowed within 60s or -1 for infinite restarts
  sleep: 1000, // time to sleep between restarts,
  kill: 1000 // wait 30s before force killing after stopping
});

monitor.on('start', () => {
  console.log('---- Monitor Started! ----', monitor.status);
});

monitor.on('crash', () => {
  console.log('---- Monitor Crashed! ----', monitor.status);
});

monitor.on('exit', (code, signal) => {
  simpleGit.pull(stuff => {
    console.log('PULLING', stuff);
    monitor.stop();
  });
});

monitor.on('stop', () => {
  console.log('---- Monitor Stopped! ----', monitor.status);
  monitor.start();
});

monitor.start();
