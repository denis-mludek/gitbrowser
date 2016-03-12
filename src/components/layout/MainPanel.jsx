import React from 'react'

import './styles/MainPanel.sass'

const MainPanel = ({children}) => {
  return (
    <div className="col-md-9 mainpanel">
      {children}
    </div>
  )
}

export default MainPanel
