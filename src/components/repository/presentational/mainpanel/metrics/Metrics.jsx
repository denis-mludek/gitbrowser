import React, { Component} from 'react'
import ReactHighcharts from '../../../../../../node_modules/react-highcharts/bundle/ReactHighcharts'
import classNames from 'classnames'

import chartsConf from './conf/chartsConf'
import UsersImpactContainer from './../../../containers/UsersImpactContainer'
import TimelineCommitsContainer from './../../../containers/TimelineCommitsContainer'

import './Metrics.sass'

const MenuPanelButton = ({onClick, title, style}) => {
  return (
    <li className={style} onClick={onClick}>{title}</li>
  )
}

export default class Metrics extends Component {
  static propTypes = {
    urlEndpoint: React.PropTypes.string,
    fullname: React.PropTypes.string
  }

  metrics = ['Users impact','Commits timeline']

  state = {
    panelSelected: 'Users impact'
  }

  constructor(props){
    super(props)
    ReactHighcharts.Highcharts.setOptions(chartsConf.DarkTheme)
  }

  handleMenuClick(title) {
    this.setState({
      panelSelected: title
    })
  }

  graphToRender() {
    const {urlEndpoint, fullname} = this.props

    switch (this.state.panelSelected) {
      case this.metrics[1]:
        return <TimelineCommitsContainer urlEndpoint={urlEndpoint} fullname={fullname}/>
        break
      default:
        return <UsersImpactContainer urlEndpoint={urlEndpoint} fullname={fullname} />
    }
  }

  render() {
    return (
      <div className="raw metrics">
        <h2>Metrics</h2>

        <ul className="menu-panel" >
          { this.metrics.map((metric, i) => {
            const style = classNames({
                'button': true,
                'button-selected': metric === this.state.panelSelected
              })

            return (
              <MenuPanelButton
                key={i}
                title={metric}
                onClick={this.handleMenuClick.bind(this, metric)}
                style={style}
              />
            )
          })}
        </ul>

        { this.graphToRender() }
      </div>
    )
  }
}
