import fetch from 'isomorphic-fetch'
import parseLinkHeader from 'parse-link-header'

const URL_API = 'https://api.github.com'
const SEARCH_REPOS_URI = '/search/repositories'
const REPOS_URI = '/repos'

async function mergeLinkPaginationAndBody(response) {
  const headerLink = response.headers.get('Link')
  const jsonData = await response.json()
  let pagination = {}

  if (headerLink) {
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

const githubApi = {
  searchInRepositories(q, page = 1, per_page = 15) {
    const url = URL_API + SEARCH_REPOS_URI
    const queryParams = `?q=${q}&page=${page}&per_page=${per_page}`

    return fetchFrom(url + queryParams)
  },

  getRepository(owner, repo) {
    const url = `${URL_API}${REPOS_URI}/${owner}/${repo}`
    return fetchFrom(url)
  },

  async getDataList(urlEndpoint, page, per_page) {
    const url = urlEndpoint.replace('{/sha}', '')
    const urlWithQueryParams = `${url}?page=${page}&per_page=${per_page}`
    return fetchFrom(urlWithQueryParams)
  }
}

export default githubApi
