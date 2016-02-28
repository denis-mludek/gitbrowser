import React from 'react'

const AuthorInformations = ({owner}) => {
  return (
    <div className="raw">
      <div className="col-md-10 authorInformations">
        <p>
          <span><a href={owner.html_url} target="_blank">{owner.login}</a></span>
        </p>
        <img src={owner.avatar_url} className="img-thumbnail" />
      </div>
    </div>
  )
}

AuthorInformations.propTypes = {
  owner: React.PropTypes.object
}

export default AuthorInformations
