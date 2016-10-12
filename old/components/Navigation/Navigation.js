/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import './Navigation.scss';
import Link from '../Link';

function Navigation() {
  return (

    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                  aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#" onClick={Link.handleClick}><b>DarshanVis</b></a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#" onClick={Link.handleClick}>Home</a></li>
            <li><a href="#" onClick={Link.handleClick}>Settings</a></li>
            <li><a href="#" onClick={Link.handleClick}>Help</a></li>
            <li><a href="#" onClick={Link.handleClick}>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
