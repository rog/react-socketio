import React from 'react';
import Display from './Display';

class Ask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      answer: undefined,
    };
    this.setUpChoices = this.setUpChoices.bind(this);
    this.addChoiceButton = this.addChoiceButton.bind(this);
    this.select = this.select.bind(this);
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
    this.setState({
      choices,
      answer: sessionStorage.answer,
    });
  }
  select(choice) {
    this.setState({ answer: choice });
    sessionStorage.answer = choice;
    this.props.emit('answer', {
      question: this.props.question,
      choice,
    });
  }
  addChoiceButton(choice, i) {
    const buttonTypes = ['primary', 'success', 'warning', 'danger'];
    return (
      <button
        key={i}
        onClick={this.select.bind(null, choice)}
        className={`col-xs-12 col-sm-6 btn btn-${buttonTypes[i]}`}
      >
        {choice}: {this.props.question[choice]}
      </button>
    );
  }
  render() {
    return (
      <div id="currentQuestions">
        <Display display={this.state.answer !== undefined}>
          <h3>You answered: {this.state.answer}</h3>
          <p>{this.props.question[this.state.answer]}</p>
        </Display>
        <Display display={this.state.answer === undefined}>
          <h2>{this.props.question.q}</h2>
          <div className="row">
            {this.state.choices.map(this.addChoiceButton)}
          </div>
        </Display>
      </div>
    );
  }
}

Ask.propTypes = {
  question: React.PropTypes.object,
  emit: React.PropTypes.func,
};

export default Ask;
