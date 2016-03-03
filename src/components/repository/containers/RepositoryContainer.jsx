import React, { Component } from 'react'

import GithubApiService from './../../../services/GithubApiService'
import Repository from './../Repository'
import LoadingWrapper from './../../loader/LoadingWrapper'
import CacheService from './../../../services/CacheService'
import RepositoryConstants from './../../../constants/RepositoryConstants'

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
          this.loaded(result)
          CacheService.setCache(fullnameRepo, RepositoryConstants.CACHE_TYPE_REPO, result, RepositoryConstants.CACHE_DURATION)
        }).catch((error) => {
          console.warn(error.message)
        })
    }else{
      this.loaded(result)
    }
  }

  loaded(data) {
    this.setState({
      repository: data,
      loaded: true
    })
  }

  render() {
    return (
      <LoadingWrapper loaded={this.state.loaded} >
        <Repository repo={this.state.repository} />
      </LoadingWrapper>
    )
  }
}
