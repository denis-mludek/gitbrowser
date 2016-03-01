import React from 'react'

import './Footer.sass'

const Footer = () =>  {
  return (
    <nav className="navbar navbar-default navbar-fixed-bottom footer">
      <div className="container content">
        <p>
          Created with <span className="glyphicon glyphicon-heart"></span> by <a href="https://twitter.com/notdeny" target="_blank">@notdeny</a>
        </p>
      </div>
    </nav>
  )
}

export default Footer
