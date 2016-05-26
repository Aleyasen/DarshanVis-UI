/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';
import config from '../../config';
var Chart = require('../Charts/Chart');
import * as utils from '../Utils';
import ReactDOM from 'react-dom';
import MenuCats  from '../../config/categories';
var $ = require("jquery");
if (typeof document !== 'undefined') {
  require("jquery-ui");
}


var Menu = React.createClass({
  getInitialState: function () {
    return {items: MenuCats.cats};
  },
  componentDidMount: function () {
    this.state.items[0].charts[0].color = "#C5BFC7";
    this.forceUpdate();
  }
  ,
  updateMenu: function (itemId) {
    console.log("updateMenu");
    console.log(this.state.items);
    this.state.items.forEach(function (subcat) {
      subcat.charts.forEach(function (item) {
        if (item.id == itemId) {
          item.color = "#C5BFC7";
        } else {
          item.color = "white";
        }
      });
    })
    this.forceUpdate();
  },
  render: function () {
    var rowsgroup = [];
    var this_ = this;
    this.state.items.forEach(function (item) {
      rowsgroup.push(<MenuRowGroup item={item} updateMenu={this_.updateMenu}/>);
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
    var this_ = this;
    charts.forEach(function (item) {
      console.log(item);
      rows.push(<MenuRow item={item} updateMenu={this_.props.updateMenu}/>);
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
      this.props.updateMenu(this.props.item.id);
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
      <li style={{"backgroundColor":this.props.item.color}} onClick={this.handleClick}>
        <a>{this.props.item.title}</a>
      </li>
    );
  }
});


export default Menu;
