import React from 'react'
import classNames from 'classnames'
import { browserHistory } from 'react-router'

import ResultLine from './../atoms/Resultline'
import ResultNumberLine from './../atoms/ResultNumberLine'

const SearchResultsList = ({results, indexHovered, isOpen, setIgnoreBlur}) => {
  const ulClass = classNames('ul', {
    'show': isOpen,
    'hidden': !isOpen
  })

  const items = results.items || []
  const nbRes = results.total_count

  return (
    <ul className={ulClass} onMouseDown={setIgnoreBlur.bind(null, true)} onMouseLeave={setIgnoreBlur.bind(null, false)} >
      { nbRes >= 0 ? <ResultNumberLine nbRes={nbRes}  />  : '' }
      { items.map((item, i) => {
          const props = {
            liClass : classNames('li', {
              'li-hover': i === indexHovered
            }),
            route: `/repos/${item.full_name}`,
            setIgnoreBlur,
            item
          }
          return <ResultLine key={i} {...props} />
      })}
    </ul>
  )
}

SearchResultsList.propTypes = {
  results: React.PropTypes.object,
  indexHovered: React.PropTypes.number,
  isOpen: React.PropTypes.bool
}

export default SearchResultsList
