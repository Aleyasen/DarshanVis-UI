/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';

function Menu({params}) {
  return (
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
      <center>
        <div class="black-link">
          <div style="font-size:110%; font-weight: bold;"></div>
        </div>
      </center>
      <div id="myfilter" style=" padding-bottom: 3px;"></div>
      <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingOne">
          <h4 class="panel-title filter-header">
            <a class="collapsed btn-block non-loc-colap" data-toggle="collapse" data-parent="#accordion"
               href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              <strong>{this.props.catname}</strong>
            </a>
          </h4>
        </div>
        <div id="collapseOne" class="panel-collapse" role="tabpanel" aria-labelledby="headingOne">
          <div class="panel-body">
            <div>
              <div class="nav filters" style="margin-top:10px; margin-bottom: 10px;">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Menu.propTypes = {
  children: PropTypes.element.isRequired,
};

var MenuRow = React.createClass({
  render: function () {
    return (
      <li style="background-color:{this.props.color}">
        <a href="index?c={this.props.id}">{this.props.label}</a>
      </li>
    );
  }
});
export default Menu;
