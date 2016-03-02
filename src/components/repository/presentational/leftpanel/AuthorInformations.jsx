import React from 'react'

const AuthorInformations = ({owner}) => {
  return (
    <div className="raw">
      <div className="col-md-10 authorInformations">
        <img src={owner.avatar_url} className="img-rounded" />
        <p>
          <span><a href={owner.html_url} target="_blank">{owner.login}</a></span>
        </p>
      </div>
    </div>
  )
}

AuthorInformations.propTypes = {
  owner: React.PropTypes.object
}

export default AuthorInformations
