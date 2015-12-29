import React from 'react';
import Display from './parts/Display';
import Join from './parts/Join';

class Audience extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Display if={this.props.state.status === 'connected'}>

          <Display if={this.props.state.member.name !== undefined}>

            <Display if={this.props.state.currentQuestion === false}>
              <h2>Welcome {this.props.state.member.name} </h2>
              <p>{this.props.state.audience.length} audience members connected</p>
              <p>Questions will appear here.</p>
            </Display>

            <Display if={this.props.state.currentQuestion !== undefined}>
              <h2>{this.props.state.currentQuestion.q}</h2>
            </Display>

          </Display>

          <Display if={this.props.state.member.name === undefined}>
            <h2>Join the session</h2>
            <Join emit={this.props.emit}/>
          </Display>

        </Display>
      </div>
    );
  }
}

Audience.propTypes = {
  state: React.PropTypes.object,
  emit: React.PropTypes.func,
};

export default Audience;
