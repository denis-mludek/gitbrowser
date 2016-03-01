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
    const {userName, repoName} = this.props.params

    githubApi.getRepository(userName, repoName)
      .then((json) => {
        this.setState({
          repository: json.response,
          loaded: true
        })
      }).catch((error) => {
        console.warn(error.message)
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
