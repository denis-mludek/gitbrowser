import React, { Component } from 'react'
import Loader from 'react-loader'

import { githubApi } from '../../../services/githubApi'

import Repository from './../Repository'

import './../Repository.sass'

export default class RepositoryContainer extends Component {
  state = {
    repository: {},
    loaded: false
  }

  componentDidMount(){
    this.fetchRepositoryData()
  }

  fetchRepositoryData(){
    githubApi.getRepository(this.props.params.userName, this.props.params.repoName)
      .then(json => {
        this.setState({repository:json, loaded:true})
      }).catch(error => {
        console.warn(error)
      })
  }

  render() {
    const params = Object.assign({}, {repo: this.state.repository, loaded: this.state.loaded})
    return (
      <Repository {...params} />
    )
  }
}
