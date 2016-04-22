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
        <div className="col-sm-3 col-md-3">
          <Menu/>
        </div>
        <div className="col-sm-9 col-md-9">
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
