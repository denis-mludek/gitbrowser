import React, { Component } from 'react'
import { Link } from 'react-router'

import Header from '../header/Header'

import './App.sass'

export default class App extends Component {
  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="cover-container">

            <Header />

            {this.props.children}

          </div>
        </div>
      </div>
    );
  }
}
