const GithubConstants = {
  URL_API: 'https://api.github.com',
  SEARCH_REPOS_URI: '/search/repositories',
  REPOS_URI: '/repos',
  CODE_ERROR_BAD_REQUEST: 400,
  CODE_ERROR_UNPROCESSABLE_ENTITY: 422,
  CODE_ERROR_SERVER: 500,
  CODE_ERROR_NOT_FOUND: 404,
  ERROR_MESSAGE_BAD_REQUEST: 'Oops, looks like this is a bad request. Try something else.',
  ERROR_MESSAGE_UNPROCESSABLE_ENTITY: 'Oops, looks like Github can\'t read the parameters. Bad developer!',
  ERROR_MESSAGE_CONNECTIVITY: 'Oops, somehting wrong about your internet connectivity. Might want to take a look.',
  ERROR_MESSAGE_500: 'Oops, something\'s wrong on Github servers. Try again later.',
  ERROR_MESSAGE_NOT_FOUND: 'Oops, there is no result for this. Try something else.',
  ERROR_MESSAGE_DEFAULT: 'Oops, something went wrong, try something else.'
}

export default GithubConstants
