/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';
import config from '../../config';
var Chart = require('../Charts/Chart');
import ReactDOM from 'react-dom';


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

  $("#chart-container").highcharts(options);

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


function Menu({params}) {
  var rowsgroup = [];
  // var items = categories.hello;
  var items = cats;
  items.forEach(function (item) {
    item.color = "white";
    rowsgroup.push(<MenuRowGroup item={item}/>);
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

Menu.propTypes = {
  // children: PropTypes.element.isRequired,
};


var MenuRowGroup = React.createClass({
  render: function () {
    var rows = [];
    // var items = categories.hello;
    var charts = this.props.item.charts;

    charts.forEach(function (item) {
      item.color = "white";
      rows.push(<MenuRow item={item}/>);
    });
    return (

      <li style={{"backgroundColor":"#ccc"}}>
        {this.props.item.name}
        {rows}
      </li>
    );
  }
});

var callback = function (data) {
  console.log("entered callback");
  console.log(this.chart);
  console.log("DATA");
  console.log(data);
  var chart_id = this.chart;

  if (chart_id == "17") {
    setup_chart_special(data);
  }
  else {
    $("#chart-config").hide();
    var opts = charts[chart_id];
    var series = chart_series[chart_id];
    console.log("SERIES:");
    console.log(series);
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
    console.log("OPTS SERIES");
    console.log(opts_series);

    opts.series = opts_series;
    console.log("options");
    console.log(opts);
    var element = React.createElement(Chart, {container: 'chart', options: opts});

    if (typeof window !== 'undefined') {
      ReactDOM.render(element, document.getElementById('chart'));
    }
  }

  // var element = React.createElement(Chart, {container: 'chart', options: opts});

  // if (typeof window !== 'undefined') {
  //   ReactDOM.render(element, document.getElementById('chart'));
  // }
};

var handleClick = function (props) {
  var chart_id = props.item.id;
  $("#chart").html("<h1>LOADING CHART</h1>");

  var data = {
    url: "test",
    chart: chart_id
  }
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
//style={{"backgroundColor":"white"}}
var MenuRow = React.createClass({
  render: function () {
    return (
      <li onClick={handleClick.bind(this, this.props)}>
        <button class="btn btn-primary btn-block">{this.props.item.title}</button>
      </li>
    );
  }
});

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

export default Menu;
