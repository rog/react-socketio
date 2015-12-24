import React from 'react';

class Speaker extends React.Component {
  render() {
    return (<h2>Speaker: {this.props.state.status}</h2>);
  }
}

Speaker.propTypes = {
  state: React.PropTypes.object,
};

export default Speaker;
