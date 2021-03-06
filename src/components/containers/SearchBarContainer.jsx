import React, { Component } from 'react'

import { searchInRepositories }  from './../../services/GithubApiService'
import { setCache, getCache } from './../../services/CacheService'
import { CACHE_TYPE_SEARCH, CACHE_DURATION_MINUTE } from './../../constants/RepositoryConstants'
import SearchBar from './../organisms/SearchBar'
import LoadingWrapper from './../atoms/LoadingWrapper'
import Error from './../atoms/Error'

export default class SearchBarContainer extends Component {
  state = {
    results: {},
    error: null
  }

  fetchRepos(text) {
    const resultsCache = getCache(text, CACHE_TYPE_SEARCH)

    if(!resultsCache) {
      searchInRepositories(text)
        .then((json) => {
          this.setState({
            results: json.response,
            error: null
          })
          setCache(text, CACHE_TYPE_SEARCH, json.response, CACHE_DURATION_MINUTE)
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
