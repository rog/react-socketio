import React from 'react';
import Display from './parts/Display';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="scoreboard">
        <Display if={this.props.state.status === 'connected' && this.props.state.currentQuestion.q !== undefined}>
          <h3>{this.props.state.currentQuestion.q}</h3>
          <p>{JSON.stringify(this.props.state.results)}</p>
        </Display>
        <Display if={this.props.state.status === 'connected' && this.props.state.currentQuestion.q === undefined}>
          <h3>Awaiting a Question...</h3>
        </Display>
      </div>
    );
  }
}

Board.propTypes = {
  state: React.PropTypes.object,
};

export default Board;
