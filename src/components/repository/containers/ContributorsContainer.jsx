import React, { Component } from 'react'
import LoadingWrapper from './../../loader/LoadingWrapper'

import Contributors from './../presentational/mainpanel/Contributors'
import Paginator from './../presentational/mainpanel/Paginator'
import GithubApiService from '../../../services/GithubApiService'
import RepositoryConstants from './../../../constants/RepositoryConstants'
import CacheService from './../../../services/CacheService'

export default class ContributorsContainer extends Component {
  state = {
    contributors: [],
    loaded: false,
    pagination: {}
  }

  static propTypes = {
    urlEndpoint: React.PropTypes.string,
    fullname: React.PropTypes.string
  }

  componentDidMount() {
    this.fetchContributors()
  }

  fetchContributors(page = 1, per_page = 6) {
    const {fullname, urlEndpoint} = this.props
    const keyCache = `${fullname}_${page}`
    let results = CacheService.getCache(keyCache, RepositoryConstants.CACHE_TYPE_CONTRIBUTORS)

    if(!results){
      GithubApiService.getDataList(urlEndpoint, page, per_page)
        .then((data) => {
          results = data
          this.loaded(results)
          CacheService.setCache(keyCache, RepositoryConstants.CACHE_TYPE_CONTRIBUTORS, results, RepositoryConstants.CACHE_DURATION)
        }).catch((error) => {
          console.warn(error.message)
        })
    }else{
      this.loaded(results)
    }
  }

  loaded(data){
    this.setState({
      contributors: data.response,
      pagination: data.pagination,
      loaded: true
    })
  }

  _handlePaginationClick = (next) => {
    return () => {
      this.setState({loaded: false})
      this.fetchContributors(next.page, next.per_page)
    }
  }

  render() {
    return (
      <LoadingWrapper loaded={this.state.loaded} >
        <Contributors contributors={this.state.contributors}>
          <Paginator pagination={this.state.pagination} onPaginationClick={this._handlePaginationClick} />
        </Contributors>
      </LoadingWrapper>
    )
  }
}
