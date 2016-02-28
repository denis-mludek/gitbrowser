import React from 'react'

const SimpleInformations = ({repo}) => {
  const dateReadable = (date) => new Date(Date.parse(date)).toLocaleDateString()

  return (
    <div className="raw">
      <div className="col-md-12 basicInformations">
        <p>Created : {dateReadable(repo.created_at)}</p>
        <p>Last push : {dateReadable(repo.pushed_at)}</p>
        <br />
        <p>Stargazers : {repo.stargazers_count}</p>
        <p>Watchers : {repo.watchers_count}</p>
        <p>Forks : {repo.forks_count}</p>
        <p>Open Issues : {repo.open_issues_count}</p>
      </div>
    </div>
  )
}

SimpleInformations.propTypes = {
  repo: React.PropTypes.object
}

export default SimpleInformations
