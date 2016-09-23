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
import {server_url} from '../../config';
import * as utils from '../Utils';
import ReactDOM from 'react-dom';
var Chart = require('../HChart');
import TopApps  from '../TopApps';
if (typeof document !== 'undefined') {
  var $ = require('jquery');
  require("jquery-ui");
}


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

    console.log("handleClick event data:::")
    console.log(e);
    var chart_id = this.props.chartID;
    // showChart(chart_id, this);
  },
  render: function () {
    return (
      <ul className="nav nav-pills nav-stacked" role="tablist">
        <li role="presentation">
          <b>Analyze Application I/O Behavior</b>
        </li>
        <li role="presentation" className="menuitem active">
          <a href="#chart1"
             data-toggle="pill" data-chartid="17">Overview of I/O characteristics</a>
        </li>
        <li role="presentation" className="menuitem">
          <a href="#chart2"
             data-toggle="pill" data-chartid="12">Time Breakdown</a>
        </li>
        <li role="presentation" className="menuitem">
          <b>Analyze Platform I/O Workload</b>
        </li>
        <li role="presentation" className="menuitem">
          <a href="#chart3"
             data-toggle="pill" data-chartid="10">Top Applications with Highest Amount of Data Read/Written</a>
        </li>
        <li role="presentation" className="menuitem">
          <a href="#chart4"
             data-toggle="pill" data-chartid="9">Top Applications with Highest I/O Time</a>
        </li>
        <li role="presentation" className="menuitem">
          <a href="#chart5"
             data-toggle="pill" data-chartid="4">Top Applications with Highest Runtime</a>
        </li>
      </ul>
    );
  }
});

if (typeof document !== 'undefined') {
  $('.menuitem').click(function () {
    // e.preventDefault()
    var chart_id = $(this).children("a").data("chartid");
    showChart(chart_id);
  })
}

function showChart(chart_id) {
  console.log("handle click");

  $("#chart").html("<div><center>Loading...</center></div>");
  $("#chart_id_storage").val(chart_id);
  var data = {
    url: "test",
    chart: chart_id
  }

  $.ajax({
    url: server_url + '/index.php/jobs/filter',
    // url: "http://localhost/index.php/jobs/filter",
    dataType: 'json',
    type: 'POST',
    data: JSON.stringify(data),
    chart: chart_id,
    success: callback,
    error: function (xhr, status, err) {
      console.log("ERROR");
      console.log(xhr);
      console.log(status);
      console.log(err);
    }
  });
}


var callback = function (data) {
  var chart_id = this.chart;
  console.log(chart_id);
  if (chart_id == "17") {
    console.log("setting up special chart");
    utils.setup_chart_special(data);
  }
  else if (chart_id == "10" || chart_id == "9" || chart_id == "4") {
    console.log("setting up top");
    // utils.setup_top_chart(data);
    console.log(document.getElementById('chart'));
    var element = React.createElement(TopApps, {c_id: chart_id, data: data});
    ReactDOM.render(element, document.getElementById('chart'));

  }
  else {
    console.log("setting up normal");
    $("#chart-config").hide();
    var opts = utils.charts[chart_id];
    var series = utils.chart_series[chart_id];
    var queryResult = data;
    var opts_series = [];
    for (var i = 0; i < series.length; i++) {
      if (!series[i]["not-in-chart"]) {
        var attr = series[i]["attribute"];
        var qr = queryResult[attr];
        if (qr != null) {
          series[i]["data"] = [];
          for (var j = 0; j < qr.length; j++) {
            var num = Number(qr[j]);
            if (num != 0) {
              series[i]["data"].push([j, num]);
            }
          }
          opts_series.push(series[i]);
        }
      }
    }
    // console.log("OPTS SERIES");
    // console.log(opts_series);

    opts.series = opts_series;
    var element = React.createElement(Chart, {container: 'chart', options: opts});

    if (typeof window !== 'undefined') {
      ReactDOM.render(element, document.getElementById('chart'));
    }
  }
  if (typeof window != 'undefined') {
    $.get(server_url + '/index.php/jobs/UserList', {
        user: "",
        application: "null"
      },
      function (data) {
        var users = data;
        $.get(server_url + '/index.php/jobs/ApplicationList', {
            application: "",
            user: "null"
          },
          function (data) {
            var apps = data;
            // $("#user-typeahead").typeahead({source:users});
            // $("#application-typeahead").typeahead({source: apps});
            // TODO: uncomment autocompletes
            // $("#user-typeahead").autocomplete({
            //   source: users,
            //   messages: {
            //     noResults: '',
            //     results: function () {
            //     }
            //   }
            // });
            // $("#application-typeahead").autocomplete({
            //   source: apps,
            //   messages: {
            //     noResults: '',
            //     results: function () {
            //     }
            //   }
            // });
          });
      });
  }
};

export default withStyles(s)(Menu);
