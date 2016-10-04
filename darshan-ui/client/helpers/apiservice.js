main = function () {
  console.log("testing");
}

sendreq = function (filtervals, chart_id, callback) {
  $.ajax({
    url: server_url + '/index.php/jobs/filter',
    dataType: 'json',
    type: 'POST',
    data: JSON.stringify(filtervals),
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


var callback = function (data) {
  console.log("entered callback");
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



