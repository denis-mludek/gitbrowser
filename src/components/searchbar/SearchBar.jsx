import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import SearchResultsList from './SearchResultsList'
import './SearchBar.sass'

const MIN_CHARS = 3
const ENTER_KEY_CODE = 13
const DOWN_KEY_CODE = 40
const UP_KEY_CODE = 38
const ESC_KEY_CODE = 27

export default class SearchBar extends Component {
  static propTypes = {
    results: React.PropTypes.array,
    onChange: React.PropTypes.func
  }

  static defaultProps = {
    results: []
  }

  state = {
    text: "",
    indexHovered: -1,
    repoSelected: {},
    isOpen: false
  }

  ignoreBlur = false

  _setIgnoreBlur = (value) => {
    return () => this.ignoreBlur = value
  }

  _onChange = (event) => {
    const text = event.target.value
    this.setState({text})
    if (text.length >= MIN_CHARS) {
      this.props.onChange(text)
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
    const {results} = this.props

    if (e.keyCode === DOWN_KEY_CODE && results.length > 0) {
      this.onArrowDown()
    } else if (e.keyCode === UP_KEY_CODE && results.length > 0) {
      this.onArrowUp()
    } else if (e.keyCode === ENTER_KEY_CODE && this.state.repoSelected.name === this.state.text) {
      this.onEnter()
    }else if(e.keyCode === ESC_KEY_CODE){
      this.onEchap()
    }else{
      this.setState({
        indexHovered: -1,
        isOpen: true
      })
    }
  }

  onArrowDown = () => {
    let newIndexHovered = this.state.indexHovered
    this.props.results.length - 1 === this.state.indexHovered + 1 ? newIndexHovered = 0 : newIndexHovered++
    const repo = this.getRepoFromIndex(newIndexHovered)
    this.setState({
      text: repo.name,
      indexHovered: newIndexHovered,
      repoSelected: repo,
      isOpen: true
    })
  }

  onArrowUp(){
    let newIndexHovered = this.state.indexHovered
    newIndexHovered - 1 === -1 ? newIndexHovered = this.props.results.length - 1 : newIndexHovered--
    const repo = this.getRepoFromIndex(newIndexHovered)
    this.setState({
      text: repo.name,
      indexHovered: newIndexHovered,
      repoSelected: repo,
      isOpen: true
    })
  }

  onEchap(){
    this.setState({
      indexHovered: -1,
      isOpen: false
    })
  }

  onEnter(){
    const repo = this.state.repoSelected
    const path = `/repos/${repo.full_name}`
    browserHistory.push(path)
  }

  getRepoFromIndex(index){
    return this.props.results[index]
  }

  render() {
    return (
      <div className="col-md-offset-1 col-md-10 searchpanel">
        <div className="input-group">
          <span className="input-group-addon glyphicon glyphicon-search"></span>
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
