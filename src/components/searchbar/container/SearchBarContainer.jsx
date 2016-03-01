import React, { Component } from 'react'

import githubApi from '../../../services/githubApi'
import SearchBar from './../SearchBar'

export default class SearchBarContainer extends Component {
  state = {
    results: []
  }

  fetchRepos(text) {
    githubApi.searchInRepositories(text)
      .then((json) => {
        this.setState({results: json.response.items})
      }).catch((error) => {
        console.warn(error)
      })
  }

  render() {
    return (
      <SearchBar results={this.state.results} onChange={this.fetchRepos.bind(this)} />
    )
  }
}
