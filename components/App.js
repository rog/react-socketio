import React from 'react';
import io from 'socket.io-client';
import Header from './parts/Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'disconnected',
      title: '',
      member: {},
    };
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.welcome = this.welcome.bind(this);
    this.joined = this.joined.bind(this);
    this.emit = this.emit.bind(this);
  }
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
    this.socket.on('joined', this.joined);
  }
  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  }
  connect() {
    this.setState({ status: 'connected' });
  }
  disconnect() {
    this.setState({ status: 'disconnected' });
  }
  welcome(serverState) {
    this.setState({ title: serverState.title });
  }
  joined(member) {
    this.setState({ member });
  }
  render() {
    return (
      <div>
        <Header title={this.state.title} status={this.state.status} />
        {React.cloneElement(this.props.children, { state: this.state, emit: this.emit })}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
