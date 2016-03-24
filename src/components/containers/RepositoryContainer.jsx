import React, { Component } from 'react'

import { getRepository } from './../../services/GithubApiService'
import { setCache, getCache } from './../../services/CacheService'
import Repository from './../pages/Repository'
import LoadingWrapper from './../atoms/LoadingWrapper'
import { CACHE_TYPE_REPO, CACHE_DURATION_MINUTE } from './../../constants/RepositoryConstants'
import Error from './../atoms/Error'

export default class RepositoryContainer extends Component {
  state = {
    repository: {},
    loaded: false
  }

  componentDidMount() {
    this.fetchRepositoryData()
  }

  fetchRepositoryData() {
    const {userName, repoName} = this.props.params
    const fullnameRepo = `${repoName}/${userName}`
    let result = getCache(fullnameRepo, CACHE_TYPE_REPO)

    if(!result){
      getRepository(userName, repoName)
        .then((json) => {
          result = json.response
          this.loaded(result, null)
          setCache(fullnameRepo, CACHE_TYPE_REPO, result, CACHE_DURATION_MINUTE)
        }).catch((error) => {
          this.loaded({}, error.message)
        })
    }else{
      this.loaded(result, null)
    }
  }

  loaded(data, error) {
    this.setState({
      repository: data,
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
          <Repository repo={this.state.repository} />
        }
      </LoadingWrapper>
    )
  }
}
