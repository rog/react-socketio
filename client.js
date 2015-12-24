import React from 'react';
import { Router, Route } from 'react-router';
import ReactDOM from 'react-dom';

import App from './components/App';
import Audience from './components/Audience';
import Board from './components/Board';
import Speaker from './components/Speaker';

const routes = (
    <Route component={App}>
      <Route path="/" component={Audience} />
      <Route path="board" component={Board} />
      <Route path="speaker" component={Speaker} />
    </Route>
);

ReactDOM.render(<Router>{routes}</Router>, document.getElementById('react-container'));
