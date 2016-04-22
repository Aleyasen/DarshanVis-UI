/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';

import Menu from '../Menu';
import ChartPage from '../ChartPage';

function MainContainer({params}) {
  return (
    <div className="container-fluid" style={{"paddingTop":"80px"}}>
      <div className="row">
        <div className="col-sm-2 col-md-2 sidebar">
          <Menu/>
        </div>
        <div className="col-sm-10 col-sm-offset-2 col-md-10 col-md-offset-2 main">
          <ChartPage/>
        </div>
      </div>
    </div>
  );
}

MainContainer.propTypes = {
  // children: PropTypes.element.isRequired,
};

export default MainContainer;
