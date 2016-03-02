import React, { Component } from 'react'

import NavLink from './../nav/NavLink'

import './Header.sass'

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
          <span className="navbar-brand sitename"><span className="glyphicon glyphicon-random icon-site"></span><NavLink to="/">GitBrowser</NavLink></span>
        </div>
      </div>
    </nav>
  )
}

export default Header
