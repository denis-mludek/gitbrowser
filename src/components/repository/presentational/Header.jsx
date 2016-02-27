import React from 'react'

const Header = ({name, url}) => {
  return (
    <div className="col-md-12 header">
      <h1><a href={url} target="_blank"><span className="glyphicon glyphicon-book"></span> {name}</a></h1>
    </div>
  )
}

Header.propTypes = {
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
}

export default Header
