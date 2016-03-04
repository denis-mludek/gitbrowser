import React from 'react'

import './LeftPanel.sass'

const LeftPanel = ({children}) => {
  return (
    <div className="col-md-3 leftpanel">
      {children}
    </div>
  )
}

export default LeftPanel
