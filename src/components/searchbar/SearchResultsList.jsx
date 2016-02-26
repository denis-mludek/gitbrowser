import React from 'react'
import NavLink from '../header/NavLink'

const SearchResultsList = ({reposList}) => {
  return (
    <ul>
      { reposList.map((item, i) => {
        const route = '/repos/' + item.full_name
        return <li key={i} data-id={i}><NavLink to={route}>{item.name}</NavLink></li>
      })}
    </ul>
  )
}

SearchResultsList.propTypes = {
  reposList: React.PropTypes.array.isRequired
}

export default SearchResultsList
