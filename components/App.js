import React from 'react';
import io from 'socket.io-client';
import Header from './parts/Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'disconnected',
      title: '',
      speaker: '',
      member: {},
      audience: [],
      questions: [],
      currentQuestion: {},
      results: {},
    };
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateAudience = this.updateAudience.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.joined = this.joined.bind(this);
    this.start = this.start.bind(this);
    this.emit = this.emit.bind(this);
    this.ask = this.ask.bind(this);
  }
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('start', this.start);
    this.socket.on('welcome', this.updateState);
    this.socket.on('end', this.updateState);
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
    this.socket.on('ask', this.ask);
    this.socket.on('results', this.updateResults);
  }
  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  }
  connect() {
    const member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
    if (member && member.type === 'audience') {
      this.emit('join', member);
    } else if (member && member.type === 'speaker') {
      this.emit('start', { name: member.name, title: sessionStorage.title });
    }
    this.setState({ status: 'connected' });
  }
  disconnect() {
    this.setState({
      status: 'disconnected',
      title: 'disconnected',
      speaker: '',
    });
  }
  updateState(serverState) {
    this.setState(serverState);
  }
  joined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({ member });
  }
  updateAudience(audience) {
    this.setState({ audience });
  }
  start(presentation) {
    if (this.state.member.type === 'speaker') {
      sessionStorage.title = presentation.title;
    }
    this.setState(presentation);
  }
  ask(question) {
    sessionStorage.removeItem('answer');
    this.setState({ currentQuestion: question });
  }
  updateResults(results) {
    this.setState({ results });
  }
  render() {
    return (
      <div>
        <Header {...this.state} />
        {React.cloneElement(this.props.children, { state: this.state, emit: this.emit })}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
