import React, { Component } from 'react'

import GithubApiService from './../../../services/GithubApiService'
import Repository from './../Repository'
import LoadingWrapper from './../../loader/LoadingWrapper'
import CacheService from './../../../services/CacheService'
import RepositoryConstants from './../../../constants/RepositoryConstants'
import Error from './../../error/Error'

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
    let result = CacheService.getCache(fullnameRepo, RepositoryConstants.CACHE_TYPE_REPO)

    if(!result){
      GithubApiService.getRepository(userName, repoName)
        .then((json) => {
          result = json.response
          this.loaded(result, null)
          CacheService.setCache(fullnameRepo, RepositoryConstants.CACHE_TYPE_REPO, result, RepositoryConstants.CACHE_DURATION)
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
