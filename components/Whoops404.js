import React from 'react';
import { Link } from 'react-router';

class Whoops404 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="not-found">
        <h1>Whoops...</h1>
        <h3>These Are Not the Routes You Are Looking For</h3>
        <p>Where you looking for one of these:</p>
        <Link to="/">Join as Audience</Link>
        <Link to="/speaker">Start the presentation</Link>
        <Link to="/board">View the board</Link>
      </div>
    );
  }
}

Whoops404.propTypes = {
  state: React.PropTypes.object,
};

export default Whoops404;
