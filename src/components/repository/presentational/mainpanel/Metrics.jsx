import React, { Component} from 'react'
import ReactHighcharts from 'react-highcharts/bundle/ReactHighcharts'

import chartsConf from './conf/chartsConf'
import UsersImpactContainer from './../../containers/UsersImpactContainer'
import TimelineCommitsContainer from './../../containers/TimelineCommitsContainer'


export default class Metrics extends Component {
  state = {
    panelSelected: 'UsersImpact'
  }

  static propTypes = {
    urlEndpoint: React.PropTypes.string
  }

  constructor(props) {
    super(props)
    ReactHighcharts.Highcharts.setOptions(chartsConf.DarkTheme)
  }

  _handleMenuClick(panel) {
    this.setState({panelSelected: panel})
  }

  graphToRender() {
    const {urlEndpoint} = this.props

    switch (this.state.panelSelected) {
      case 'TimelineCommits':
        return <TimelineCommitsContainer urlEndpoint={urlEndpoint} />
        break
      default:
        return <UsersImpactContainer urlEndpoint={urlEndpoint} />
    }
  }

  render() {
    return (
      <div className="raw metrics">
        <h2>Metrics</h2>

        <div className="menu">
          <div className="title" onClick={this._handleMenuClick.bind(this, 'default')}>Users impact</div>
          <div className="title" onClick={this._handleMenuClick.bind(this, 'TimelineCommits')}>Commits timeline</div>
        </div>

        { this.graphToRender() }
      </div>
    )
  }
}
