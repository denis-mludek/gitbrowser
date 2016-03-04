import React from 'react'

import './MainPanel.sass'

const MainPanel = ({children}) => {
  return (
    <div className="col-md-9 mainpanel">
      {children}
    </div>
  )
}

export default MainPanel
