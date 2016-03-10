import fetch from 'isomorphic-fetch'
import parseLinkHeader from 'parse-link-header'
import GithubConstants from './../constants/GithubConstants'

/* ---------------- exports ---------------- */

export function searchInRepositories(q, page = 1, per_page = 15) {
  const queryEncoded = encodeURIComponent(q.trim())
  const url = `${GithubConstants.URL_API}${GithubConstants.SEARCH_REPOS_URI}`
  const queryParams = `?q=${queryEncoded}&page=${page}&per_page=${per_page}`

  return fetchFrom(url + queryParams)
}

export function getRepository(owner, repo) {
  const url = `${GithubConstants.URL_API}${GithubConstants.REPOS_URI}/${owner}/${repo}`
  return fetchFrom(url)
}

export function getDataList(urlEndpoint, page, per_page) {
  const url = urlEndpoint.replace('{/sha}', '')
  const urlWithQueryParams = `${url}?page=${page}&per_page=${per_page}`
  return fetchFrom(urlWithQueryParams)
}

/* ---------------- functions ---------------- */

function fetchFrom(url) {
  return fetch(url)
    .catch((error) => {
      throw new Error(`${GithubConstants.ERROR_MESSAGE_CONNECTIVITY} (${error.message})`)
    })
    .then(parseJson)
    .then(handleErrors)
    .then(mergeLinkPaginationAndBody)
    .catch((error) => {
      throw new Error(error)
    })
}

function mergeLinkPaginationAndBody(object) {
  const {response, json} = object
  const headerLink = response.headers.get('Link')
  let pagination = {}

  if(headerLink) {
    pagination = parseLinkHeader(headerLink)
  }

  return Object.assign({}, { response: json, pagination })
}

function handleErrors(object) {
  const {response, json} = object

  return new Promise((resolve, reject) => {
    if(response.status === GithubConstants.CODE_ERROR_BAD_REQUEST) {
      reject(GithubConstants.ERROR_MESSAGE_BAD_REQUEST)
    }else if(response.status === GithubConstants.CODE_ERROR_UNPROCESSABLE_ENTITY) {
        const errors = json.errors.reduce((acc, error) => {
          acc += ` ${error.message}`
          return acc
        }, '')
        reject(errors)
    }else if(response.status >= GithubConstants.CODE_ERROR_SERVER) {
      reject(GithubConstants.ERROR_MESSAGE_500)
    }else if(response.status === GithubConstants.CODE_ERROR_NOT_FOUND) {
      reject(GithubConstants.ERROR_MESSAGE_NOT_FOUND)
    }else if(response.status >= GithubConstants.CODE_ERROR_BAD_REQUEST) {
      reject(GithubConstants.ERROR_MESSAGE_DEFAULT)
    }else{
      resolve(object)
    }
  })
}

function parseJson(response) {
  return response.json().then(json => Object.assign({}, {json, response}))
}
