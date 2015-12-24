import React from 'react';
import io from 'socket.io-client';
import Header from './parts/Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'disconnected',
      title: '',
      speaker: {},
      member: {},
      audience: [],
    };
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.welcome = this.welcome.bind(this);
    this.joined = this.joined.bind(this);
    this.updateAudience = this.updateAudience.bind(this);
    this.emit = this.emit.bind(this);
  }
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
  }
  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  }
  connect() {
    const member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
    if (member) {
      this.emit('join', member);
    }
    this.setState({ status: 'connected' });
  }
  disconnect() {
    this.setState({ status: 'disconnected' });
  }
  welcome(serverState) {
    this.setState({ title: serverState.title });
  }
  joined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({ member });
  }
  updateAudience(audience) {
    this.setState({ audience });
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
