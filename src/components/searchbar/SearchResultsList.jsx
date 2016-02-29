import React from 'react'
import classNames from 'classnames'

import NavLink from '../nav/NavLink'

const SearchResultsList = ({results, indexHovered, isOpen, setIgnoreBlur}) => {

  const ulClass = classNames({
    'ul': true,
    'ul-close': !isOpen
  })

  return (
    <ul className={ulClass}>
      { results.map((item, i) => {
        const liClass = classNames({
          'li': true,
          'li-hover': i === indexHovered
        })
        const route = '/repos/' + item.full_name

        return <li key={i} className={liClass} onMouseDown={setIgnoreBlur(true)} ><NavLink to={route}>{item.full_name}</NavLink></li>
      })}
    </ul>
  )
}

SearchResultsList.propTypes = {
  results: React.PropTypes.array,
  indexHovered: React.PropTypes.number,
  isOpen: React.PropTypes.bool,
  setIgnoreBlur: React.PropTypes.func
}

export default SearchResultsList
