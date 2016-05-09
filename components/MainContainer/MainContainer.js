/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';

import Menu from '../Menu';
import ChartPage from '../Charts/SimpleChart';
import Sorting from '../Sorting';
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
          <Sorting/>
          <div id="chart-config" hidden>
            <div className="row">

              <div className="form-group col-md-3">
                <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon" data-toggle="tooltip" data-placement="left"
                       title="My Tooltip text">X</i>
                </span>
                  <select className="form-control" id="chart-config-sel-x">
                  </select>
                </div>
              </div>


              <div className="form-group col-md-3">
                <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon" data-toggle="tooltip" data-placement="left"
                       title="My Tooltip text">Y</i>
                </span>
                  <select className="form-control" id="chart-config-sel-y">
                  </select>
                </div>
              </div>
            </div>


            <div className="row">

              <div className="form-group col-md-3">
                <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon glyphicon-equalizer" data-toggle="tooltip" data-placement="left"
                       title="My Tooltip text"></i>
                </span>
                  <select className="form-control" id="chart-config-sel-x-scale">
                    <option value="logarithmic">Logarithmic</option>
                    <option value="linear">Linear</option>
                  </select>
                </div>
              </div>


              <div className="form-group col-md-3">
                <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon glyphicon-equalizer" data-toggle="tooltip" data-placement="left"
                       title="My Tooltip text"></i>
                </span>
                  <select className="form-control" id="chart-config-sel-y-scale">
                    <option value="logarithmic">Logarithmic</option>
                    <option value="linear">Linear</option>
                  </select>
                </div>
              </div>

              <div className="form-group col-md-3">
                <button className="btn btn-inverse tiny-button" id="chart-config-button">Configure Chart
                </button>
              </div>
            </div>
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
