import React from 'react'
import classNames from 'classnames'
import { browserHistory } from 'react-router'

const numberWithSpaces = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

const SearchResultsList = ({results, indexHovered, isOpen, setIgnoreBlur}) => {

  const ulClass = classNames({
    'ul': true,
    'show': isOpen,
    'hidden': !isOpen
  })

  const items = results.items || []

  const renderNumberLine = () => {
    const repositoryWord = results.total_count>1 ? 'repositories' : 'repository'
    const nbRes = results.total_count
    return (
      nbRes ?
        <li className="nbResults" >{numberWithSpaces(nbRes)} {repositoryWord} found</li>
      :
        ''
    )
  }

  return (
    <ul className={ulClass} onMouseDown={setIgnoreBlur.bind(null, true)} onMouseLeave={setIgnoreBlur.bind(null, false)} >
      { renderNumberLine() }
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

const ResultLine = ({liClass, route, item}) => {
  const _handleClick = () => browserHistory.push(route)
  const renderStargazers = () => {
    return (
      item.stargazers_count > 0 ?
        <span className="label label-info"><i className="glyphicon glyphicon-star"></i>{item.stargazers_count}</span>
      :
        ''
    )
  }

  return (
    <li className={liClass} onClick={_handleClick}>
      <span>{item.full_name}</span>

      <span className="pull-right">
        { renderStargazers() }
        <span className="label label-info">{item.language}</span>
      </span>
    </li>
  )
}

SearchResultsList.propTypes = {
  results: React.PropTypes.object,
  indexHovered: React.PropTypes.number,
  isOpen: React.PropTypes.bool
}

export default SearchResultsList
