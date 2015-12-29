import React from 'react';
import Display from './parts/Display';
import JoinSpeaker from './parts/JoinSpeaker';
import Attendance from './parts/Attendance';
import Questions from './parts/Questions';

class Speaker extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Display if={this.props.state.status === 'connected'}>

          <Display if={this.props.state.member.name !== undefined && this.props.state.member.type === 'speaker'}>
            <h2>Welcome {this.props.state.member.name} </h2>
            <Questions questions={this.props.state.questions} emit={this.props.emit}/>
            <Attendance audience={this.props.state.audience} />
          </Display>

          <Display if={this.props.state.member.name === undefined}>
            <h2>Start the presentation</h2>
            <JoinSpeaker emit={this.props.emit}/>
          </Display>

        </Display>
      </div>
    );
  }
}

Speaker.propTypes = {
  state: React.PropTypes.object,
  emit: React.PropTypes.func,
};

export default Speaker;
