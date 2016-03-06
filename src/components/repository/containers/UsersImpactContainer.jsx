import React, { Component } from 'react'
import LoadingWrapper from './../../loader/LoadingWrapper'

import GithubApiService from '../../../services/GithubApiService'
import MetricsComputeService from './../../../services/MetricsComputeService'
import UsersImpact from './../presentational/mainpanel/metrics/UsersImpact'
import RepositoryConstants from './../../../constants/RepositoryConstants'
import CacheService from './../../../services/CacheService'
import Error from './../../error/Error'

export default class UsersImpactContainer extends Component {
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
    let results = CacheService.getCache(fullname, RepositoryConstants.CACHE_TYPE_METRICS_USERS_IMPACT)

    if(!results){
      GithubApiService.getDataList(urlEndpoint, page, per_page)
        .then((data) => {
          results = MetricsComputeService.userImpact(data.response)
          this.loaded(results, null)
          CacheService.setCache(fullname, RepositoryConstants.CACHE_TYPE_METRICS_USERS_IMPACT, results, RepositoryConstants.CACHE_DURATION)
        }).catch((error) => {
          this.loaded([], error.message)
        })
    }else{
      this.loaded(results, null)
    }
  }

  loaded(data, error) {
    this.setState({
      data,
      error,
      loaded: true
    })
  }

  render() {
    return (
      <LoadingWrapper loaded={this.state.loaded} >
        {
          this.state.error ?
            <Error error={this.state.error} /> :
            <UsersImpact data={this.state.data} />
        }
      </LoadingWrapper>
    )
  }
}
