/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';
import config from '../../config';
var Chart = require('../Charts/Chart');
// require('../Utils')
import * as utils from '../Utils';
import ReactDOM from 'react-dom';
var $ = require("jquery");
// require("jquery-ui/autocomplete");
if (typeof document !== 'undefined') {
  require("jquery-ui");
}


var Menu = React.createClass({
  getInitialState: function () {
    return {activeMenu: ""};
  },
  render: function () {
    var rowsgroup = [];
    // var items = categories.hello;
    var items = cats;
    var this_ = this;
    items.forEach(function (item) {
      item.color = "white";
      rowsgroup.push(<MenuRowGroup item={item} activeMenu={this_.state.activeMenu}/>);
    });
    return (
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <center>
          <div className="black-link">
            <div style={{"fontSize":"110%", "fontWeight": "bold"}}></div>
          </div>
        </center>
        <div id="myfilter" style={{"paddingBottom": "3px"}}></div>
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title filter-header">
              <a className="collapsed btn-block non-loc-colap" data-toggle="collapse" data-parent="#accordion"
                 href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                <strong></strong>
              </a>
            </h4>
          </div>
          <div id="collapseOne" className="panel-collapse" role="tabpanel" aria-labelledby="headingOne">
            <div className="panel-body">
              <div>
                <div className="nav filters" style={{"marginTop":"10px", "marginBottom": "10px"}}>
                  {rowsgroup}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

Menu.propTypes = {
  // children: PropTypes.element.isRequired,
};


var MenuRowGroup = React.createClass({
  render: function () {
    var rows = [];
    // var items = categories.hello;
    var charts = this.props.item.charts;
    var activeMenu = this.props.activeMenu;

    charts.forEach(function (item) {
      if (item.id == activeMenu) {
        item.color = "yellow";
      } else {
        item.color = "white";
      }
      rows.push(<MenuRow item={item}/>);
    });
    return (

      <li style={{"backgroundColor":"#ffffff"}}>
        <b>{this.props.item.name}</b>
        {rows}
      </li>
    );
  }
});

var callback = function (data) {
  console.log("entered callback");
  // console.log(this.chart);
  // console.log("DATA");
  // console.log(data);
  var chart_id = this.chart;

  if (chart_id == "17") {
    utils.setup_chart_special(data);
  }
  else if (chart_id == "10" || chart_id == "9" || chart_id == "4") {
    utils.setup_top_chart(data);
  }
  else {
    $("#chart-config").hide();
    var opts = utils.charts[chart_id];
    var series = utils.chart_series[chart_id];
    // console.log("SERIES:");
    // console.log(series);
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
    console.log(opts_series);

    opts.series = opts_series;
    // console.log("options");
    // console.log(opts);
    var element = React.createElement(Chart, {container: 'chart', options: opts});

    if (typeof window !== 'undefined') {
      ReactDOM.render(element, document.getElementById('chart'));
    }
  }
  if (typeof window != 'undefined') {
    $.get(config.server_url + '/index.php/jobs/UserList', {
        user: "",
        application: "null"
      },
      function (data) {
        var users = data;
        $.get(config.server_url + '/index.php/jobs/ApplicationList', {
            application: "",
            user: "null"
          },
          function (data) {
            var apps = data;
            // $("#user-typeahead").typeahead({source:users});
            // $("#application-typeahead").typeahead({source: apps});

            $("#user-typeahead").autocomplete({
              source: users,
              messages: {
                noResults: '',
                results: function () {
                }
              }
            });
            $("#application-typeahead").autocomplete({
              source: apps,
              messages: {
                noResults: '',
                results: function () {
                }
              }
            });
          });
      });

  }

};

var MenuRow = React.createClass({

  handleClick: function (e) {
    if (typeof window !== 'undefined') {
      console.log("handle click");
      var chart_id = this.props.item.id;
      $("#chart").html("<div><center>Loading...</center></div>");
      $("#chart_id_storage").val(chart_id);
      var data = {
        url: "test",
        chart: chart_id
      }

      $.ajax({
        url: config.server_url + '/index.php/jobs/filter',
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
  },
  render: function () {
    return (
      <li style={{"background-color":this.props.item.color}} onClick={this.handleClick()}>
        <a>{this.props.item.title}</a>
      </li>
    );
  }
});

var cats_all = [
  {
    "id": 2,
    "name": "Analyze Application I/O Behavior",
    "charts": [
      {
        "id": 17,
        "title": "Overview of I/O characteristics"
      },
      {
        "id": 12,
        "title": "Time Breakdown"
      }

    ]
  },
  {
    "id": 1,
    "name": "Analyze Platform I/O Workload",
    "charts": [
      {
        "id": 8,
        "title": "I/O Throughput of All Apps"
      },
      {
        "id": 18,
        "title": "Cumulative Usage of I/O Time of Apps"
      },
      {
        "id": 999,
        "title": "Top Apps",
        "subcats": [
          {
            "id": 9,
            "title": "with Highest I/O Time"
          },
          {
            "id": 4,
            "title": "with Highest Run Time"
          },
          {
            "id": 10,
            "title": "with Highest Amount of Data Accessed"
          }
        ]
      },
      {
        "id": 15,
        "title": "Application's Data Size Distribution"
      }
    ]
  }
];


var cats = [
  {
    "id": 2,
    "name": "Analyze Application I/O Behavior",
    "charts": [
      {
        "id": 17,
        "title": "Overview of I/O characteristics"
      },
      {
        "id": 12,
        "title": "Time Breakdown"
      }

    ],
    "id": 5,
    "name": "Analyze Platform I/O Workload",
    "charts": [
      {
        "id": 10,
        "title": "Top Applications with Highest Amount of Data Read/Written"
      },
      {
        "id": 9,
        "title": "Top Applications with Highest I/O Time",
      },
      {
        "id": 4,
        "title": "Top Applications with Highest Runtime",
      },
    ]
  }
];

export default Menu;
