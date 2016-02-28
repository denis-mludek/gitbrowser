import fetchPlus from 'fetch-plus'
import plusJson from 'fetch-plus-json'
import parseLinkHeader from 'parse-link-header'

const URL_API = 'https://api.github.com'
const SEARCH_REPOS_URI = 'search/repositories'
const REPOS_URI = 'repos'

const endpoint = fetchPlus.connectEndpoint(URL_API).addMiddleware(plusJson())

/* Requests that return multiple items will be paginated to 30 items by default.
  You can specify further pages with the ?page parameter.
  For some resources, you can also set a custom page size up to 100 with the ?per_page parameter.
  Note that for technical reasons not all endpoints respect the ?per_page parameter, see events for example.*/

const githubApi = {
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

  async getDataList(urlEndpoint, page, per_page) {
    const url = urlEndpoint.replace('{/sha}', '')
    const response = await fetchPlus.fetch(url, {query: {per_page, page}})
    const json = mergeLinkPaginationAndBody(response)
    return json
  }
}

async function mergeLinkPaginationAndBody(response) {
  const headerLink = response.headers.get('Link')
  const jsonData = await response.json()
  let pagination = {}

  if(headerLink){
    pagination = parseLinkHeader(headerLink)
  }

  return Object.assign({}, { list:jsonData, pagination })
}

export default githubApi
