const React = require('react');
const io = require('socket.io-client');

const App = React.createClass({
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
  },
  connect() {
    alert('Connected ' + this.socket.id);
  },
  render() {
    return (<h1>Hello world from React</h1>);
  },
});

module.exports = App;
