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
    
  });
};
