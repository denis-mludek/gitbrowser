import React from 'react'
import { Link } from 'react-router'

import NavbarTop from './../layout/NavbarTop'

import './App.sass'

const App = ({children}) => {
  return (
    <div className="app">
      <NavbarTop />
      {children}
    </div>
  )
}

export default App
