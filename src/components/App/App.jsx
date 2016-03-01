import React from 'react'
import { Link } from 'react-router'

import Header from '../header/Header'
import Footer from '../footer/Footer'

import './App.sass'

const App = ({children}) => {
  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default App
