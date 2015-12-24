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
          <h1>Join the session</h1>
          <Join emit={this.props.emit}/>
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
