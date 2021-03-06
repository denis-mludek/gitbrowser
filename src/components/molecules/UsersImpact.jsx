import React from 'react'
import ReactHighcharts from '../../../node_modules/react-highcharts/bundle/ReactHighcharts'

const UsersImpact = ({data}) => {
  const config = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Users impact based on the latest 100 commits'
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Commits'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: '<b>{point.y} commits</b>'
    },
    series: [{
      name: 'Commits',
      data: data,
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y}',
        y: 10,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  }

  return (
    <div className="raw">
      <div className="col-md-12 usersImpact">
        <ReactHighcharts config={config}/>
      </div>
    </div>
  )
}

UsersImpact.propTypes = {
  data: React.PropTypes.array
}

export default UsersImpact
