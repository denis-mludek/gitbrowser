import React from 'react'

import './NoMatchRoute.sass'

const NoMatchRoute = () => {
  return (
    <div className="container no-match-route">
      <h1>Oops</h1>
      <p className="lead"><i className="glyphicon glyphicon-warning-sign"></i> Looks like there's nothing here. This is not the page you're looking for. x)</p>
    </div>
  )
}

export default NoMatchRoute
