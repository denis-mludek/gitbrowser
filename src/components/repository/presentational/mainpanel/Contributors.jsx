import React from 'react'

const Contributor = ({commiter}) => {
  return(
    <div className="col-md-2 contributor">
      <a href={commiter.html_url} target="_blank">
        <img className="img-circle" src={commiter.avatar_url} alt="" width="75" height="75"/>
        <p>{commiter.login} <br />
        {commiter.contributions} commit</p>
      </a>
    </div>
  )
}

const Contributors = ({contributors, children}) => {
  return (
  <div className="raw contributors">
    <h2>Contributors</h2>

    { contributors.map((commiter, i) => {
      return <Contributor key={i} commiter={commiter} />
    })}

    {children}
  </div>
  )
}

Contributors.propTypes = {
  contributors: React.PropTypes.array
}

export default Contributors
