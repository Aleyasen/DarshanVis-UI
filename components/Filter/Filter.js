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
import moment from "moment";
var Highcharts = require('highcharts');
var $ = require('jquery');
var DateTimeField = require('react-bootstrap-datetimepicker');
if (typeof document !== 'undefined') {
  require("jquery-ui");
}

var callback = function (data) {
  console.log("entered callback");
  // console.log(this.chart);
  // console.log("DATA");
  // console.log(data);
  var chart_id = this.chart;

  if (chart_id == "17") {
    utils.setup_chart_special(data);
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

            $("#user-typeahead").autocomplete(
              {
                source: users,
                messages: {
                  noResults: '',
                  results: function () {
                  }
                }
              }
            );
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

  // var element = React.createElement(Chart, {container: 'chart', options: opts});

  // if (typeof window !== 'undefined') {
  //   ReactDOM.render(element, document.getElementById('chart'));
  // }
};


function Filter({children}) {
  var numapp_placeholder = "Apps#";
  var user_placeholder = "User";
  var app_placeholder = "Application"
  var start_date = moment().subtract(5, 'years');
  var end_date = moment();
  var end_date_min = start_date;
  console.log("in the sorting >>>>>>>>>>>>>");
  var chart = utils.charts["12"];
  var series_ = utils.chart_series["12"];
  var options = chart.sorting;
  var labels = [];
  for (var i = 0; i < series_.length; i++) {
    labels[series_[i].attribute] = series_[i].name;
  }
  populateDropdown(".sortpicker", options, labels);


  return (
    <div>

      <div className="row">


        <div className="form-group col-md-4">
          <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon glyphicon-user" data-toggle="tooltip" data-placement="left"
                       title="My Tooltip text"></i>
                </span>
            <input type="text" name="user" className="form-control cust_autocomplete" id="user-typeahead"
                   data-provide="typeahead"
                   placeholder={user_placeholder} autocomplete="off"/>
          </div>
        </div>

        <div className="form-group col-md-4">
          <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon glyphicon-font" data-toggle="tooltip" data-placement="left"
                       title="My Tooltip text"></i>
                </span>
            <input type="text" name="application" className="form-control cust_autocomplete" id="application-typeahead"
                   data-provide="typeahead" placeholder={app_placeholder} autocomplete="off"/>

          </div>
        </div>

      </div>
      <div className="row">
        <div className="form-group col-md-4">
          <DateTimeField
            dateTime={start_date}
            onChange={startDateChanged}
          />
        </div>
        <div className="form-group col-md-4">
          <DateTimeField
            dateTime={end_date}
            minDate={end_date_min}
            onChange={endDateChanged}
          />
        </div>

        <div className="col-md-1 form-group">
          <button onClick={updateChart} type="button" className="btn btn-inverse tiny-button">Update</button>
        </div>

        <div className="col-md-1 form-group">
          <button type="button" id="sort_button_top" className="btn tiny-button"
                  data-toggle="modal"
                  href="#sorting_modal">
            <i className="glyphicon glyphicon-sort-by-alphabet"></i>
            Sort
          </button>
        </div>

        <div className="col-md-2 form-group">
          <button onClick={toggleChart} type="button" id="toggle-percentage"
                  className="btn tiny-button">
            %
          </button>
        </div>
      </div>

      <input type="hidden" id="chart_id_storage"/>
      <input type="hidden" id="start_date_storage"/>
      <input type="hidden" id="end_date_storage"/>
    </div>
  );
}

function startDateChanged(e) {
  end_date_min = e;
  console.log(e);
  $("#start_date_storage").val(e);
}

function endDateChanged(e) {
  console.log(e);
  $("#end_date_storage").val(e);
}

function sortChart(e) {

}
var stacking = false;
if (typeof document !== 'undefined') {
  var index = $("#chart").data('highchartsChart');
  var chart = Highcharts.charts[index];
}
function toggleChart(e) {
  if (typeof document !== 'undefined') {
    console.log("starting toggle");
    // var chart = $("#chart").highcharts();
    for (var i = 0; i < 5; i++) {
      chart.series[i].update({
        stacking: stacking ? "normal" : "percent"
      });
    }

    chart.yAxis[0].axisTitle.attr({
      text: stacking ? "Distribution of time (s)" : "Percentage of time (%)"
    });

    if (!stacking) {
      chart.yAxis[0].setExtremes(0, 100);
    } else {
      chart.yAxis[0].setExtremes(null, null);
    }
    stacking = !stacking;
    chart.redraw();
    console.log("toggle done");
  }
}

function updateChart(e) {
  console.log(e);
  // get parameters
  var numapp = $("#numapp-typeahead").val();
  var user = $("#user-typeahead").val();
  var app = $("#application-typeahead").val();
  var start = $("#start_date_storage").val();
  var end = $("#start_date_storage").val();

  var chart_id = $("#chart_id_storage").val();
  $("#chart").html("<div><center>Loading...</center></div>");

  var data = {
    url: "test",
    chart: chart_id,
    start_date: start,
    end_date: end,
    application: app,
    numapp: numapp,
    user: user
  }
  console.log(data);
  if (typeof window !== 'undefined') {
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
}

function populateDropdown(selector, options, labels) {
  if (typeof document !== 'undefined') {
    var str = "";
    if (typeof options != 'undefined') {
      for (var i = 0; i < options.length; i++) {
        str += '<option value="' + options[i] + '">' + labels[options[i]] + '</option>';
      }

      $(selector).append(str);
      // $(selector).selectpicker('refresh');
    }
  }
}


Filter.propTypes = {
  // children: PropTypes.element.isRequired,
};

export default Filter;
