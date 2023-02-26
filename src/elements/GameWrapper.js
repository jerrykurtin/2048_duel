import React from 'react'
import "./GameWrapper.css"

import BoardInfo from "./BoardInfo.js"
import Board from "./Board.js"
import TurnInfo from "./TurnInfo.js"

function GameBoard() {
  return (
    <div>
        <BoardInfo/>
        <Board/>
        <TurnInfo/>
    </div>
  )
}

export default GameBoard
