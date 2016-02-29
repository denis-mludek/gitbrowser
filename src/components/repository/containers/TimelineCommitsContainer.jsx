import React, { Component } from 'react'
import Loader from 'react-loader'
import moment from 'moment'

import githubApi from '../../../services/githubApi'
import TimelineCommits from './../presentational/mainpanel/TimelineCommits'
import _ from 'underscore'

export default class TimelineCommitsContainer extends Component {
  state = {
    data: [],
    loaded: false,
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

  convertDateToUTC(data){
    return data.map((item) => [Date.parse(item[0]), item[1]])
  }

  computeCommits(commits){
    const object = commits.reduce((acc, commit) => {
      const date = commit.commit.committer.date
      const dateFormatted = moment(date).format('YYYY-MM-DD')

      const index = _.findIndex(acc, (o) => o[0]===dateFormatted )

      index===-1 ? acc.push([dateFormatted, 1]) : acc[index][1]++

      return acc
    }, [])

    const result = this.convertDateToUTC(object).reverse()
    this.setState({data:result, loaded:true})
  }

  render() {
    return (
      <Loader loaded={this.state.loaded} >
        <TimelineCommits data={this.state.data} />
      </Loader>
    )
  }
}
