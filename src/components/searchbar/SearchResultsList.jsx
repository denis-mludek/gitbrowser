import React from 'react'
import classNames from 'classnames'

import NavLink from '../nav/NavLink'

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const SearchResultsList = ({results, indexHovered, isOpen, setIgnoreBlur}) => {

  const ulClass = classNames({
    'ul': true,
    'show': isOpen,
    'hidden': !isOpen
  })

  const items = results.items || []
  const repositoryWord = results.total_count>1 ? 'repositories' : 'repository'

  return (
    <ul className={ulClass}>
      { results.total_count ? <li className="nbResults" onMouseDown={setIgnoreBlur(true)}>{numberWithSpaces(results.total_count)} {repositoryWord}  found</li> : ''}
      { items.map((item, i) => {

        const props = {
          liClass : classNames({
            'li': true,
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

const ResultLine = ({liClass, route, setIgnoreBlur, item}) =>
  <li className={liClass} onMouseDown={setIgnoreBlur(true)} >
    <NavLink to={route}>{item.full_name}</NavLink>
    <p className="pull-right">
      { item.stargazers_count>0 ? <span className="label label-info"><i className="glyphicon glyphicon-star"></i>{item.stargazers_count}</span> : '' }
      <span className="label label-info">{item.language}</span>
    </p>
  </li>

SearchResultsList.propTypes = {
  results: React.PropTypes.object,
  indexHovered: React.PropTypes.number,
  isOpen: React.PropTypes.bool,
  setIgnoreBlur: React.PropTypes.func
}

export default SearchResultsList
