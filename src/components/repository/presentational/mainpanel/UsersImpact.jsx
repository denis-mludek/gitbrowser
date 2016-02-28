import React from 'react'
import { Bar } from 'react-chartjs'
import ReactHighcharts from 'react-highcharts/bundle/ReactHighcharts'
import ChartsConf from './../../../../services/chartsConf'

const UsersImpact = ({data}) => {
  ReactHighcharts.Highcharts.setOptions(ChartsConf.UserImpactTheme)
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
      <h3>Users impact</h3>

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
