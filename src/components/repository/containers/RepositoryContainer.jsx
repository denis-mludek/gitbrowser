import React, { Component } from 'react'
import Loader from 'react-loader'

import githubApi from '../../../services/githubApi'

import Repository from './../Repository'

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
      .then((json) => {
        this.setState({
          repository: json,
          loaded: true
        })
      }).catch(error => {
        console.warn(error)
      })
  }

  render() {
    return (
      <Loader loaded={this.state.loaded} >
        <Repository repo={this.state.repository} />
      </Loader>
    )
  }
}
