import React from 'react'
import { browserHistory } from 'react-router'

const ResultLine = ({liClass, route, item}) => {
  const _handleClick = () => browserHistory.push(route)

  return (
    <li className={liClass} onClick={_handleClick}>
      <span>{item.full_name}</span>

      <span className="pull-right">
        {
          item.stargazers_count > 0 ?
            <span className="label label-info"><i className="glyphicon glyphicon-star"></i>{item.stargazers_count}</span>
          :
            ''
        }
        <span className="label label-info">{item.language}</span>
      </span>
    </li>
  )
}

ResultLine.propTypes = {
  liClass: React.PropTypes.string,
  route: React.PropTypes.string,
  item: React.PropTypes.object
}

export default ResultLine
