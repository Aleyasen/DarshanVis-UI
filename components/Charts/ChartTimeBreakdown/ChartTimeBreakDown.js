/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

var $ = require('jquery');
var Highcharts = require('highcharts');

var Chart = require('../Chart'),
  options = {
    title: {
      text: 'Monthly Average Temperature',
      x: -20 //center
    },
    subtitle: {
      text: 'Source: WorldClimate.com',
      x: -20
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      valueSuffix: '°C'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    series: [{
      name: 'Tokyo',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
      name: 'New York',
      data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }, {
      name: 'Berlin',
      data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    }, {
      name: 'London',
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
  };

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

// Add additional module required to render a treemap.
// module.exports = React.createClass({
//   render: function () {
//     return React.createElement(Chart, {container: 'chart', options: options});
//   }
// });
//
// export default Chart;

// var ChartObj = React.createClass({
//   getInitialState: function() {
//     return {
//       container: 'chart',
//       options: options
//     };
//   },

//   componentDidMount: function() {
//     this.serverRequest = $.post("http://localhost/index.php/jobs/filter", {url: "test", chart: "8"}, function(data){
//       this.setState({
//         container: 'chart',
//         options: data.chart
//       });
//     }.bind(this), "json");
//   },

//   componentWillUnmount: function() {
//     this.serverRequest.abort();
//   },

//   render: function () {
//     return React.createElement('div', {id: this.props.container});
//   }

// });

// // var element = React.createElement(ChartObj, )

// var UserGist = React.createClass({

//   componentDidMount: function() {
//     this.serverRequest = $.get(this.props.source, function (result) {
//       var lastGist = result[0];
//       this.setState({
//         username: lastGist.owner.login,
//         lastGistUrl: lastGist.html_url
//       });
//     }.bind(this));
//   },


//   // render: function() {
//   //   return (
//   //     <div>
//   //       {this.state.username}'s last gist is
//   //       <a href={this.state.lastGistUrl}>here</a>.
//   //     </div>
//   //   );
//   // }
// });

// ReactDOM.render(
//   <UserGist source="https://api.github.com/users/octocat/gists" />,
//   mountNode
// );


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
    url: "http://localhost/DarshanVis-API/index.php/jobs/filter",
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


// $.post("http://localhost/index.php/jobs/filter", crossDomain: true, {url: "test", chart: "8"}, function(data){
//   console.log(data);
//   var element = React.createElement(Chart, {container: 'chart', options: data.chart});
//   if (typeof window !== 'undefined') {
//     ReactDOM.render(element, document.getElementById('chart-container'));
//   }
// });

// Create and render element
// var element = React.createElement(Chart, {container: 'chart', options: options});
// if (typeof window !== 'undefined') {
//   ReactDOM.render(element, document.getElementById('chart-container'));
// }
