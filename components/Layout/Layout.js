/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import './Layout.scss';
import Navigation from '../Navigation';
import MainContainer from '../MainContainer';

function Layout({ children }) {
  return (
    <div className="Layout">
      <Navigation />
      <MainContainer />
      {children}
    </div>
  );
}

Layout.propTypes = {
  // children: PropTypes.element.isRequired,
};

export default Layout;
