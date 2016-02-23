import React, { Component } from 'react'

import SearchBar from '../searchbar/SearchBar'

export default class Home extends Component {
  render() {
    return (
      <div className="inner cover">
        <h1 classNameName="cover-heading">Search repositories</h1>

        <SearchBar />

      </div>
    )
  }
}
