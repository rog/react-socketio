import React from 'react';

class Questions extends React.Component {
  constructor(props) {
    super(props);
  }
  addQuestion(question, i) {
    return (
      <div key={i} className="col-xs-12 col-sm-6 col-md-3">
        <span>{question.q}</span>
      </div>
    );
  }
  render() {
    return (
      <div id="questions" className="row">
        <h2>Questions</h2>
        {this.props.questions.map(this.addQuestion)}
      </div>
    );
  }
}

Questions.propTypes = {
  questions: React.PropTypes.array,
  emit: React.PropTypes.func,
};

module.exports = Questions;
