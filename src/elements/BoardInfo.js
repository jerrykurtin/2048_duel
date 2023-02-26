import React from 'react'
import "./BoardInfo.css"

function BoardInfo() {
  return (
    <div>
      <div className="board_info-container">
        <div className="board_info-left player1 text text-left">
            <div className="board_info-internal text header" id="player1-header">Player 1</div>
            <div className="board_info-internal text" id="player1-timer">Time - </div>
            <div className="board_info-internal text" id="player1-score">Score - </div>
        </div>
        <div className="board_info-center">
            <button className="bolded" id="reset-button">Reset (r)</button>
            <p id="settings-link"><a href="#game-instructions">How to play</a></p>

        </div>
        <div className="board_info-right player2 text text-right">
            <div className="board_info-internal text header" id="player2-header">Player 2</div>
            <div className="board_info-internal text" id="player2-timer"> - Time</div>
            <div className="board_info-internal text" id="player2-score"> - Score</div>
        </div>
    </div>
    </div>
  )
}

export default BoardInfo
