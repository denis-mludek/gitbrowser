import React from 'react'

import Header from './presentational/Header'
import LeftPanel from './presentational/LeftPanel'
import AuthorInformations from './presentational/leftpanel/AuthorInformations'
import SimpleInformations from './presentational/leftpanel/SimpleInformations'
import MainPanel from './presentational/MainPanel'
import ContributorsContainer from './containers/ContributorsContainer'
import Metrics from './presentational/mainpanel/Metrics'
import UsersImpactContainer from './containers/UsersImpactContainer'

import './Repository.sass'

const Repository = ({repo}) => {
  const headerProps = Object.assign({}, {
    name:repo.full_name,
    url:repo.html_url
  })

  return (
    <div className="repository">
      <Header {...headerProps} />
      <LeftPanel>
        <AuthorInformations owner={repo.owner} />
        <SimpleInformations repo={repo} />
      </LeftPanel>
      <MainPanel>
        <ContributorsContainer urlEndpoint={repo.contributors_url} />
        <Metrics>
          <UsersImpactContainer urlEndpoint={repo.commits_url} />
        </Metrics>
      </MainPanel>
    </div>
  )
}

Repository.propTypes = {
  repo: React.PropTypes.object.isRequired
}

export default Repository
