import fetch from 'isomorphic-fetch'
import parseLinkHeader from 'parse-link-header'
import GithubConstants from './../constants/GithubConstants'

const GithubApiService = {
  searchInRepositories(q, page = 1, per_page = 15) {
    const queryEncoded = encodeURIComponent(q.trim())
    const url = `${GithubConstants.URL_API}${GithubConstants.SEARCH_REPOS_URI}`
    const queryParams = `?q=${queryEncoded}&page=${page}&per_page=${per_page}`

    return fetchFrom(url + queryParams)
  },

  getRepository(owner, repo) {
    const url = `${GithubConstants.URL_API}${GithubConstants.REPOS_URI}/${owner}/${repo}`
    return fetchFrom(url)
  },

  getDataList(urlEndpoint, page, per_page) {
    const url = urlEndpoint.replace('{/sha}', '')
    const urlWithQueryParams = `${url}?page=${page}&per_page=${per_page}`
    return fetchFrom(urlWithQueryParams)
  }
}

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
    .catch((error) => {
      throw new Error(`${GithubConstants.ERROR_MESSAGE_CONNECTIVITY} (${error.message})`)
    })
    .then((response) => {
      if(response.status === GithubConstants.CODE_ERROR_BAD_REQUEST) {
        throw new Error(GithubConstants.ERROR_MESSAGE_BAD_REQUEST)
      }
      if(response.status === GithubConstants.CODE_ERROR_UNPROCESSABLE_ENTITY) {
        throw new Error(GithubConstants.ERROR_MESSAGE_UNPROCESSABLE_ENTITY)
      }
      if(response.status >= GithubConstants.CODE_ERROR_SERVER){
        throw new Error(GithubConstants.ERROR_MESSAGE_500)
      }
      if(response.status === GithubConstants.CODE_ERROR_NOT_FOUND){
        throw new Error(GithubConstants.ERROR_MESSAGE_NOT_FOUND)
      }
      if(response.status >= GithubConstants.CODE_ERROR_BAD_REQUEST) {
        throw new Error(GithubConstants.ERROR_MESSAGE_DEFAULT)
      }

      return mergeLinkPaginationAndBody(response)
    })
}

export default GithubApiService
