import React from 'react'

const MainPanel = ({children}) => {
  return (
    <div className="col-md-9 mainpanel">
      {children}
    </div>
  )
}

MainPanel.propTypes = {
  repo: React.PropTypes.object
}

export default MainPanel
