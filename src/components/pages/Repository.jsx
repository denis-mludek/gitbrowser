import React from 'react'

import LeftPanel from './../layout/LeftPanel'
import MainPanel from './../layout/MainPanel'
import ContributorsContainer from './../ecosystems/ContributorsContainer'
import HeaderTitle from './../atoms/HeaderTitle'
import AuthorInformations from './../atoms/AuthorInformations'
import SimpleInformations from './../atoms/SimpleInformations'
import Metrics from './../ecosystems/Metrics'

import './styles/Repository.sass'

const Repository = ({repo}) => {
  const fullname = repo.full_name
  const headerProps =  {
    name: fullname,
    url: repo.html_url
  }

  return (
    <div className="container repository">
      <HeaderTitle {...headerProps} />
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
