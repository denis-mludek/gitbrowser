import React from 'react'
import { Link } from 'react-router'

import Header from './../layout/header/Header'

import './App.sass'

const App = ({children}) => {
  return (
    <div className="app">
      <Header />
      {children}
    </div>
  )
}

export default App
