chart12_opts = {
  sorting: [
    'notio',
    'iotime',
    'io_percent',
    'localio',
    'local_meta',
    'globalio',
    'global_meta',
    'nprocs',
    'total_bytes',
    'thruput',
    'unique_count',
    'partshared_count',
    'allshared_count'
  ],
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: 'Breakdown of time for each job',
    margin: 20,
    style: {
      marginTop: '40px'
    }
  },
  subtitle: {
    text: ''
  },
  navigation: {
    buttonOptions: {
      verticalAlign: 'bottom',
      y: -20
    }
  },
  xAxis: [
    {
      title: {
        text: 'Jobs',
        style: {
          fontSize: '14px'
        }
      }
    }
  ],
  yAxis: [
    {
      labels: {
        style: {
          fontSize: '14px'
        }
      },
      title: {
        text: 'Distribution of time (s)',
        style: {
          fontSize: '15px'
        }
      }
    },
    {
      type: 'logarithmic',
      allowDecimals: false,
      gridLineWidth: 0,
      title: {
        text: 'Count',
        margin: 2,
        style: {
          color: 'Highcharts.getOptions().colors[0]',
          fontSize: '15px'
        },
        enabled: false
      },
      labels: {
        align: 'left',
        x: 3,
        y: 5,
        style: {
          color: 'Highcharts.getOptions().colors[0]',
          fontSize: '14px'
        }
      }
      ,
      opposite: true
    },
    {
      type: 'logarithmic',
      allowDecimals: false,
      gridLineWidth: 0,
      title: {
        text: 'Total Bytes Read/Written',
        margin: 2,
        style: {
          color: Highcharts.getOptions().colors[1],
          fontSize: '15px'
        },
        enabled: false
      },
      labels: {
        align: 'left',
        x: 3,
        y: 5,
        style: {
          color: Highcharts.getOptions().colors[1],
          fontSize: '14px'
        }
      },
      opposite: true
    },
    {
      min: 1,
      type: 'logarithmic',
      allowDecimals: false,
      title: {
        text: 'I/O throughput',
        margin: 2,
        style: {
          color: 'Highcharts.getOptions().colors[1]',
          fontSize: '15px'
        },
        enabled: false
      },
      labels: {
        align: 'left',
        x: 3,
        y: 5,
        style: {
          color: 'Highcharts.getOptions().colors[1]',
          fontSize: '14px'
        }
      },
      opposite: true
    }
  ],
  tooltip: {
    shared: true
  }
}
