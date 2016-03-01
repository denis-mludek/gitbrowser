import React from 'react'
import classNames from 'classnames'

import NavLink from '../nav/NavLink'

const ResultLine = ({liClass, route, setIgnoreBlur, children}) =>
  <li className={liClass} onMouseDown={setIgnoreBlur(true)} ><NavLink to={route}>{children}</NavLink></li>


const SearchResultsList = ({results, indexHovered, isOpen, setIgnoreBlur}) => {

  const ulClass = classNames({
    'ul': true,
    'ul-close': !isOpen
  })

  return (
    <ul className={ulClass}>
      { results.map((item, i) => {

        const props = {
          liClass : classNames({
            'li': true,
            'li-hover': i === indexHovered
          }),
          route: `/repos/${item.full_name}`,
          setIgnoreBlur
        }

        return <ResultLine key={i} {...props} >{item.full_name}</ResultLine>
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
