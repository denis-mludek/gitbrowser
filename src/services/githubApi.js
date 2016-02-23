import fetchPlus from 'fetch-plus'
import plusJson from 'fetch-plus-json'

const URL_API = 'https://api.github.com'
const SEARCH_REPOS_ENDPOINT = '/search/repositories'
const GET_REPO_ENDPOINT = '/repos/:owner/:repo'

const endpoint = fetchPlus.connectEndpoint(URL_API)
endpoint.addMiddleware(plusJson())

export const githubApi = {

  searchInRepositories(q, per_page = 15) {
    return endpoint.browse(
      SEARCH_REPOS_ENDPOINT,
      { query: { q, per_page } }
    )
  },

  getRepository(owner, repo) {
    const uri = GET_REPO_ENDPOINT.replace(':owner', owner).replace(':repo', repo)
    return endpoint.browse(uri)
  }
}

