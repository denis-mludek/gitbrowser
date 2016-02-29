import React from 'react'
import ReactHighcharts from 'react-highcharts/bundle/ReactHighcharts'
import chartsConf from './conf/chartsConf'


const Metrics = ({children}) => {
  ReactHighcharts.Highcharts.setOptions(chartsConf.DarkTheme)
  return (
    <div className="raw metrics">
      <h2>Metrics</h2>

      {children}
    </div>
  )
}

export default Metrics
