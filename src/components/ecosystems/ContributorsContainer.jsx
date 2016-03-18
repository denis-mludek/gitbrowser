import React, { Component } from 'react'

import LoadingWrapper from './../atoms/LoadingWrapper'
import { getDataList } from './../../services/GithubApiService'
import { setCache, getCache } from './../../services/CacheService'
import Contributors from './../organisms/Contributors'
import Paginator from './../atoms/Paginator'
import { CACHE_TYPE_CONTRIBUTORS, CACHE_DURATION_MINUTE } from './../../constants/RepositoryConstants'
import Error from './../atoms/Error'

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
    let results = getCache(keyCache, CACHE_TYPE_CONTRIBUTORS)

    if(!results){
      getDataList(urlEndpoint, page, per_page)
        .then((data) => {
          results = data
          this.loaded(results, null)
          setCache(keyCache, CACHE_TYPE_CONTRIBUTORS, results, CACHE_DURATION_MINUTE)
        }).catch((error) => {
          this.loaded({response: [], pagination: {}}, error.message)
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
