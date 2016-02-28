import React, { Component } from 'react'
import Loader from 'react-loader'

import { githubApi } from '../../../services/githubApi'
import Contributors from './../presentational/mainpanel/Contributors'
import Paginator from './../presentational/mainpanel/Paginator'

export default class ContributorsContainer extends Component {
  state = {
    contributors: [],
    loaded: false,
    pagination: {}
  }

  static propTypes = {
    urlEndpoint: React.PropTypes.string
  }

  componentDidMount() {
    this.fetchContributors()
  }

  fetchContributors(page = 1, per_page = 6) {
    githubApi.getContributors(this.props.urlEndpoint, page, per_page)
      .then((data) => {
        this.setState({
          contributors: data.contributors,
          pagination: data.pagination,
          loaded: true
        })
      }).catch(error => {
        console.warn(error)
      })
  }

  _handlePaginationClick = (next) => {
    return () => {
      this.setState({loaded:false})
      this.fetchContributors(next.page, next.per_page)
    }
  }

  render() {
    return (
      <Loader loaded={this.state.loaded} >
        <Contributors contributors={this.state.contributors}>
          <Paginator pagination={this.state.pagination} onPaginationClick={this._handlePaginationClick} />
        </Contributors>
      </Loader>
    )
  }
}
