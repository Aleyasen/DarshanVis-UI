/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';
var DateTimeField = require('react-bootstrap-datetimepicker');

function Filter({children}) {
  var numapp_placeholder = "Apps#";
  var user_placeholder = "User";
  var app_placeholder = "Application"

  return (
    <div>

      <div className="row">
        <div className="form-group col-md-4">
          <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon glyphicon-user" data-toggle="tooltip" data-placement="left"
                       title="My Tooltip text"></i>
                </span>
            <input type="text" name="numapp" className="form-control" id="numapp-typeahead" data-provide="typeahead"
                   placeholder={numapp_placeholder} autocomplete="off"/>
          </div>
        </div>

        <div className="form-group col-md-2">
          <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon glyphicon-user" data-toggle="tooltip" data-placement="left"
                       title="My Tooltip text"></i>
                </span>
            <input type="text" name="user" className="form-control" id="user-typeahead" data-provide="typeahead"
                   placeholder={user_placeholder} autocomplete="off"/>
          </div>
        </div>

        <div className="form-group col-md-3">
          <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon glyphicon-font" data-toggle="tooltip" data-placement="left"
                       title="My Tooltip text"></i>
                </span>
            <input type="text" name="application" className="form-control" id="application-typeahead"
                   data-provide="typeahead" placeholder={app_placeholder} autocomplete="off"/>

          </div>
        </div>

        <div className="form-group col-md-3">
          <DateTimeField />
        </div>
        <div className="form-group col-md-3">
          <DateTimeField />
        </div>
        <div className="col-md-1 form-group">
          <button onClick={updateChart} type="button" className="btn btn-inverse tiny-button">Update</button>
        </div>

        <div className="col-md-1 form-group">
          <button onClick={updateChart} type="button" id="sort_button_top" className="btn tiny-button" data-toggle="modal"
                  href="#sorting_modal">
            <i className="glyphicon glyphicon-sort-by-alphabet"></i>
            Sort
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-2 form-group">
          <button onClick={updateChart} style={{"fontSize": "150%"}} type="button" id="toggle-percentage"
                  className="btn tiny-button">
            %
          </button>
        </div>
      </div>
    </div>
  );
}

function updateChart(e) {
  console.log(e);
}

Filter.propTypes = {
  // children: PropTypes.element.isRequired,
};

export default Filter;
