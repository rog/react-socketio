import React from 'react';

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (this.props.if) ? <div>{this.props.children}</div> : null;
  }
}

Display.propTypes = {
  if: React.PropTypes.bool,
  children: React.PropTypes.node,
};


export default Display;
