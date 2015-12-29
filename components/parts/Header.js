import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="row">
        <div className="col-xs-10">
          <h1>{this.props.title}</h1>
          <p>{this.props.name}</p>
        </div>
        <div className="col-xs-2">
          <span id="connection-status" className={this.props.status}></span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
};
Header.defaultProps = {
  status: 'disconnected',
};

module.exports = Header;
