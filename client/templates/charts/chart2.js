// Template.chart2.rendered = function() {
//   // alert("chart2");
// };


if (Meteor.isClient) {
  // Meteor.subscribe("Tasks");

  Template.chart2.helpers({
    createChart2: function () {
      // Gather data:
      // var allTasks = Tasks.find().count(),
      // incompleteTask = Tasks.find({checked: {$ne: true}}).count(),
      tasksData = [{
        y: 1,
        name: "Incomplete"
      }, {
        y: 3,
        name: "Complete"
      }];
      // Use Meteor.defer() to craete chart after DOM is ready:
      Meteor.defer(function () {
        // Create standard Highcharts chart with options:
        var options = charts[12];
        // options.renderTo = "chart";
        // options.series = tasksData;
        // var chart = new Highcharts.Chart(options);
        Highcharts.chart('chart', {
          options: options
        });
      });
    }
  });
}
