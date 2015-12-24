const React = require('react');
const io = require('socket.io-client');
const Header = require('./parts/Header');

const App = React.createClass({
  getInitialState() {
    return {
      status: 'disconnected',
      title: '',
    };
  },
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
  },
  connect() {
    this.setState({ status: 'connected' });
  },
  disconnect() {
    this.setState({ status: 'disconnected' });
  },
  welcome(serverState) {
    this.setState({ title: serverState.title });
  },
  render() {
    return (
      <div>
        <Header title={this.state.title} status={this.state.status} />
      </div>
    );
  },
});

module.exports = App;
