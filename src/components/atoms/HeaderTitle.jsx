import React from 'react'

import './styles/HeaderTitle.sass'

const HeaderTitle = ({name, url}) => {
  return (
    <div className="col-md-12 header_title">
      <h1><a href={url} target="_blank"><span className="glyphicon glyphicon-book"></span> {name}</a></h1>
    </div>
  )
}

HeaderTitle.propTypes = {
  name: React.PropTypes.string,
  url: React.PropTypes.string
}

export default HeaderTitle
