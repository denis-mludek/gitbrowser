import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './components/app/App'
import RepositoryContainer from './components/repository/containers/RepositoryContainer'
import Home from './components/home/Home'
import NoMatchRoute from './components/noMatchRoute/NoMatchRoute'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='repos/:userName/:repoName' component={RepositoryContainer}/>
      <Route path='*' component={NoMatchRoute}/>
    </Route>
  </Router>
), document.getElementById('root'))
