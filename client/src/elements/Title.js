import React from 'react'

import './Title.css'
import logo from '../assets/big_logo.svg'

function Title() {
  return (
    <div>
      <div className="title-container">
          <img className="title" src={logo} alt="2048 Duel"/>
      </div>
    </div>
  )
}

export default Title
