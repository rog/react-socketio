/* eslint no-script-url: 0*/
import React from 'react';
import ReactDOM from 'react-dom';

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.join = this.join.bind(this);
  }
  join() {
    const memberName = ReactDOM.findDOMNode(this.refs.name).value;
    alert(`TODO: Join member ${memberName}`);
  }
  render() {
    return (
      <form action="javascript:void(0)" onSubmit={this.join}>
        <label>Full Name</label>
        <input ref="name" className="form-control" placeholder="Enter your full name" required />
        <button className="btn btn-primary">Join</button>
      </form>
    );
  }
}

Join.propTypes = {
  if: React.PropTypes.bool,
};

module.exports = Join;
