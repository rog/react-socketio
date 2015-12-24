import React from 'react';

class Board extends React.Component {
  render() {
    return (<h2>Board: {this.props.state.status}</h2>);
  }
}

Board.propTypes = {
  state: React.PropTypes.object,
};

export default Board;
