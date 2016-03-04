import React from 'react'
import Loader from 'react-loader'

import './LoadingWrapper.sass'

const LoadingWrapper = (props) => {
  return (
    <Loader loaded={props.loaded} color="#528CC1" speed={0.8} >
      {props.children}
    </Loader>
  )
}

LoadingWrapper.PropTypes = {
  loaded: React.PropTypes.bool
}

export default LoadingWrapper
