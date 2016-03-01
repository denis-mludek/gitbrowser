import React, { Component } from 'react'
import Loader from 'react-loader'

import githubApi from '../../../services/githubApi'
import UsersImpact from './../presentational/mainpanel/UsersImpact'

export default class UsersImpactContainer extends Component {
  state = {
    data: [],
    loaded: false
  }

  static propTypes = {
    urlEndpoint: React.PropTypes.string
  }

  componentDidMount() {
    this.fetchCommits()
  }

  fetchCommits(page = 1, per_page = 100) {
    const {urlEndpoint} = this.props

    githubApi.getDataList(urlEndpoint, page, per_page)
      .then((data) => {
        this.computeCommits(data.response)
      }).catch((error) => {
        console.warn(error)
      })
  }

  computeCommits(commits){
    const dataComputed = commits.reduce((acc, commit) => {
      const index = acc.findIndex((o)=> o[0]===commit.commit.author.name)
      index===-1 ? acc.push([commit.commit.author.name, 1]) : acc[index][1]++
      return acc
    }, [])

    const resultSorted = dataComputed.slice(0).sort((a,b) => b[1]-a[1])
    this.setState({
      data: resultSorted,
      loaded: true
    })
  }

  render() {
    return (
      <Loader loaded={this.state.loaded} >
        <UsersImpact data={this.state.data} />
      </Loader>
    )
  }
}
