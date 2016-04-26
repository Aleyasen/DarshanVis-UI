/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';


function Menu({params}) {
  var rowsgroup = [];
  // var items = categories.hello;
  var items = cats;
  items.forEach(function (item) {
    item.color = "white";
    console.log(item);
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
    <a href="#">{this.props.item.name}</a>
    {rows}
    </li>
    );
  }
});

var MenuRow = React.createClass({
  render: function () {
    return (
      <li style={{"backgroundColor":"white"}}>
        <a href={"index?c=" + this.props.item.id}>{this.props.item.title}</a>
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
