/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';

import ReactDOM from 'react-dom';

var $ = require('jquery');
if (typeof document !== 'undefined') {
  require("jquery-ui");
}

function Sorting({children}) {
  return (
    <div className="modal fade" id="sorting_modal" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" style={{"width":"680px"}}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Sort</h4>
          </div>
          <div className="modal-body">
            <center>
              <div className="row" id="s-level1">
                <div className="col-md-2 form-group text-center">
                  Sort by
                </div>
                <div className="col-md-4 form-group">
                  <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">
                <i className="glyphicon glyphicon-sort-by-alphabet"></i>
            </span>
                    <select name="sort-level1" id="sort-level1" className="form-control selectpicker sortpicker">
                    </select>
                  </div>
                </div>

                <div className="col-md-4 form-group">
                  <div className="input-group">

            <span className="input-group-addon" id="basic-addon1">
                Order
            </span>
                    <select name="mode-level1" id="mode-level1" className="form-control selectpicker">
                      <option value="asc">Smallest to Largest</option>
                      <option value="desc" selected="selected">Largest to Smallest</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-2 form-group">
                  <button type="button" id="add-level2" className="btn tiny-button">
                    Add Level
                  </button>
                </div>
              </div>


              <div className="row" id="s-level2">

                <div className="col-md-2 form-group text-center">
                  <a className="remove-sotring"><i className="glyphicon glyphicon-remove"></i></a>
                  Then by
                </div>
                <div className="col-md-4 form-group">
                  <div className="input-group">

            <span className="input-group-addon" id="basic-addon1">
                <i className="glyphicon glyphicon-sort-by-alphabet"></i>
            </span>
                    <select name="sort-level2" id="sort-level2" className="form-control selectpicker sortpicker">
                    </select>
                  </div>
                </div>

                <div className="col-md-4 form-group">
                  <div className="input-group">

            <span className="input-group-addon" id="basic-addon1">
                Order
            </span>
                    <select name="mode-level2" id="mode-level2" className="form-control selectpicker">
                      <option value="asc">Smallest to Largest</option>
                      <option value="desc">Largest to Smallest</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 form-group">
                  <button type="button" id="add-level3" className="btn tiny-button">
                    Add Level
                  </button>
                </div>
              </div>


              <div className="row" id="s-level3">
                <div className="col-md-2 form-group text-center">
                  <a className="remove-sotring"><i className="glyphicon glyphicon-remove"></i></a>
                  Then by
                </div>
                <div className="col-md-4 form-group">
                  <div className="input-group">

            <span className="input-group-addon" id="basic-addon1">
                <i className="glyphicon glyphicon-sort-by-alphabet"></i>
            </span>
                    <select name="sort-level3" id="sort-level3" className="form-control selectpicker sortpicker">
                    </select>
                  </div>
                </div>

                <div className="col-md-4 form-group">
                  <div className="input-group">

            <span className="input-group-addon" id="basic-addon1">
                Order
            </span>
                    <select name="mode-level3" id="mode-level3" className="form-control selectpicker">
                      <option value="asc">Smallest to Largest</option>
                      <option value="desc">Largest to Smallest</option>
                    </select>
                  </div>
                </div>
              </div>


            </center>
          </div>
          <div className="modal-footer">
            <center>
              <button type="button" id="sorting-button" className="btn btn-default" data-dismiss="modal">OK</button>
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            </center>
          </div>
        </div>
      </div>
    </div>

  );
}

Sorting.propTypes = {
  // children: PropTypes.element.isRequired,
};


export default Sorting;
