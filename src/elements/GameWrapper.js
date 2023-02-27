import React from 'react'
import "./GameWrapper.css"

import BoardInfo from "./BoardInfo.js"
import Board from "./Board.js"
import TurnInfo from "./TurnInfo.js"
import Example from "./Example.js"

function GameBoard({p1color, p2color, p1score, p2score, board, owner, boardState, actions, p1name, p2name, p1possessive, p2possessive, turn}) {

    return (
    <div>
        <BoardInfo p1color={p1color} p2color={p2color} p1score={p1score} p2score={p2score} p1name={p1name} p2name={p2name}/>
        <Board p1color={p1color} p2color={p2color} board={board} owner={owner} actions={actions}/>
        <TurnInfo p1color={p1color} p2color={p2color} p1name={p1name} p2name={p2name} p1possessive={p1possessive} p2possessive={p2possessive} turn={turn} boardState={boardState}/>
    </div>
    )
}

export default GameBoard
