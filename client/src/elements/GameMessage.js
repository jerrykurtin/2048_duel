import React from 'react'
import "./GameMessage.css"

function GameMessage({color, text}) {
  return (
    <div>
        <div className={"endgame-msg text " + color}>{text}</div>      
    </div>
  )
}

export default GameMessage
