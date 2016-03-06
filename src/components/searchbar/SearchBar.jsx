import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import debounce from 'lodash.debounce'

import SearchResultsList from './SearchResultsList'
import './SearchBar.sass'

const MIN_CHARS = 3
const ENTER_KEY_CODE = 13
const DOWN_KEY_CODE = 40
const UP_KEY_CODE = 38
const ESC_KEY_CODE = 27

export default class SearchBar extends Component {
  static propTypes = {
    results: React.PropTypes.object,
    onChange: React.PropTypes.func
  }

  state = {
    text: "",
    indexHovered: -1,
    repoSelected: {},
    isOpen: false
  }

  ignoreBlur = false

  constructor(props){
    super(props)
    this.fetchRepos = debounce(this.props.onChange, 500)
  }

  componentWillReceiveProps(nextProps) {
    nextProps.results.items ? this.setState({isOpen: true}): null
  }

  _setIgnoreBlur = (value) => {
    this.ignoreBlur = value
  }

  _onChange = (event) => {
    const text = event.target.value
    this.setState({text, isOpen: false})

    if(text.length >= MIN_CHARS) {
      this.fetchRepos(text)
    }
  }

  _onBlur = () => {
    if(!this.ignoreBlur){
      this.setState({
        isOpen: false,
        indexHovered: -1
      })
    }
  }

  _onFocus = () => {
    this.setState({isOpen: true})
  }

  _onClick = () => {
    !this.state.isOpen ? this.setState({isOpen: true}) : null
  }

  _onKeyDown = (e) => {
    const {total_count} = this.props.results

    if (e.keyCode === DOWN_KEY_CODE && total_count > 0) {
      this.onArrowDown()
    } else if (e.keyCode === UP_KEY_CODE && total_count > 0) {
      this.onArrowUp(e)
    } else if (e.keyCode === ENTER_KEY_CODE && this.state.repoSelected.name === this.state.text) {
      this.onEnter()
    }else if(e.keyCode === ESC_KEY_CODE){
      this.onEchap()
    }else{
      this.setState({
        indexHovered: -1,
        isOpen: this.state.text.length > 1
      })
    }
  }

  onArrowDown() {
    let newIndexHovered = this.state.indexHovered
    this.state.indexHovered + 1 > this.props.results.items.length - 1 ? newIndexHovered = 0 : newIndexHovered++
    const repo = this.getRepoFromIndex(newIndexHovered)
    this.setState({
      text: repo.name,
      indexHovered: newIndexHovered,
      repoSelected: repo,
      isOpen: true
    })
  }

  onArrowUp(e) {
    e.preventDefault()
    let newIndexHovered = this.state.indexHovered
    newIndexHovered - 1 === -1 ? newIndexHovered = this.props.results.items.length - 1 : newIndexHovered--
    const repo = this.getRepoFromIndex(newIndexHovered)
    this.setState({
      text: repo.name,
      indexHovered: newIndexHovered,
      repoSelected: repo,
      isOpen: true
    })
  }

  onEchap() {
    this.setState({
      indexHovered: -1,
      isOpen: false
    })
  }

  onEnter() {
    const repo = this.state.repoSelected
    const path = `/repos/${repo.full_name}`
    browserHistory.push(path)
  }

  getRepoFromIndex(index) {
    return this.props.results.items[index]
  }

  render() {
    return (
      <div className="searchpanel">
        <div className="input-group">
          <div className="input-group-addon"><i className="glyphicon glyphicon-search"></i></div>
          <input type="text"
                 className="form-control input-lg"
                 placeholder="Search repositories"
                 autoFocus="true"
                 onChange={this._onChange}
                 onKeyDown={this._onKeyDown}
                 onBlur={this._onBlur}
                 onClick={this._onClick}
                 onFocus={this._onFocus}
                 value={this.state.text}
            />
        </div>

        <SearchResultsList
          results={this.props.results}
          indexHovered={this.state.indexHovered}
          isOpen={this.state.isOpen}
          setIgnoreBlur={this._setIgnoreBlur}
        />
      </div>
    )
  }
}
