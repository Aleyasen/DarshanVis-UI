import React, {PropTypes} from 'react';
import * as utils from '../Utils';

var $ = require("jquery");
if (typeof document !== 'undefined') {
  require("jquery-ui");
}


var TopApps = React.createClass({
  componentDidMount: function () {
    console.log("mounted top apps");
    // utils.setup_top_apps(this.props.data);
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
          <div id="chart-container-1" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-2" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-3" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-4" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-5" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-6" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-7" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-8" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-9" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-10" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-11" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-12" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-13" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-14" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
          <div id="chart-container-15" class="col-md-4 charts" className="col-md-4"
               style={{"height":"400px", "margin":"0px"}}></div>
        </div>
      </div>
    );
  }
});


export default TopApps;
