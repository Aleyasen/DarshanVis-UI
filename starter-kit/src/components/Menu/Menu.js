/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Menu.css';


var Menu = React.createClass({
  // getInitialState: function () {
  // },
  componentDidMount: function () {
    // this.forceUpdate();
    // showChart(10);
  }
  ,
  updateMenu: function (itemId) {
  },
  handleClick: function (e) {
    var chart_id = this.props.item.id;
    // showChart(chart_id, this);
  },
  render: function () {
    return (
      <ul className="nav nav-pills nav-stacked" role="tablist">
        <li role="presentation" className="active">
          <a href="#chart1"
             data-toggle="pill">Chart1</a>
        </li>
        <li role="presentation">
          <a href="#chart2"
             data-toggle="pill">Chart2</a>

        </li>
        <li role="presentation">
          <a href="#chart3"
             data-toggle="pill">Chart3</a>
        </li>
      </ul>
    );
  }
});


export default withStyles(s)(Menu);
