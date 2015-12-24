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
            <h1>Welcome {this.props.state.member.name} </h1>
            <p>Questions will appear here.</p>
          </Display>

          <Display if={this.props.state.member.name === undefined}>
            <h1>Join the session</h1>
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
