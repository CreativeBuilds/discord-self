'use strict';

const { h, Component, Color } = require('ink');
const PropTypes = require('prop-types');
const TextInput = require('ink-text-input');
var respawn = require('respawn');
const simpleGit = require('simple-git')(__dirname);
const { join } = require('path');
var clear = require('clear');
const dateSince = require('date-since').default;
clear();

var monitor = respawn(['node', join(__dirname, '../src', 'index.js')], {
  name: 'discord', // set monitor name
  env: { ENV_VAR: 'test' }, // set env vars
  cwd: '.', // set cwd
  maxRestarts: 10, // how many restarts are allowed within 60s or -1 for infinite restarts
  sleep: 1000, // time to sleep between restarts,
  kill: 1000 // wait 30s before force killing after stopping
});

class UI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalMsgs: 0,
      totalEditedMsgs: 0,
      yourMsgs: 0,
      yourEditedMsgs: 0,
      timesRestarted: 0,
      errors: 0,
      timeAlive: Date.now(),
      alive: true,
      totalTimeAlive: Date.now(),
      status: 'Online',
      seconds: 1
    };
    this.handleChange = e => {
      if (e === ' ') {
        this.setState({ i: this.state.i + 1 });
      }
    };
    this.handleSubmit = () => {};
    this.componentDidMount = () => {
      monitor.on('crash', () => {
        this.setState({ errors: this.errors + 1 });
      });

      monitor.on('stdout', data => {
        let json = JSON.stringify(data);
        let bufferOriginal = Buffer.from(JSON.parse(json).data);
        let str = bufferOriginal.toString('utf8');
        if (str.includes('msgup')) {
          this.setState({ totalMsgs: this.state.totalMsgs + 1 });
        } else if (str.includes('yourmsg')) {
          this.setState({ yourMsgs: this.state.yourMsgs + 1 });
        } else if (str.includes('yourmsgeditup')) {
          this.setState({ yourEditedMsgs: this.state.yourEditedMsgs + 1 });
        } else if (str.includes('msgedit')) {
          this.setState({ totalEditedMsgs: this.state.totalEditedMsgs + 1 });
        }
      });

      monitor.on('stderr', data => {
        let json = JSON.stringify(data);
        let bufferOriginal = Buffer.from(JSON.parse(json).data);
        let str = bufferOriginal.toString('utf8');
        this.setState({ errors: this.state.errors + 1 });
      });

      monitor.on('exit', (code, signal) => {
        monitor.stop();
      });

      monitor.on('stop', () => {
        this.setState({ alive: false, status: 'Offline' });
        simpleGit.pull(() => {
          setTimeout(() => {
            this.setState({
              timesRestarted: this.state.timesRestarted + 1,
              alive: true,
              status: 'Online',
              timeAlive: Date.now()
            });
            monitor.start();
          }, 3000);
        });
      });

      this.interval = setInterval(() => {
        this.setState({ seconds: this.state.seconds + 1 });
      }, 1000);

      monitor.start();
    };
  }

  render() {
    return (
      <div>
        <Color hex="#f4f4f0">----------- </Color>
        <Color hex="#f4f4f0">Creative's Discord Bot </Color>
        <Color hex="#f4f4f0">-----------</Color>
        <br />
        <Color hex="#f4f4f0">Total Messages: {this.state.totalMsgs}</Color>
        <br />
        <Color hex="#f4f4f0">
          Total Edited Messages: {this.state.totalEditedMsgs}
        </Color>
        <br />
        <Color hex="#f4f4f0">Your Messages: {this.state.yourMsgs}</Color>
        <br />
        <Color hex="#f4f4f0">
          Your Edited Messages: {this.state.yourEditedMsgs}
        </Color>
        <br />
        <Color hex="#f4f4f0">Times Restarted: </Color>
        <Color
          red={this.state.timesRestarted > 0}
          green={this.state.timesRestarted === 0}
        >
          {this.state.timesRestarted}
        </Color>
        <br />

        <Color hex="#f4f4f0">Time Alive: </Color>
        <Color green={this.state.alive} red={!this.state.alive}>
          {this.state.alive ? dateSince(this.state.timeAlive) : '0 Seconds'}
        </Color>
        <br />
        {this.state.timeAlive !== this.state.totalTimeAlive ? (
          <div>
            <Color hex="#f4f4f0">Total Time Since Start: </Color>
            <Color green={this.state.alive} red={!this.state.alive}>
              {this.state.alive
                ? dateSince(this.state.totalTimeAlive)
                : '0 Seconds'}
            </Color>
          </div>
        ) : null}
        <Color hex="#f4f4f0">Status: </Color>
        <Color green={this.state.alive} red={!this.state.alive}>
          {this.state.status}
        </Color>
        <br />
        <Color hex="#f4f4f0">
          ----------------------------------------------
        </Color>
      </div>
    );
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      // this.setState({
      // 	i: this.state.i + 1
      // });
    }, 1);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}

UI.propTypes = {
  name: PropTypes.string
};

UI.defaultProps = {
  name: 'Ink'
};

module.exports = UI;
