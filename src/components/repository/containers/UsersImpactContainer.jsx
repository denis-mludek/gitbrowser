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
    githubApi.getDataList(this.props.urlEndpoint, page, per_page)
      .then((data) => {
        this.computeCommits(data.list)
      }).catch(error => {
        console.warn(error)
      })
  }

  computeCommits(commits){
    const dataComputed = commits.reduce((acc, commit) => {
      const index = acc.findIndex((o)=> o[0]===commit.commit.committer.name)
      if(index===-1){
        acc.push([commit.commit.committer.name, 1])
      }else{
        acc[index][1]++
      }
      return acc
    }, [])

    // Array cloned, sorted (ascending), and reversed (descending)
    const resultSorted = dataComputed.slice(0).sort((a,b) => b[1]-a[1])
    this.setState({data:resultSorted, loaded:true})
  }

  render() {
    return (
      <Loader loaded={this.state.loaded} >
        <UsersImpact data={this.state.data} />
      </Loader>
    )
  }
}
