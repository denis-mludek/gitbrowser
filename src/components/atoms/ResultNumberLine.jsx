import React from 'react'

const numberWithSpaces = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

const ResultNumberLine = ({nbRes}) => {
  const repositoryWord = nbRes > 1 ? 'repositories' : 'repository'

  return(
    <li className="nbResults" >{numberWithSpaces(nbRes)} {repositoryWord} found</li>
  )
}

ResultNumberLine.propTypes = {
  nbRes: React.PropTypes.number
}

export default ResultNumberLine
