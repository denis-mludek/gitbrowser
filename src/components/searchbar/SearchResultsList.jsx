import React from 'react'

const SearchResultsList = (props) => {
  return (
    <ul>
      { props.reposList.map((item, i) => {
        return <li key={i} data-id={i}><a href={item.html_url} target="_blank" >{item.name}</a></li>
      })}
    </ul>
  )
}

SearchResultsList.propTypes = {
  reposList: React.PropTypes.array.isRequired
}

export default SearchResultsList
