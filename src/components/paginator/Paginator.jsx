import React, { Component } from 'react'

import './Paginator.sass'

const Paginator = ({pagination, onClick}) => {
  const {next, prev} = pagination || {}

  const renderPrev = () => {
    return <li><a onClick={onClick.bind(null, prev)}> <span aria-hidden="true">&larr;</span> </a></li>
  }

  const renderNext = () => {
    return <li><a onClick={onClick.bind(null, next)}> <span aria-hidden="true">&rarr;</span></a></li>
  }

  return (
    <nav>
      <ul className="pager">
        { prev ? renderPrev() : ''}
        { next ? renderNext() : ''}
      </ul>
    </nav>
  )
}

Paginator.PropTypes = {
  pagination: React.PropTypes.object,
  onClick: React.PropTypes.func
}

export default Paginator
