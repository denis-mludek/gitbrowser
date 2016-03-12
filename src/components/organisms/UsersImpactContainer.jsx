import React, { Component } from 'react'

import LoadingWrapper from './../atoms/LoadingWrapper'
import { getDataList } from './../../services/GithubApiService'
import { userImpact } from './../../services/MetricsComputeService'
import { setCache, getCache } from './../../services/CacheService'
import UsersImpact from './../molecules/UsersImpact'
import RepositoryConstants from './../../constants/RepositoryConstants'
import Error from './../atoms/Error'

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
    let results = getCache(fullname, RepositoryConstants.CACHE_TYPE_METRICS_USERS_IMPACT)

    if(!results){
      getDataList(urlEndpoint, page, per_page)
        .then((data) => {
          results = userImpact(data.response)
          this.loaded(results, null)
          setCache(fullname, RepositoryConstants.CACHE_TYPE_METRICS_USERS_IMPACT, results, RepositoryConstants.CACHE_DURATION_MINUTE)
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
