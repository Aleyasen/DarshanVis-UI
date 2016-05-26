
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import config from '../../../config';

var $ = require('jquery');
var Highcharts = require('highcharts');

var Chart = require('../Chart');

var default_opts = {
  title: {
    text: 'CHART ERROR',
    x: -20 //center
  },
  // xAxis: {
  //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // },
  // yAxis: {
  //   title: {
  //     text: 'CHART ERROR'
  //   }
  // },
  tooltip: {
    valueSuffix: '°C'
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
  },
  series: []
};


var callback = function (data) {
  console.log("DATA");
  console.log(data);
  console.log("OPTIONS")
  console.log(data.chart.options);
  var opts = data.chart["highchart-confs"];
  // var opts = default_opts;
  // var chart = $('#chart-container'); //.highcharts();
  var series = data["chart"]["series"];
  var queryResult = data["queryresult"];
  var opts_series = [];
  for (var i = 0; i < series.length; i++) {
    var attr = series[i]["attribute"];
    var qr = queryResult[attr];
    if (qr != null) {
      // $('#chart-container').html("");
      series[i]["data"] = [];
      for (var j = 0; j < qr.length; j++) {
        var num = Number(qr[j]);
        if (num != 0) {
          series[i]["data"].push([j, num]);
        }
      }
      // console.log(series[i]);
      opts_series.push(series[i]);
      // chart.addSeries(series[i], false);
    }
    // else {
    //     $('#chart-container').html("<center>No result for the desired filters.</center>");
    // }
  }
  // console.log(opts_series);

  opts.series = opts_series;
  // opts.title.text = data.chart.name;

  console.log(opts);


  var element = React.createElement(Chart, {container: 'chart', options: opts});

  if (typeof window !== 'undefined') {
    ReactDOM.render(element, document.getElementById('chart-container'));
  }
};
// if (typeof window !== 'undefined') {
// var chart_id = prompt("Please enter desired chart", "8");
var chart_id = 12;
// }


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
    success: callback,
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }
  });
}

