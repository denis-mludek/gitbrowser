import React from 'react'

const MenuPanelButton = ({onClick, title, style}) => {
  return (
    <li className={style} onClick={onClick}>{title}</li>
  )
}

MenuPanelButton.propTypes = {
  onClick: React.PropTypes.func,
  title: React.PropTypes.string,
  style: React.PropTypes.string
}

export default MenuPanelButton
