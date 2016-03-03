import fetch from 'isomorphic-fetch'
import parseLinkHeader from 'parse-link-header'
import lscache from 'lscache'
import GithubConstants from './../constants/GithubConstants'

async function mergeLinkPaginationAndBody(response) {
  const headerLink = response.headers.get('Link')
  const jsonData = await response.json()
  let pagination = {}

  if(headerLink) {
    pagination = parseLinkHeader(headerLink)
  }

  return Object.assign({}, { response: jsonData, pagination })
}

function fetchFrom(url) {
  return fetch(url)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return mergeLinkPaginationAndBody(response)
    })
}

const GithubApiService = {
  searchInRepositories(q, page = 1, per_page = 15) {
    const url = `${GithubConstants.URL_API}${GithubConstants.SEARCH_REPOS_URI}`
    const queryParams = `?q=${q}&page=${page}&per_page=${per_page}`

    return fetchFrom(url + queryParams)
  },

  getRepository(owner, repo) {
    const url = `${GithubConstants.URL_API}${GithubConstants.REPOS_URI}/${owner}/${repo}`
    return fetchFrom(url)
  },

  async getDataList(urlEndpoint, page, per_page) {
    const url = urlEndpoint.replace('{/sha}', '')
    const urlWithQueryParams = `${url}?page=${page}&per_page=${per_page}`
    return fetchFrom(urlWithQueryParams)
  }
}

export default GithubApiService
