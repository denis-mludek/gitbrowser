import React, { Component } from 'react'

import GithubApiService from './../../../services/GithubApiService'
import CacheService from './../../../services/CacheService'
import RepositoryConstants from './../../../constants/RepositoryConstants'
import SearchBar from './../SearchBar'
import LoadingWrapper from './../../loader/LoadingWrapper'
import Error from './../../error/Error'

export default class SearchBarContainer extends Component {
  state = {
    results: {},
    error: null
  }

  fetchRepos(text) {
    const resultsCache = CacheService.getCache(text, RepositoryConstants.CACHE_TYPE_SEARCH)

    if(!resultsCache) {
      GithubApiService.searchInRepositories(text)
        .then((json) => {
          this.setState({
            results: json.response,
            error: null
          })
          CacheService.setCache(text, RepositoryConstants.CACHE_TYPE_SEARCH, json.response, RepositoryConstants.CACHE_DURATION)
        }).catch((error) => {
          this.setState({
            error: error.message,
            results: {}
          })
        })
    }else{
      this.setState({
        results: resultsCache
      })
    }
  }

  render() {
    return (
      <div>
        <SearchBar results={this.state.results} onChange={this.fetchRepos.bind(this)} />
        <Error error={this.state.error} />
      </div>
    )
  }
}
