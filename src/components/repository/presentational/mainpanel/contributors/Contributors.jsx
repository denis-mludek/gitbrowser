import React from 'react'

import './Contributors.sass'

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

const Contributors = ({contributors, children}) => {
  return (
    <div className="row contributors">
      <h2>Contributors</h2>

      <div className="row">
        { contributors.map((commiter, i) => {
          return <Contributor key={i} commiter={commiter} />
        })}
      </div>
      <div className="row">
        {children}
      </div>
    </div>
  )
}

Contributors.propTypes = {
  contributors: React.PropTypes.array
}

export default Contributors
