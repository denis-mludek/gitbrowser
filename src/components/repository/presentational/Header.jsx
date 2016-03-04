import React from 'react'

import './Header.sass'

const Header = ({name, url}) => {
  return (
    <div className="col-md-12 header">
      <h1><a href={url} target="_blank"><span className="glyphicon glyphicon-book"></span> {name}</a></h1>
    </div>
  )
}

Header.propTypes = {
  name: React.PropTypes.string,
  url: React.PropTypes.string
}

export default Header
