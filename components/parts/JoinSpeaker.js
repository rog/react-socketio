/* eslint no-script-url: 0*/
import React from 'react';
import ReactDOM from 'react-dom';

class JoinSpeaker extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }
  start() {
    const name = ReactDOM.findDOMNode(this.refs.name).value;
    const title = ReactDOM.findDOMNode(this.refs.title).value;
    this.props.emit('start', { name, title });
  }
  render() {
    return (
      <form action="javascript:void(0)" onSubmit={this.start}>
        <label>Full Name</label>
        <input ref="name" className="form-control" placeholder="Enter your full name" required />
        <label>Presentation Title</label>
        <input ref="title" className="form-control" placeholder="Enter the title of the presentation" required />
        <button className="btn btn-primary">Start</button>
      </form>
    );
  }
}

JoinSpeaker.propTypes = {
  emit: React.PropTypes.func,
};

module.exports = JoinSpeaker;
