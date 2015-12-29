import React from 'react';
import { BarChart } from 'react-d3';
import Display from './parts/Display';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.barGraphData = this.barGraphData.bind(this);
  }
  barGraphData(results) {
    const data = [{
      name: 'Answers',
      values: null,
    }];
    data[0].values = Object.keys(results).map(function getObject(choice) {
      return {
        x: choice,
        y: results[choice],
      };
    });
    return data;
  }
  render() {
    return (
      <div id="scoreboard">
        <Display if={this.props.state.status === 'connected' && this.props.state.currentQuestion.q !== undefined}>
          <BarChart data={this.barGraphData(this.props.state.results)} title={this.props.state.currentQuestion.q} width={window.innerWidth * 0.9} height={window.innerHeight * 0.6} />
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
  emit: React.PropTypes.func,
};

export default Board;
