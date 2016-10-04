Template.chart1.rendered = function () {

  var chart_id = 12;
  var data_vis = chart_id;
  var numapp = $(".numapp-typeahead[data_vis=" + data_vis + "]").val();
  var user = $(".user-typeahead[data_vis=" + data_vis + "]").val();
  var app = $(".application-typeahead[data_vis=" + data_vis + "]").val();
  var start = $(".start_date_storage[data_vis=" + data_vis + "]").val();
  var end = $(".start_date_storage[data_vis=" + data_vis + "]").val();


  var filtervals = {
    url: "test",
    chart: chart_id,
    start_date: start,
    end_date: end,
    application: app,
    numapp: numapp,
    user: user
  };
  sendreq(filtervals, chart_id, function (data) {
    console.log(data);
    var options = charts[chart_id];
    var series = chart_series[chart_id];
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

    options.series = opts_series;

    // options.renderTo = ".chart_container[data_vis=" + data_vis + "]";
    // var chart = new Highcharts.Chart(options);
    var selector = ".chart_container[data_vis='" + data_vis + "']";
    console.log(selector);
    console.log($(selector));
    Highcharts.chart(selector, options);

  });
};
