/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';

import Menu from '../Menu';
import ChartPage from '../Charts/SimpleChart';
// import ChartPage from '../Charts/ChartTimeBreakDown';


function MainContainer({params}) {
  return (
    <div className="container-fluid" style={{"paddingTop":"80px"}}>
      <div className="row">
        <div className="col-sm-3 col-md-3">
          <Menu/>
        </div>
        <div className="col-sm-9 col-md-9">
          <ChartPage/>
          <div id="chart-config" hidden>
            <select id="chart-config-sel-x">
            </select>

            <select id="chart-config-sel-y">
            </select>

            <br></br>

            <select id="chart-config-sel-x-scale">
              <option value="logarithmic">Logarithmic</option>
              <option value="linear">Linear</option>
            </select>

            <select id="chart-config-sel-y-scale">
              <option value="logarithmic">Logarithmic</option>
              <option value="linear">Linear</option>
            </select>

            <button id="chart-config-button">Configure Chart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

MainContainer.propTypes = {
  // children: PropTypes.element.isRequired,
};

export default MainContainer;
