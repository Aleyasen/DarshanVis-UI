import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory, browserHistory} from 'react-router';

import MainContainer from '../components/MainContainer';
import Login from '../components/Login';


if (typeof document !== 'undefined') {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Login}>
        <Route path="app" component={MainContainer}/>
      </Route>
    </Router>
  ), document.getElementById("app"))
}

