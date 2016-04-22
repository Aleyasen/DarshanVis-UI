/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';

function Filter({ children }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}

Filter.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Filter;
