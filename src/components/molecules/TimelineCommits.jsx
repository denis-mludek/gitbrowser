import React from 'react'
import ReactHighcharts from '../../../node_modules/react-highcharts/bundle/ReactHighcharts'

const TimelineCommits = ({data}) => {
  const config = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Commits timeline based on the latest 100 commits'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%e of %b'
      },
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Commits'
      },
      min: 0
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b %Y}: {point.y} commits'
    },

    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    series: [{
      name: '100 latest commits',
      data: data
    }]
  }

  return (
    <div className="raw">
      <div className="col-md-12 commitsTimeline">
        <ReactHighcharts config={config} />
      </div>
    </div>
  )
}

TimelineCommits.propTypes = {
  data: React.PropTypes.array
}

export default TimelineCommits
