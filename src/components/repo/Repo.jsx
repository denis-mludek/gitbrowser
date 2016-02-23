import React, { Component } from 'react'

export default class Repo extends Component {
  render() {
    return (
      <div>
        REPO {this.props.params.repoName}
      </div>
    );
  }
}
