const React = require('react');
const io = require('socket.io-client');
const Header = require('./parts/Header');

const App = React.createClass({
  getInitialState() {
    return {
      status: 'disconnected',
    };
  },
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
  },
  connect() {
    this.setState({ status: 'connected' });
  },
  disconnect() {
    this.setState({ status: 'disconnected' });
  },
  render() {
    return (
      <div>
        <Header title="New Header" status={this.state.status} />
      </div>
    );
  },
});

module.exports = App;
