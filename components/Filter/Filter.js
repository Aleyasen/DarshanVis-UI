/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';
import config from '../../config';
var Chart = require('../Charts/Chart');
import ReactDOM from 'react-dom';
import moment from "moment";

var $ = require('jquery');
var DateTimeField = require('react-bootstrap-datetimepicker');
if (typeof document !== 'undefined') {
  require("jquery-ui");
}

var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
var num_sizes = ['', 'K', 'M', 'B', 'Tr', '', ''];

function byte_formatter(c, suffix) {
  return byte_formatter_general(c, suffix, 1);
}


function byte_formatter_for_bytes(c, suffix) {
  return byte_formatter_general(c, suffix, 1);
}


function byte_formatter_str(c, suffix) {
  c = parseInt(c);
  c = +c;
  c = c * 1000 * 1000;
  return byte_formatter_general_1(c, suffix, 1);
}

function byte_formatter_str_for_bytes(c, suffix) {
  c = parseInt(c);
  c = +c;
  return byte_formatter_general_1(c, suffix, 1);
}


function byte_formatter_general(c, suffix, multiplier) {
  var bytes = c.value * multiplier;
  if (bytes == 0) {
    return '0 B';
  }
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)));
  return Math.round(bytes / Math.pow(1000, i), 2) + ' ' + sizes[i] + suffix;
}

function byte_formatter_general_1(c, suffix, multiplier) {
  var bytes = c * multiplier;
  if (bytes == 0) {
    return '0 B';
  }
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)));
  return Math.round(bytes / Math.pow(1000, i), 2) + ' ' + sizes[i] + suffix;
}

function num_procs_formatter_str(c, suffix) {
  c = parseInt(c);
  if (c == 0) {
    return '0';
  }
  var i = parseInt(Math.floor(Math.log(c) / Math.log(1000)));
  return Math.round(c / Math.pow(1000, i), 10) + ' ' + num_sizes[i] + suffix;
}


// CONSTANTS
// holds chart data
var charts = {
  "17": {
    "title": {
      "text": "Scatter plot of application's I/O characteristics"
    },
    "subtitle": {
      "text": ""
    },
    "xAxis": {
      "title": "Jobs",
      "attribute": "total_bytes",
      "type": "linear",
      "options": [
        "start_time",
        "total_bytes",
        "nprocs",
        "thruput",
        "uid"
      ]
    },
    "yAxis": {
      "title": "Throughput",
      "type": "linear",
      "options": [
        "start_time",
        "total_bytes",
        "nprocs",
        "thruput",
        "uid"
      ]
    }
  },
  "12": {
    "chart": {
      "zoomType": "xy"
    },
    "title": {
      "text": "Breakdown of time for each job",
      "margin": 20,
      "style": {
        "margin-top": "40px"
      }
    },
    "subtitle": {
      "text": ""
    },
    "navigation": {
      "buttonOptions": {
        "verticalAlign": "bottom",
        "y": -20
      }
    },
    "xAxis": [
      {
        "title": {
          "text": "Jobs",
          "style": {
            "font-size": "14px"
          }
        }
      }
    ],
    "yAxis": [
      {
        "labels": {
          "style": {
            "font-size": "14px"
          }
        },
        "title": {
          "text": "Distribution of time (s)",
          "style": {
            "font-size": "15px"
          }
        }
      },
      {
        "type": "logarithmic",
        "allowDecimals": false,
        "gridLineWidth": 0,
        "title": {
          "text": "Count",
          "margin": 2,
          "style": {
            "color": "Highcharts.getOptions().colors[0]",
            "font-size": "15px"
          },
          "enabled": false
        },
        "labels": {
          "align": "left",
          "x": 3,
          "y": 5,
          "style": {
            "color": "Highcharts.getOptions().colors[0]",
            "font-size": "14px"
          }
        }
        ,
        "opposite": true
      },
      {
        "type": "logarithmic",
        "allowDecimals": false,
        "gridLineWidth": 0,
        "title": {
          "text": "Total Bytes Read/Written",
          "margin": 2,
          "style": {
            "color": "Highcharts.getOptions().colors[1]",
            "font-size": "15px"
          },
          "enabled": false
        },
        "labels": {
          "align": "left",
          "x": 3,
          "y": 5,
          "style": {
            "color": "Highcharts.getOptions().colors[1]",
            "font-size": "14px"
          }
        },
        "opposite": true
      },
      {
        "min": 1,
        "type": "logarithmic",
        "allowDecimals": false,
        "title": {
          "text": "I/O throughput",
          "margin": 2,
          "style": {
            "color": "Highcharts.getOptions().colors[1]",
            "font-size": "15px"
          },
          "enabled": false
        },
        "labels": {
          "align": "left",
          "x": 3,
          "y": 5,
          "style": {
            "color": "Highcharts.getOptions().colors[1]",
            "font-size": "14px"
          }
        },
        "opposite": true
      }
    ],
    "tooltip": {
      "shared": true
    }
  }
};

var chart_series = {
  "12": [
    {
      "attribute": "localio",
      "name": "Non-global Data I/O",
      "description": "Non-global data I/O: The amount of time this job spent in function calls to read/write its files not accessed by all processes.",
      "color": "#5C9430",
      "stacking": "normal",
      "type": "column",
      "yAxis": 0
    },
    {
      "attribute": "local_meta",
      "name": "Non-global Metadata",
      "description": "Non-global Metadata: The amount of time this job spent in metadata function calls (open, close, seek, etc.) for non-global files, i.e., files that one or more but not all processes opened.",
      "color": "#C73308",
      "stacking": "normal",
      "type": "column",
      "yAxis": 0
    },
    {
      "attribute": "globalio",
      "name": "Global Data I/O",
      "description": "Global data I/O: The amount of time this job spent in function calls to read/write global files, i.e., files that all processes opened.",
      "color": "#68DB49",
      "stacking": "normal",
      "type": "column",
      "yAxis": 0
    },
    {
      "attribute": "global_meta",
      "name": "Global Metadata",
      "description": "Global Metadata: The amount of time this job spent in metadata function calls (open, close, seek, etc.) for global files, i.e., files that all processes opened.",
      "color": "#F25B47",
      "stacking": "normal",
      "type": "column",
      "yAxis": 0
    },
    {
      "attribute": "notio",
      "name": "Not I/O",
      "description": "Not I/O: The amount of time this job spent outside of I/O function calls (data and metadata).",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "column",
      "visible": false,
      "yAxis": 0
    },
    {
      "attribute": "nprocs",
      "name": "Number of Processes",
      "description": "# of Processes: The number of processes this job had.",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 1,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "diamond",
        "enabled": true,
        "radius": 5,
        "fillColor": "#7F77B4"
      }
    }
    ,
    {
      "attribute": "total_bytes",
      "name": "Total Bytes Read/Written",
      "description": "Total Bytes Read/Written: The total number of bytes this job read and wrote.",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 2,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "circle",
        "enabled": true,
        "radius": 5,
        "fillColor": "#BF53B4"
      }
    },
    {
      "attribute": "thruput",
      "name": "I/O throughput",
      "description": "I/O throughput",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 3,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "triangle-down",
        "enabled": true,
        "radius": 5,
        "fillColor": "#000000"
      }
    },
    {
      "attribute": "unique_count",
      "name": "Number of local files",
      "description": "Number of local files: Number of files accessed by 1 processes only",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 1,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "triangle",
        "enabled": true,
        "radius": 5,
        "fillColor": "#000099"
      }
    },
    {
      "attribute": "partshared_count",
      "name": "Number of partshared files",
      "description": "Number of partshared files: Number of files accessed by a proper subset of processes",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 1,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "triangle",
        "enabled": true,
        "radius": 5,
        "fillColor": "#FF9900"
      }
    },
    {
      "attribute": "allshared_count",
      "name": "Number of global files",
      "description": "Number of global files: Number of files accessed by all processes",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 1,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "triangle",
        "enabled": true,
        "radius": 5,
        "fillColor": "#CC00CC"
      }
    },
    {
      "attribute": "iotime",
      "name": "I/O Time",
      "not-in-chart": true

    },
    {
      "attribute": "io_percent",
      "name": "Percentage of runtime spent in I/O",
      "not-in-chart": true
    }
  ]
};

var axisTitles = {
  "nprocs": "Number of Processes",
  "total_bytes": "Amount of Data Read/Written",
  "thruput": "I/O Throughput",
  "start_time": "Submission Date",
  "uid": "User ID"
};

var x_options = charts["17"]["xAxis"]["options"];
var y_options = charts["17"]["yAxis"]["options"];
var x_options_list = "";
var y_options_list = "";
x_options.forEach(function (item) {
  x_options_list += "<option value=" + item + ">" + axisTitles[item] + "</option>";
});
y_options.forEach(function (item) {
  y_options_list += "<option value=" + item + ">" + axisTitles[item] + "</option>";
});

function date_formatter(string) {
  //2015-09-03 13:20:46
  var strArr = string.split(" ");
  var yymmdd = strArr[0]; //gives us 2015-09-03
  var indiv = yymmdd.split("-");
  // indiv[0] is year
  var year = parseInt(indiv[0]);
  // indiv[1] is month, BUT ZERO BASED so subtract one
  var month = parseInt(indiv[1]) - 1;
  // indiv[2] is day
  var day = parseInt(indiv[2]);

  // Date.UTC('year', 'month', 'day')
  return parseInt(Date.UTC(year, month, day));
}

var make_chart = function (xaxis, yaxis, x_scale, y_scale, data) {
  // console.log("data");
  // console.log(data);
  // var series_obj = all_data["queryresult"];
  var series_obj = data;
  var str_s1 = series_obj[xaxis];
  var str_s2 = series_obj[yaxis];
  var ret = "";
  var ret_obj = [];

  if (xaxis == "start_time") {
    x_scale = 'datetime';
  }
  if (yaxis == "start_time") {
    y_scale = 'datetime';
  }

  for (var i = 0; i < str_s1.length; i++) {
    if (str_s1[i].length != 0 && str_s2[i].length != 0) {
      if (xaxis != "start_time") {
        var x = parseInt(str_s1[i]);
      }
      else {
        var x = date_formatter(str_s1[i]);
      }
      if (yaxis != "start_time") {
        var y = parseInt(str_s2[i]);
      }
      else {
        var y = date_formatter(str_s2[i]);
      }

      if (x == 0 || y == 0) {
        // console.log('found zero');
        // console.log(x + ", " + y);
        continue;
      }

      ret_obj.push([x, y]);
    }
  }

  var options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
      width: 900,
      height: 500
    },
    title: {
      text: '<?php echo $chart["title"] ?>'
    },
    subtitle: {
      text: '<?php echo $chart["subtitle"] ?>'
    },
    legend: {
      enabled: false
    },
    xAxis: {
      title: {
        enabled: true,
        text: axisTitles[xaxis],
        style: {
          fontSize: '20px'
        }
      },
      type: x_scale,
      labels: {
        formatter: function () {
          var str = "";
          if (xaxis == "thruput") {
            str += byte_formatter_str_for_bytes(this.value, "/s");
          }
          else if (xaxis == "total_bytes") {
            str += byte_formatter_str_for_bytes(this.value, "");
          }
          else if (xaxis == "nprocs") {
            str += num_procs_formatter_str(this.value, "");
          }
          else if (xaxis == "start_time") {
            str += Highcharts.dateFormat('%b-%d-%y', this.value);
          }
          else {
            str += this.value;
          }
          return str;
        },
        style: {
          fontSize: '15px'
        }
      }
    },
    yAxis: {
      title: {
        text: axisTitles[yaxis],
        style: {
          fontSize: '20px'
        }
      },
      type: y_scale,
      labels: {
        formatter: function () {
          var str = "";
          if (yaxis == "thruput") {
            str += byte_formatter_str_for_bytes(this.value, "/s");
          }
          else if (yaxis == "total_bytes") {
            str += byte_formatter_str_for_bytes(this.value, "");
          }
          else if (yaxis == "nprocs") {
            str += num_procs_formatter_str(this.value, "");
          }
          else if (yaxis == "start_time") {
            str += Highcharts.dateFormat('%b-%d-%y', this.value);
          }
          else {
            str += this.value;
          }
          return str;
        },
        style: {
          fontSize: '15px'
        }
      }
    },
    // plotOptions: {
    //     scatter: {
    //         marker: {
    //             radius: 5,
    //             states: {
    //                 hover: {
    //                     enabled: true,
    //                     lineColor: 'rgb(100,100,100)'
    //                 }
    //             }
    //         },
    //         states: {
    //             hover: {
    //                 marker: {
    //                     enabled: false
    //                 }
    //             }
    //         }
    //     }
    // },
    exporting: {
      buttons: {
        contextButton: {
          symbol: "url(../../img/printer2.png)"
        }
      }
    },
    tooltip: {
      formatter: function () {
        var str = "";
        if (xaxis == "thruput") {
          str += "X= " + byte_formatter_str_for_bytes(this.x, "/s");
        }
        else if (xaxis == "total_bytes") {
          str += "X= " + byte_formatter_str_for_bytes(this.x, "");
        }
        else if (xaxis == "nprocs") {
          str += "X= " + num_procs_formatter_str(this.x, "");
        }
        else if (xaxis == "start_time") {
          str += "X= " + Highcharts.dateFormat('%b-%d-%y', this.x);
        }
        else {
          str += "X= " + this.x;
        }
        if (yaxis == "thruput") {
          str += ", Y= " + byte_formatter_str_for_bytes(this.y, "/s");
        }
        else if (yaxis == "total_bytes") {
          str += ", Y= " + byte_formatter_str_for_bytes(this.y, "");
        }
        else if (yaxis == "nprocs") {
          str += ", Y= " + num_procs_formatter_str(this.y, "");
        }
        else if (yaxis == "start_time") {
          str += ", Y=" + Highcharts.dateFormat('%b-%d-%y', this.y);
        }
        else {
          str += ", Y= " + this.y;
        }
        return str;
      }
    },
    series: [{
      name: xaxis + ' vs. ' + yaxis,
      color: 'rgba(223, 83, 83, .5)',
      data: ret_obj
    }
    ]
  };

  if (y_scale == "linear") {
    options.yAxis.min = 0;
  } else if (yaxis != "start_time") {
    options.yAxis.min = 1;

  }
  if (x_scale == "linear") {
    options.xAxis.min = 0;
  } else if (xaxis != "start_time") {
    options.xAxis.min = 1;
  }

  // $("#chart-container").highcharts(options);

  var element = React.createElement(Chart, {container: 'chart', options: options});

  if (typeof window !== 'undefined') {
    ReactDOM.render(element, document.getElementById('chart'));
  }
}


var setup_chart_special = function (chart_data) {
  $("#chart-config-sel-x").html(x_options_list);
  $("#chart-config-sel-y").html(y_options_list);
  $("#chart-config").toggle();
  $("#chart-config-sel-x").val("nprocs");
  $("#chart-config-sel-y").val("total_bytes");
  $("#chart-config-sel-x-scale").val("logarithmic");
  $("#chart-config-sel-y-scale").val("logarithmic");

  $("#chart-config-button").click(function () {
    var x = $("#chart-config-sel-x").val();
    var y = $("#chart-config-sel-y").val();
    var x_scale = $("#chart-config-sel-x-scale").val();
    var y_scale = $("#chart-config-sel-y-scale").val();

    make_chart(x, y, x_scale, y_scale, chart_data);
  });

};

var callback = function (data) {
  console.log("entered callback");
  // console.log(this.chart);
  // console.log("DATA");
  // console.log(data);
  var chart_id = this.chart;

  if (chart_id == "17") {
    setup_chart_special(data);
  }
  else {
    $("#chart-config").hide();
    var opts = charts[chart_id];
    var series = chart_series[chart_id];
    // console.log("SERIES:");
    // console.log(series);
    var queryResult = data;
    var opts_series = [];
    for (var i = 0; i < series.length; i++) {
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
  var start_date = moment().subtract(1, 'years');
  var end_date = moment();
  var end_date_min = start_date;
  return (
    <div>

      <div className="row">
        <div className="form-group col-md-4 ">
          <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon glyphicon-user" data-toggle="tooltip" data-placement="left"
                       title="My Tooltip text"></i>
                </span>
            <input type="text" name="numapp" className="form-control cust_autocomplete" id="numapp-typeahead"
                   data-provide="typeahead"
                   placeholder={numapp_placeholder} autocomplete="off"/>
          </div>
        </div>

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
          <button onClick={sortChart} type="button" id="sort_button_top" className="btn tiny-button"
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

function toggleSort(e) {
  var chart=$("#chart").highcharts();
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

Filter.propTypes = {
  // children: PropTypes.element.isRequired,
};

export default Filter;
