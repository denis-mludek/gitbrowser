import React from 'react'

import Header from './presentational/Header'
import LeftPanel from './presentational/LeftPanel'
import AuthorInformations from './presentational/leftpanel/AuthorInformations'
import SimpleInformations from './presentational/leftpanel/SimpleInformations'
import MainPanel from './presentational/MainPanel'
import ContributorsContainer from './containers/ContributorsContainer'
import Metrics from './presentational/mainpanel/metrics/Metrics'

import './Repository.sass'

const Repository = ({repo}) => {
  const fullname = repo.full_name
  const headerProps =  {
    name:fullname,
    url:repo.html_url
  }


  return (
    <div className="container repository">
      <Header {...headerProps} />
      <LeftPanel>
        <AuthorInformations owner={repo.owner} />
        <SimpleInformations repo={repo} />
      </LeftPanel>
      <MainPanel>
        <ContributorsContainer urlEndpoint={repo.contributors_url} fullname={fullname} />
        <Metrics urlEndpoint={repo.commits_url} fullname={fullname} />
      </MainPanel>
    </div>
  )
}

Repository.propTypes = {
  repo: React.PropTypes.object.isRequired
}

export default Repository
