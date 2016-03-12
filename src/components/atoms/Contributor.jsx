import React from 'react'

const Contributor = ({commiter}) => {
  const commitWord = commiter.contributions > 1 ? 'commits' : 'commit'
  return(
    <div className="col-md-2 contributor">
      <a href={commiter.html_url} target="_blank">
        <img className="img-rounded" src={commiter.avatar_url} />
        <p>{commiter.login} <br />
        {commiter.contributions} {commitWord}</p>
      </a>
    </div>
  )
}

Contributor.propTypes = {
  commiter: React.PropTypes.object
}

export default Contributor
