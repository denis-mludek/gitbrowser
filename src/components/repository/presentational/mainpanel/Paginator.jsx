import React, { Component } from 'react'

const Paginator = (props) => {
  const {next, prev} = props.pagination || {}

  const renderPrev = () => {
    return <li><a onClick={props.onPaginationClick(prev)}> <span aria-hidden="true">&larr;</span> </a></li>
  }

  const renderNext = () => {
    return <li><a onClick={props.onPaginationClick(next)}> <span aria-hidden="true">&rarr;</span></a></li>
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
