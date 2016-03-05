import React from 'react'
import { Link } from 'react-router'

import Header from '../header/Header'

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
