import React from 'react';

class Ask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
    };
    this.setUpChoices = this.setUpChoices.bind(this);
    this.addChoiceButton = this.addChoiceButton.bind(this);
  }
  componentWillMount() {
    this.setUpChoices();
  }
  componentWillReceiveProps() {
    this.setUpChoices();
  }
  setUpChoices() {
    const choices = Object.keys(this.props.question);
    choices.shift();
    this.setState({ choices });
  }
  addChoiceButton(choice, i) {
    const buttonTypes = ['primary', 'success', 'warning', 'danger'];
    return (
      <button key={i} className={'col-xs-12 col-sm-6 btn btn-' + buttonTypes[i]}>
        {choice}: {this.props.question[choice]}
      </button>
    );
  }
  render() {
    return (
      <div id="currentQuestions">
        <h2>{this.props.question.q}</h2>
        <div className="row">
          {this.state.choices.map(this.addChoiceButton)}
        </div>
      </div>
    );
  }
}

Ask.propTypes = {
  question: React.PropTypes.object,
  emit: React.PropTypes.func,
};

module.exports = Ask;
