const React = require('react');

const Header = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
  getDefaultProps() {
    return {
      status: 'disconected',
    };
  },
  render() {
    return (
      <header className="row">
        <div className="col-xs-10">
          <h1>{this.props.title}</h1>
        </div>
        <div className="col-xs-2">
          <span id="connection-status" className={this.props.status}></span>
        </div>
      </header>
    );
  },
});

module.exports = Header;
