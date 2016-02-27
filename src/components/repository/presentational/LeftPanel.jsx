import React from 'react'

const LeftPanel = ({children}) => {
  return (
    <div className="col-md-3 leftpanel">
      {children}
    </div>
  )
}

LeftPanel.propTypes = {
  repo: React.PropTypes.object
}

export default LeftPanel
