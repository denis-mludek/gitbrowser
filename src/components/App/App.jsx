import React, { Component } from 'react'
import { Link } from 'react-router'

import Header from '../header/Header'

import './App.sass'

const App = ({children}) => {
  return (
    <div>
      <Header />
      <div className="container">
        {children}
      </div>
    </div>
  )
}

export default App
