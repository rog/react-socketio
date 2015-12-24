import React from 'react';
import Display from './parts/Display';

class Audience extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Display if={this.props.state.status === 'connected'} >
          <h1>Join the session</h1>
        </Display>
      </div>
    );
  }
}

Audience.propTypes = {
  state: React.PropTypes.object,
};

export default Audience;
