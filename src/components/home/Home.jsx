import React, { Component } from 'react'
require('particles.js')

import SearchBarContainer from '../searchbar/container/SearchBarContainer'

import './Home.sass'

export default class Home extends Component {

  componentDidMount(){
    const json = require('./conf/particles.json')
    particlesJS('particles', json)
  }

  render() {
    return (
      <div className="container">
        <div id="particles"></div>
        <div className="home">
          <div className="col-md-offset-2 col-md-8">
            <div className="introduction">
              <h1>Find the best softwares worldwide</h1>
              <p className="lead">
                World’s largest open source community. Find projects, meet contributors, and see metrics of millions of repositories hosted on GitHub.
              </p>
            </div>
            <SearchBarContainer />
          </div>
        </div>
      </div>
    )
  }
}
