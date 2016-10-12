Highcharts.setOptions({
  chart: {
    zoomType: "xy",
    width: 900,
    height: 500
    // backgroundColor: {
    //   linearGradient: [0, 0, 500, 500],
    //   stops: [
    //     [0, 'rgb(255, 255, 255)'],
    //     [1, 'rgb(240, 240, 255)']
    //   ]
    // },
    // borderWidth: 2,
    // plotBackgroundColor: 'rgba(255, 255, 255, .9)',
    // plotShadow: true,
    // plotBorderWidth: 1
  }
});



charts = {
  "17": {
    "title": {
      "text": "Scatter plot of application's I/O characteristics"
    },
    "subtitle": {
      "text": ""
    },
    "xAxis": {
      "title": "Jobs",
      "attribute": "total_bytes",
      "type": "linear",
      "options": [
        "start_time",
        "total_bytes",
        "nprocs",
        "thruput",
        "uid"
      ]
    },
    "yAxis": {
      "title": "Throughput",
      "type": "linear",
      "options": [
        "start_time",
        "total_bytes",
        "nprocs",
        "thruput",
        "uid"
      ]
    }
  },
  "12": {
    "sorting": [
      "notio",
      "iotime",
      "io_percent",
      "localio",
      "local_meta",
      "globalio",
      "global_meta",
      "nprocs",
      "total_bytes",
      "thruput",
      "unique_count",
      "partshared_count",
      "allshared_count"
    ],
    "chart": {
      "zoomType": "xy"
    },
    "title": {
      "text": "Breakdown of time for each job",
      "margin": 20,
      "style": {
        "margin-top": "40px"
      }
    },
    "subtitle": {
      "text": ""
    },
    "navigation": {
      "buttonOptions": {
        "verticalAlign": "bottom",
        "y": -20
      }
    },
    "xAxis": [
      {
        "title": {
          "text": "Jobs",
          "style": {
            "font-size": "14px"
          }
        }
      }
    ],
    "yAxis": [
      {
        "labels": {
          "style": {
            "font-size": "14px"
          }
        },
        "title": {
          "text": "Distribution of time (s)",
          "style": {
            "font-size": "15px"
          }
        }
      },
      {
        "type": "logarithmic",
        "allowDecimals": false,
        "gridLineWidth": 0,
        "title": {
          "text": "Count",
          "margin": 2,
          "style": {
            "color": "Highcharts.getOptions().colors[0]",
            "font-size": "15px"
          },
          "enabled": false
        },
        "labels": {
          "align": "left",
          "x": 3,
          "y": 5,
          "style": {
            "color": "Highcharts.getOptions().colors[0]",
            "font-size": "14px"
          }
        }
        ,
        "opposite": true
      },
      {
        "type": "logarithmic",
        "allowDecimals": false,
        "gridLineWidth": 0,
        "title": {
          "text": "Total Bytes Read/Written",
          "margin": 2,
          "style": {
            "color": "Highcharts.getOptions().colors[1]",
            "font-size": "15px"
          },
          "enabled": false
        },
        "labels": {
          "align": "left",
          "x": 3,
          "y": 5,
          "style": {
            "color": "Highcharts.getOptions().colors[1]",
            "font-size": "14px"
          }
        },
        "opposite": true
      },
      {
        "min": 1,
        "type": "logarithmic",
        "allowDecimals": false,
        "title": {
          "text": "I/O throughput",
          "margin": 2,
          "style": {
            "color": "Highcharts.getOptions().colors[1]",
            "font-size": "15px"
          },
          "enabled": false
        },
        "labels": {
          "align": "left",
          "x": 3,
          "y": 5,
          "style": {
            "color": "Highcharts.getOptions().colors[1]",
            "font-size": "14px"
          }
        },
        "opposite": true
      }
    ],
    "tooltip": {
      "shared": true
    }
  }
};

chart_series = {
  "12": [
    {
      "attribute": "localio",
      "name": "Non-global Data I/O",
      "description": "Non-global data I/O: The amount of time this job spent in function calls to read/write its files not accessed by all processes.",
      "color": "#5C9430",
      "stacking": "percent",
      "type": "column",
      "yAxis": 0
    },
    {
      "attribute": "local_meta",
      "name": "Non-global Metadata",
      "description": "Non-global Metadata: The amount of time this job spent in metadata function calls (open, close, seek, etc.) for non-global files, i.e., files that one or more but not all processes opened.",
      "color": "#C73308",
      "stacking": "percent",
      "type": "column",
      "yAxis": 0
    },
    {
      "attribute": "globalio",
      "name": "Global Data I/O",
      "description": "Global data I/O: The amount of time this job spent in function calls to read/write global files, i.e., files that all processes opened.",
      "color": "#68DB49",
      "stacking": "normal",
      "type": "column",
      "yAxis": 0
    },
    {
      "attribute": "global_meta",
      "name": "Global Metadata",
      "description": "Global Metadata: The amount of time this job spent in metadata function calls (open, close, seek, etc.) for global files, i.e., files that all processes opened.",
      "color": "#F25B47",
      "stacking": "percent",
      "type": "column",
      "yAxis": 0
    },
    {
      "attribute": "notio",
      "name": "Not I/O",
      "description": "Not I/O: The amount of time this job spent outside of I/O function calls (data and metadata).",
      "color": "#BDD0D5",
      "stacking": "percent",
      "type": "column",
      "visible": false,
      "yAxis": 0
    },
    {
      "attribute": "nprocs",
      "name": "Number of Processes",
      "description": "# of Processes: The number of processes this job had.",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 1,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "diamond",
        "enabled": true,
        "radius": 3,
        "fillColor": "#7F77B4"
      }
    }
    ,
    {
      "attribute": "total_bytes",
      "name": "Total Bytes Read/Written",
      "description": "Total Bytes Read/Written: The total number of bytes this job read and wrote.",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 2,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "circle",
        "enabled": true,
        "radius": 3,
        "fillColor": "#BF53B4"
      }
    },
    {
      "attribute": "thruput",
      "name": "I/O throughput",
      "description": "I/O throughput",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 3,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "triangle-down",
        "enabled": true,
        "radius": 3,
        "fillColor": "#000000"
      }
    },
    {
      "attribute": "unique_count",
      "name": "Number of local files",
      "description": "Number of local files: Number of files accessed by 1 processes only",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 1,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "triangle",
        "enabled": true,
        "radius": 3,
        "fillColor": "#000099"
      }
    },
    {
      "attribute": "partshared_count",
      "name": "Number of partshared files",
      "description": "Number of partshared files: Number of files accessed by a proper subset of processes",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 1,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "triangle",
        "enabled": true,
        "radius": 3,
        "fillColor": "#FF9900"
      }
    },
    {
      "attribute": "allshared_count",
      "name": "Number of global files",
      "description": "Number of global files: Number of files accessed by all processes",
      "color": "#BDD0D5",
      "stacking": "normal",
      "type": "scatter",
      "yAxis": 1,
      "lineWidth": 0,
      "visible": false,
      "dashStyle": "shortdot",
      "marker": {
        "symbol": "triangle",
        "enabled": true,
        "radius": 3,
        "fillColor": "#CC00CC"
      }
    },
    {
      "attribute": "iotime",
      "name": "I/O Time",
      "not-in-chart": true

    },
    {
      "attribute": "io_percent",
      "name": "Percentage of runtime spent in I/O",
      "not-in-chart": true
    }
  ]
};
