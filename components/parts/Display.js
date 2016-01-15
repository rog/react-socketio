import React from 'react';

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (this.props.display) ? <div>{this.props.children}</div> : null;
  }
}

Display.propTypes = {
  display: React.PropTypes.bool,
  children: React.PropTypes.node,
};


export default Display;
