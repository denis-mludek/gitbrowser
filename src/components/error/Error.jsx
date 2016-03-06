import React, { Component } from 'react'

import './Error.sass'

export default class Error extends Component {

  render() {
    const {error} = this.props
    if(error) {
      return (
        <div className="raw error">
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error:</span>
            &nbsp; {error}
          </div>
        </div>
      )
    }else{
      return null
    }
  }
}
