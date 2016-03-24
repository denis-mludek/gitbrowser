import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './components/app/App'
import RepositoryContainer from './components/containers/RepositoryContainer'
import Home from './components/pages/Home'
import NoMatchRoute from './components/pages/NoMatchRoute'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='repos/:userName/:repoName' component={RepositoryContainer}/>
      <Route path='*' component={NoMatchRoute}/>
    </Route>
  </Router>
), document.getElementById('root'))
