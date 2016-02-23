import React, { Component } from 'react'
import _ from 'underscore'

import SearchResultsList from './SearchResultsList'
import { githubApi } from '../../services/githubApi'
import './SearchBar.sass'

const MIN_CHARS = 3
const ENTER_KEY_CODE = 13

export default class SearchBar extends Component {
  static propTypes = {  }
  static defaultProps = {  }
  state = { text: "", results: [] }

  constructor(props){
    super(props)
    this.fetchRepos = _.debounce(this.fetchRepos,500)
  }

  _onChange = (event) => {
    const text = event.target.value
    if (text.length >= MIN_CHARS) {
      this.setState({text})
      this.fetchRepos(text)
    }
  }

  _onKeyPress = () => {
    //TODO
  }

  _onKeyDown = () => {
    //TODO
  }

  _onKeyPress = (event) => {
    //TODO
  }

  fetchRepos(text) {
    githubApi.searchInRepositories(text)
      .then(json => {
        this.setState({results: json.items});
      }).catch(error => {
        console.warn(error)
      })
  }

  render() {
    return (
      <div>
          <div className="col-sm-10 searchpanel">
            <input type="text"
                   className="form-control input-lg"
                   placeholder="Search knowledge here"
                   autoFocus="true"
                   onChange={this._onChange}
                   onKeyDown={this._onKeyDown}
                   onKeyPress={this._onKeyPress}
              />

            <SearchResultsList reposList={this.state.results} />
          </div>
      </div>
    )
  }
}
