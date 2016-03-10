import React, { Component } from 'react'
import LoadingWrapper from './../../loader/LoadingWrapper'

import Contributors from './../presentational/mainpanel/contributors/Contributors'
import Paginator from './../../paginator/Paginator'
import GithubApiService from '../../../services/GithubApiService'
import RepositoryConstants from './../../../constants/RepositoryConstants'
import CacheService from './../../../services/CacheService'
import Error from './../../error/Error'

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
          this.loaded(results, null)
          CacheService.setCache(keyCache, RepositoryConstants.CACHE_TYPE_CONTRIBUTORS, results, RepositoryConstants.CACHE_DURATION_MINUTE)
        }).catch((error) => {
          this.loaded({response:[], pagination:{}}, error.message)
        })
    }else{
      this.loaded(results, null)
    }
  }

  loaded(data, error){
    this.setState({
      contributors: data.response,
      pagination: data.pagination,
      error,
      loaded: true
    })
  }

  _handlePaginationClick = (pagination) => {
    this.setState({loaded: false})
    this.fetchContributors(pagination.page, pagination.per_page)
  }

  render() {
    return (
      <LoadingWrapper loaded={this.state.loaded} >
        {
          this.state.error ?
            <Error error={this.state.error} /> :
            <Contributors contributors={this.state.contributors}>
              <Paginator pagination={this.state.pagination} onClick={this._handlePaginationClick} />
            </Contributors>
        }
      </LoadingWrapper>
    )
  }
}
