import React, { Component } from 'react'
import debounce from 'lodash.debounce'

import githubApi from '../../../services/githubApi'
import SearchBar from './../SearchBar'

export default class SearchBarContainer extends Component {
  state = {
    results: []
  }

  componentDidMount(){
    this.fetchRepos = debounce(this.fetchRepos,500)
  }

  fetchRepos(text) {
    githubApi.searchInRepositories(text)
      .then(json => {
        this.setState({results: json.items})
      }).catch(error => {
        console.warn(error)
      })
  }

  render() {
    return (
      <div className="col-md-offset-1 col-md-10 searchpanel">
        <SearchBar results={this.state.results} onChange={this.fetchRepos.bind(this)} />
      </div>
    )
  }
}
