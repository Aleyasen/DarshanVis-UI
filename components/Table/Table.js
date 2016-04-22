/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';

function Table({children}) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}

Table.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Table;
