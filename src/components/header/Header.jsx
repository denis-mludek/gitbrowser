import React, { Component } from 'react'

import NavLink from './NavLink'

export default class Home extends Component {
  render() {
    return (
      <div className="masthead clearfix">
        <div className="inner">
          <h3 className="masthead-brand">GitBrowser</h3>
          <nav>
            <ul className="nav masthead-nav">
              <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
