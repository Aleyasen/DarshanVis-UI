import React, {PropTypes} from 'react';
var Chart = require('../Chart');
import * as utils from '../../Utils';
import ReactDOM from 'react-dom';
var $ = require("jquery");
if (typeof document !== 'undefined') {
  require("jquery-ui");
}


var TopApps = React.createClass({
  componentDidMount: function () {
    console.log("mounted top apps");
    utils.setup_top_apps(this.props.data);
  },
  render: function () {
    // var rowsgroup = [];
    // var this_ = this;
    // this.state.items.forEach(function (item) {
    //   rowsgroup.push(<MenuRowGroup item={item} updateMenu={this_.updateMenu}/>);
    // });
    return (
      <div id="15-scatter-containers" hidden>
          <div id="min_max_button_div" hidden>
              <button id="min_max_button" class="btn btn-large btn-primary">Constant Min/Max Toggle</button>
          </div>
          <div class="row">
              <div id="chart-container-1" class="col-md-4 charts" className="col-md-4" style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-2" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-3" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-4" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-5" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-6" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-7" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-8" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-9" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-10" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-11" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-12" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-13" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-14" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
              <div id="chart-container-15" class="col-md-4 charts" className="col-md-4"   style={{"height":"400px", "margin":"0px"}}></div>
          </div>
      </div>
    );
  }
});

// Menu.propTypes = {
//   // children: PropTypes.element.isRequired,
// };


// var MenuRowGroup = React.createClass({
//   render: function () {
//     var rows = [];
//     // var items = categories.hello;
//     var charts = this.props.item.charts;
//     var this_ = this;
//     charts.forEach(function (item) {
//       console.log(item);
//       rows.push(<MenuRow item={item} updateMenu={this_.props.updateMenu}/>);
//     });
//     return (

//       <li style={{"backgroundColor":"#ffffff"}}>
//         <b>{this.props.item.name}</b>
//         {rows}
//       </li>
//     );
//   }
// });

// var callback = function (data) {
//   var chart_id = this.chart;

//   if (chart_id == "17") {
//     utils.setup_chart_special(data);
//   }
//   else if (chart_id == "10" || chart_id == "9" || chart_id == "4") {
//     utils.setup_top_chart(data);
//   }
//   else {
//     $("#chart-config").hide();
//     var opts = utils.charts[chart_id];
//     var series = utils.chart_series[chart_id];
//     var queryResult = data;
//     var opts_series = [];
//     for (var i = 0; i < series.length; i++) {
//       if (!series[i]["not-in-chart"]) {
//         var attr = series[i]["attribute"];
//         var qr = queryResult[attr];
//         if (qr != null) {
//           series[i]["data"] = [];
//           for (var j = 0; j < qr.length; j++) {
//             var num = Number(qr[j]);
//             if (num != 0) {
//               series[i]["data"].push([j, num]);
//             }
//           }
//           opts_series.push(series[i]);
//         }
//       }
//     }
//     // console.log("OPTS SERIES");
//     console.log(opts_series);

//     opts.series = opts_series;
//     var element = React.createElement(Chart, {container: 'chart', options: opts});

//     if (typeof window !== 'undefined') {
//       ReactDOM.render(element, document.getElementById('chart'));
//     }
//   }
//   if (typeof window != 'undefined') {
//     $.get(config.server_url + '/index.php/jobs/UserList', {
//         user: "",
//         application: "null"
//       },
//       function (data) {
//         var users = data;
//         $.get(config.server_url + '/index.php/jobs/ApplicationList', {
//             application: "",
//             user: "null"
//           },
//           function (data) {
//             var apps = data;
//             // $("#user-typeahead").typeahead({source:users});
//             // $("#application-typeahead").typeahead({source: apps});

//             $("#user-typeahead").autocomplete({
//               source: users,
//               messages: {
//                 noResults: '',
//                 results: function () {
//                 }
//               }
//             });
//             $("#application-typeahead").autocomplete({
//               source: apps,
//               messages: {
//                 noResults: '',
//                 results: function () {
//                 }
//               }
//             });
//           });
//       });

//   }

// };

// var MenuRow = React.createClass({
//   handleClick: function (e) {
//     if (typeof window !== 'undefined') {
//       this.props.updateMenu(this.props.item.id);
//       console.log("handle click");
//       var chart_id = this.props.item.id;
//       $("#chart").html("<div><center>Loading...</center></div>");
//       $("#chart_id_storage").val(chart_id);
//       var data = {
//         url: "test",
//         chart: chart_id
//       }

//       $.ajax({
//         url: config.server_url + '/index.php/jobs/filter',
//         // url: "http://localhost/index.php/jobs/filter",
//         dataType: 'json',
//         type: 'POST',
//         data: JSON.stringify(data),
//         chart: chart_id,
//         success: callback,
//         error: function (xhr, status, err) {
//           console.log("ERROR");
//           console.log(xhr);
//           console.log(status);
//           console.log(err);
//         }
//       });
//     }
//   },
//   render: function () {
//     return (
//       <li style={{"backgroundColor":this.props.item.color}} onClick={this.handleClick}>
//         <a>{this.props.item.title}</a>
//       </li>
//     );
//   }
// });


export default TopApps;
