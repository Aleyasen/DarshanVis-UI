import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory, browserHistory} from 'react-router';
import './Login.scss';
import MainContainer from '../MainContainer';
import {render} from 'react-dom';
// import rr from '../../route/Route';


var Login = React.createClass({

  componentDidMount: function () {
  },

  componentWillUnmount: function () {
  },

  handleLogin: function (e) {
    e.preventDefault();
    // browserHistory.push('/app');
    ReactDOM.render(<MainContainer />, document.getElementById("app"));
  },

  render: function () {
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.handleLogin}>
          <h2 className="form-signin-heading">Please sign in</h2>
          <label for="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
          <label for="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    );
  }
});


export default Login;
