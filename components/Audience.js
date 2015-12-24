import React from 'react';

class Audience extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<h2>Audience: {this.props.state.title}</h2>);
  }
}

Audience.propTypes = {
  state: React.PropTypes.object,
};

export default Audience;
