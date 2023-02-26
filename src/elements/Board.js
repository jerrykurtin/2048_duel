import React from 'react'
import "./Board.css"

function Board() {
  return (
    <div>
      <div className="game-container" id="game-container">
            <div className="endgame-msg text" id="endgame-msg"></div>
            <div className="endgame-msg text" id="start-msg">
                <button id="start-button">Start game (g)</button>
            </div>
            <div className="grid-container">
                <div className="grid-row">
                    <div className="grid-cell"></div>
                    <div className="grid-cell"></div>
                    <div className="grid-cell"></div>
                    <div className="grid-cell final-cell"></div>
                </div>
                <div className="grid-row">
                    <div className="grid-cell"></div>
                    <div className="grid-cell"></div>
                    <div className="grid-cell"></div>
                    <div className="grid-cell final-cell"></div>
                </div>
                <div className="grid-row">
                    <div className="grid-cell"></div>
                    <div className="grid-cell"></div>
                    <div className="grid-cell"></div>
                    <div className="grid-cell final-cell"></div>
                </div>
                <div className="grid-row final-row">
                    <div className="grid-cell"></div>
                    <div className="grid-cell"></div>
                    <div className="grid-cell"></div>
                    <div className="grid-cell final-cell"></div>
                </div>
            </div>
            <div className="tile-container" id="tile-container"></div>
        </div>
    </div>
  )
}

export default Board
