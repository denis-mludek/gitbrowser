import fetchPlus from 'fetch-plus'
import plusJson from 'fetch-plus-json'
import parseLinkHeader from 'parse-link-header'

const URL_API = 'https://api.github.com'
const SEARCH_REPOS_URI = 'search/repositories'
const REPOS_URI = 'repos'
const COMMITS_URI = 'commits'

const endpoint = fetchPlus.connectEndpoint(URL_API).addMiddleware(plusJson())

/* Requests that return multiple items will be paginated to 30 items by default.
  You can specify further pages with the ?page parameter.
  For some resources, you can also set a custom page size up to 100 with the ?per_page parameter.
  Note that for technical reasons not all endpoints respect the ?per_page parameter, see events for example.*/

export const githubApi = {
  searchInRepositories(q, per_page = 15) {
    return endpoint.browse(
      SEARCH_REPOS_URI,
      {query: {q, per_page}}
    )
  },

  getRepository(owner, repo) {
    return endpoint.browse(
      [REPOS_URI, owner, repo]
    )
  },

  async getContributors(urlEndpoint, page, per_page) {
    const response = await fetchPlus.fetch(urlEndpoint, {query: {per_page, page}})
    const parsedPagination = parseLinkHeader(response.headers.get('Link'))
    const jsonBody = await response.json()
    const mergedJsonPagination = Object.assign({}, {contributors:jsonBody, pagination: parsedPagination})

    return mergedJsonPagination
  },

  getCommits(owner, repo, per_page = 100) {
    return endpoint.browse(
      [CONTRIBUTORS_URI, owner, repo, COMMITS_URI],
      {query: {per_page}}
    )
  }
}
