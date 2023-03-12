import React from 'react'
import "./BoardInfo.css"

import TurnInfo from './TurnInfo';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function BoardInfo({p1color, p2color, p1score, p2score, p1name, p2name, p1possessive, p2possessive, turn, boardState}) {

	return (
		<div>
		<div className="board_info-container">
			<Card className={"board_info-left text text-left " + p1color}>
				<div className="board_info-internal text" id="player1-header"><strong>{p1name}</strong></div>
				<hr/>
				<div className="board_info-internal text" id="player1-timer">Time - <strong>N/A</strong></div>
				<div className="board_info-internal text" id="player1-score">Score - <strong>{p1score}</strong></div>
			</Card>
			{/* <div className={"board_info-left text text-left " + p1color}>
				
			</div> */}
			<div className="board_info-center">
				<Button id="reset-button" variant="outline-secondary">Reset (r)</Button>
				<TurnInfo className="turn-info" p1color={p1color} p2color={p2color} p1name={p1name} p2name={p2name} p1possessive={p1possessive} p2possessive={p2possessive} turn={turn} boardState={boardState}/>

			</div>
			<Card className={"board_info-right text text-right " + p2color}>
				<div className="board_info-internal text header" id="player2-header"><strong>{p2name}</strong></div>
				<div className="board_info-internal text" id="player2-timer"><strong>N/A</strong> - Time</div>
				<div className="board_info-internal text" id="player2-score"><strong>{p2score}</strong> - Score</div>
			</Card>
		</div>
		</div>
	)
}

export default BoardInfo
