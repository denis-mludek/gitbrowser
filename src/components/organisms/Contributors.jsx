import React from 'react'

import Contributor from './../atoms/Contributor'

import './styles/Contributors.sass'

const Contributors = ({contributors, children}) => {
  return (
    <div className="row contributors">
      <h2>Contributors</h2>

      <div className="row">
        {
          contributors.map((commiter, i) => {
            return <Contributor key={i} commiter={commiter} />
        })}
      </div>
      <div className="row">
        {children}
      </div>
    </div>
  )
}

Contributors.propTypes = {
  contributors: React.PropTypes.array
}

export default Contributors
