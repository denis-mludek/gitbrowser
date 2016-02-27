import React, { Component } from 'react'

import NavLink from './../nav/NavLink'

const Header = () =>  {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">GitBrowser</a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
