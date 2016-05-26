import React, {PropTypes} from 'react';
import config from '../../config';
var Chart = require('../Charts/Chart');
import ReactDOM from 'react-dom';
import moment from "moment";
var Highcharts = require('highcharts');
var $ = require('jquery');
var DateTimeField = require('react-bootstrap-datetimepicker');
if (typeof document !== 'undefined') {
  require("jquery-ui");
}

console.log("in utils");

export var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
export var num_sizes = ['', 'K', 'M', 'B', 'Tr', '', ''];

export function byte_formatter(c, suffix) {
  return byte_formatter_general(c, suffix, 1);
}


export function byte_formatter_for_bytes(c, suffix) {
  return byte_formatter_general(c, suffix, 1);
}


export function byte_formatter_str(c, suffix) {
  c = parseInt(c);
  c = +c;
  c = c * 1000 * 1000;
  return byte_formatter_general_1(c, suffix, 1);
}

export function byte_formatter_str_for_bytes(c, suffix) {
  c = parseInt(c);
  c = +c;
  return byte_formatter_general_1(c, suffix, 1);
}


export function byte_formatter_general(c, suffix, multiplier) {
  var bytes = c.value * multiplier;
  if (bytes == 0) {
    return '0 B';
  }
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)));
  return Math.round(bytes / Math.pow(1000, i), 2) + ' ' + sizes[i] + suffix;
}

export function byte_formatter_general_1(c, suffix, multiplier) {
  var bytes = c * multiplier;
  if (bytes == 0) {
    return '0 B';
  }
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)));
  return Math.round(bytes / Math.pow(1000, i), 2) + ' ' + sizes[i] + suffix;
}

export function num_procs_formatter_str(c, suffix) {
  c = parseInt(c);
  if (c == 0) {
    return '0';
  }
  var i = parseInt(Math.floor(Math.log(c) / Math.log(1000)));
  return Math.round(c / Math.pow(1000, i), 10) + ' ' + num_sizes[i] + suffix;
}


// CONSTANTS
// holds chart data
export var charts = {
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
    "sorting": [
      "notio",
      "iotime",
      "io_percent",
      "localio",
      "local_meta",
      "globalio",
      "global_meta",
      "nprocs",
      "total_bytes",
      "thruput",
      "unique_count",
      "partshared_count",
      "allshared_count"
    ],
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

export var chart_series = {
  "12": [
    {
      "attribute": "localio",
      "name": "Non-global Data I/O",
      "description": "Non-global data I/O: The amount of time this job spent in function calls to read/write its files not accessed by all processes.",
      "color": "#5C9430",
      "stacking": "percent",
      "type": "column",
      "yAxis": 0
    },
    {
      "attribute": "local_meta",
      "name": "Non-global Metadata",
      "description": "Non-global Metadata: The amount of time this job spent in metadata function calls (open, close, seek, etc.) for non-global files, i.e., files that one or more but not all processes opened.",
      "color": "#C73308",
      "stacking": "percent",
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
      "stacking": "percent",
      "type": "column",
      "yAxis": 0
    },
    {
      "attribute": "notio",
      "name": "Not I/O",
      "description": "Not I/O: The amount of time this job spent outside of I/O function calls (data and metadata).",
      "color": "#BDD0D5",
      "stacking": "percent",
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
        "radius": 3,
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
        "radius": 3,
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
        "radius": 3,
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
        "radius": 3,
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
        "radius": 3,
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
        "radius": 3,
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

export var axisTitles = {
  "nprocs": "Number of Processes",
  "total_bytes": "Amount of Data Read/Written",
  "thruput": "I/O Throughput",
  "start_time": "Submission Date",
  "uid": "User ID"
};

export var x_options = charts["17"]["xAxis"]["options"];
export var y_options = charts["17"]["yAxis"]["options"];
export var x_options_list = "";
export var y_options_list = "";
x_options.forEach(function (item) {
  x_options_list += "<option value=" + item + ">" + axisTitles[item] + "</option>";
});
y_options.forEach(function (item) {
  y_options_list += "<option value=" + item + ">" + axisTitles[item] + "</option>";
});

export function date_formatter(string) {
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

export var make_chart = function (xaxis, yaxis, x_scale, y_scale, data) {
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


export var setup_chart_special = function (chart_data) {
  $("#chart-config-sel-x").html(x_options_list);
  $("#chart-config-sel-y").html(y_options_list);
  $("#chart-config").toggle();
  $("#chart-config-sel-x").val("nprocs");
  $("#chart-config-sel-y").val("total_bytes");
  $("#chart-config-sel-x-scale").val("linear");
  $("#chart-config-sel-y-scale").val("linear");
  

  $("#chart-config-button").click(function () {
    var x = $("#chart-config-sel-x").val();
    var y = $("#chart-config-sel-y").val();
    var x_scale = $("#chart-config-sel-x-scale").val();
    var y_scale = $("#chart-config-sel-y-scale").val();

    make_chart(x, y, x_scale, y_scale, chart_data);
  });

};

export var setup_top_chart = function (json_str) {
  var cont15_div = `
    <div id="15-scatter-containers" hidden>
          <div id="min_max_button_div" style="width:100px; text-align: center;" hidden>
              <button id="min_max_button" class="btn btn-large btn-primary">Constant Min/Max Toggle</button>
          </div>
          <div class="row">
              <div id="chart-container-1" class="col-md-4 charts" style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-2" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-3" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-4" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-5" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-6" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-7" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-8" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-9" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-10" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-11" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-12" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-13" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-14" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
              <div id="chart-container-15" class="col-md-4 charts"  style="height: 400px; margin: 0 auto;"></div>
          </div>
      </div>
    `;
  $("#chart-container").append(cont15_div);
  $("#dv_table").insertBefore("#15-scatter-containers");

  var axisTitles = {
    "nprocs": "Number of Processes",
    "total_bytes": "Amount of Data read/written",
    "agg_perf_MB": "I/O Throughput"
  };

  $("#chart-container").toggle();
  $("#tooltip-div").toggle();
  $("#sort-button").hide();
  $("#toggle-percentage").hide();
  $("#min_max_button_div").toggle();

  var globalxmin = 0;
  var globalxmax = 0;
  var globalymin = 0;
  var globalymax = 0;


  var make_chart_min_max = function (appname, xaxis, yaxis, x_scale, y_scale, chart_id, obj, xmin, xmax, ymin, ymax) {
    // var chart = $("#" + chart_id).highcharts();
    var s1_label = appname + '-' + xaxis;
    var s2_label = appname + '-' + yaxis;

    var str_s1 = obj[s1_label].split(',');
    var str_s2 = obj[s2_label].split(',');
    var ret_obj = [];

    for (var i = 0; i < str_s1.length; i++) {
      if (str_s1[i].length != 0 && str_s2[i].length != 0) {
        var x = parseInt(str_s1[i]);
        var y = parseInt(str_s2[i]);
        if (x > globalxmax) {
          globalxmax = x;
        }
        if (x < globalxmin) {
          globalxmin = x;
        }
        if (y > globalymax) {
          globalymax = y;
        }
        if (y < globalymin) {
          globalymin = y;
        }
        ret_obj.push([x, y]);
      }
    }

    $("#min_max_button").attr("data-globalxmin", globalxmin);
    $("#min_max_button").attr("data-globalxmax", globalxmax);
    $("#min_max_button").attr("data-globalymin", globalymin);
    $("#min_max_button").attr("data-globalymax", globalymax);
    $("#min_max_button").attr("data-all_same", false);

    var options = {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: appname
      },
      legend: {
        enabled: true
      },
      xAxis: {
        title: {
          enabled: true,
          text: axisTitles[xaxis]
        },
        type: x_scale,
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
        labels: {
          formatter: function () {
            return byte_formatter_for_bytes(this, "");
          }
        }
      },
      yAxis: {
        title: {
          text: axisTitles[yaxis]
        },
        type: y_scale
      },
      exporting: {
        buttons: {
          contextButton: {
            symbol: "url(../../img/printer2.png)"
          }
        }
      },
      tooltip: {
        formatter: function () {
          var str = "X= " + byte_formatter_str_for_bytes(this.x, "");
          str += ", Y= " + this.y;
          return str;
        }
      },
      series: [{
        name: xaxis + ' vs. ' + yaxis,
        color: 'rgba(0, 0, 0, .5)',
        data: ret_obj
      }
      ]
    };

    if (y_scale == "linear") {
      options.yAxis.min = 0;
    }
    if (x_scale == "linear") {
      options.xAxis.min = 0;
    }

    options.xAxis.min = xmin;
    options.xAxis.max = xmax;
    options.yAxis.min = ymin;
    options.yAxis.max = ymax;

    $("#" + chart_id).highcharts(options);
  }


  var make_chart = function (appname, xaxis, yaxis, x_scale, y_scale, chart_id, obj) {
    // var chart = $("#" + chart_id).highcharts();
    var s1_label = appname + '-' + xaxis;
    var s2_label = appname + '-' + yaxis;

    var str_s1 = obj[s1_label].split(',');
    var str_s2 = obj[s2_label].split(',');
    var ret_obj = [];

    for (var i = 0; i < str_s1.length; i++) {
      if (str_s1[i].length != 0 && str_s2[i].length != 0) {
        var x = parseInt(str_s1[i]);
        var y = parseInt(str_s2[i]);
        if (x > globalxmax) {
          globalxmax = x;
        }
        if (x < globalxmin) {
          globalxmin = x;
        }
        if (y > globalymax) {
          globalymax = y;
        }
        if (y < globalymin) {
          globalymin = y;
        }
        ret_obj.push([x, y]);
      }
    }

    $("#min_max_button").attr("data-globalxmin", globalxmin);
    $("#min_max_button").attr("data-globalxmax", globalxmax);
    $("#min_max_button").attr("data-globalymin", globalymin);
    $("#min_max_button").attr("data-globalymax", globalymax);
    $("#min_max_button").attr("data-all_same", false);

    var options = {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: appname
      },
      legend: {
        enabled: true
      },
      xAxis: {
        title: {
          enabled: true,
          text: axisTitles[xaxis]
        },
        type: x_scale,
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
        labels: {
          formatter: function () {
            return byte_formatter_for_bytes(this, "");
          }
        }
      },
      yAxis: {
        title: {
          text: axisTitles[yaxis]
        },
        type: y_scale
      },
      exporting: {
        buttons: {
          contextButton: {
            symbol: "url(../../img/printer2.png)"
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
      tooltip: {
        formatter: function () {
          var str = "X= " + byte_formatter_str_for_bytes(this.x, "");
          str += ", Y= " + this.y;
          return str;
        }
      },
      series: [{
        name: xaxis + ' vs. ' + yaxis,
        color: 'rgba(0, 0, 0, .5)',
        data: ret_obj
      }
      ]
    };

    if (y_scale == "linear") {
      options.yAxis.min = 0;
    }
    if (x_scale == "linear") {
      options.xAxis.min = 0;
    }

    // options.legend.enabled = false;

    // $("#" + chart_id).highcharts(options);

    var cont =  chart_id;

    console.log(cont);

    var element = React.createElement(Chart, {container: 'chart', options: options});

    if (typeof window !== 'undefined') {
      console.log("error here: " + cont);
      ReactDOM.render(element, document.getElementById(cont));
    }
  }
  var obj = json_str["data"];
  var appnames = json_str["appnames"];
  var app_arr = appnames.split(',');
  $("#15-scatter-containers").toggle();
  for (var i = 0; i < 10; i++) {
    var chartid = "chart-container-" + (i + 1);
    make_chart(app_arr[i], "total_bytes", "nprocs", "linear", "linear", chartid, obj);
  }
};
