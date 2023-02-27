import React from 'react'
import "./BoardInfo.css"

function BoardInfo({p1color, p2color, p1score, p2score, p1name, p2name}) {

	return (
		<div>
		<div className="board_info-container">
			<div className={"board_info-left text text-left " + p1color}>
				<div className="board_info-internal text header" id="player1-header"><strong>{p1name}</strong></div>
				<div className="board_info-internal text" id="player1-timer">Time - <strong>N/A</strong></div>
				<div className="board_info-internal text" id="player1-score">Score - <strong>{p1score}</strong></div>
			</div>
			<div className="board_info-center">
				<button className="bolded" id="reset-button">Reset (r)</button>
				<p id="settings-link"><a href="#game-instructions">How to play</a></p>

			</div>
			<div className={"board_info-right text text-right " + p2color}>
				<div className="board_info-internal text header" id="player2-header"><strong>{p2name}</strong></div>
				<div className="board_info-internal text" id="player2-timer"><strong>N/A</strong> - Time</div>
				<div className="board_info-internal text" id="player2-score"><strong>{p2score}</strong> - Score</div>
			</div>
		</div>
		</div>
	)
}

export default BoardInfo
