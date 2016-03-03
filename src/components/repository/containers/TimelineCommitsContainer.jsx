import React, { Component } from 'react'
import LoadingWrapper from './../../loader/LoadingWrapper'

import GithubApiService from '../../../services/GithubApiService'
import MetricsComputeService from './../../../services/MetricsComputeService'
import TimelineCommits from './../presentational/mainpanel/TimelineCommits'
import RepositoryConstants from './../../../constants/RepositoryConstants'
import CacheService from './../../../services/CacheService'

export default class TimelineCommitsContainer extends Component {
  state = {
    data: [],
    loaded: false
  }

  static propTypes = {
    urlEndpoint: React.PropTypes.string,
    fullname: React.PropTypes.string
  }

  componentDidMount() {
    this.fetchCommits()
  }

  fetchCommits(page = 1, per_page = 100) {
    const {fullname, urlEndpoint} = this.props
    let results = CacheService.getCache(fullname, RepositoryConstants.CACHE_TYPE_METRICS_TIMELINE_COMMITS)

    if(!results){
      GithubApiService.getDataList(urlEndpoint, page, per_page)
        .then((data) => {
          results = MetricsComputeService.commitsTimeline(data.response)
          this.loaded(results)
          CacheService.setCache(fullname, RepositoryConstants.CACHE_TYPE_METRICS_TIMELINE_COMMITS, results, RepositoryConstants.CACHE_DURATION)
        }).catch((error) => {
          console.warn(error)
        })
    }else{
      this.loaded(results)
    }
  }

  loaded(data) {
    this.setState({
      data,
      loaded: true
    })
  }

  render() {
    return (
      <LoadingWrapper loaded={this.state.loaded} >
        <TimelineCommits data={this.state.data} />
      </LoadingWrapper>
    )
  }
}
