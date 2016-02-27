import React from 'react'
import Loader from 'react-loader'

import Header from './presentational/Header'
import LeftPanel from './presentational/LeftPanel'
import AuthorInformations from './presentational/AuthorInformations'
import SimpleInformations from './presentational/SimpleInformations'
import MainPanel from './presentational/MainPanel'


const Repository = (props) => {
  const {repo, loaded} = props
  const headerProps = Object.assign({}, {name:repo.full_name, url:repo.html_url})

  return (
    <div className="repository">
      <Loader loaded={loaded}>
        <Header {...headerProps} />
        <LeftPanel>
          <AuthorInformations owner={repo.owner} />
          <SimpleInformations repo={repo} />
        </LeftPanel>
        <MainPanel>

        </MainPanel>
      </Loader>
    </div>
  )
}

Repository.propTypes = {
  repo: React.PropTypes.object.isRequired,
  loaded: React.PropTypes.bool.isRequired
}

export default Repository
