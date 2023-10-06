import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button';

import TurnInfo from './TurnInfo';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';

import "./BoardInfo.css"

function BoardInfo({p1color, p2color, p1score, p2score, p1name, p2name, p1possessive, p2possessive, turn, boardState, setMoveType,
					timer, timeLimit, setPlayer1Finish, startStopP1Timer, resetP1Timer, setResetP1Timer,
					setPlayer2Finish, startStopP2Timer, resetP2Timer, setResetP2Timer}) {

	return (
		<div>
		<div className="board_info-container">
			<ScoreBoard
				isLeft={true} color={p1color} name={p1name} score={p1score} timer={timer}
				signalFinish={setPlayer1Finish} timeLimit={timeLimit} 
				startStopTimer={startStopP1Timer} resetTimer={resetP1Timer} setResetTimer={setResetP1Timer}
			/>

			<div className="board_info-center">
				<Button id="reset-button" variant="outline-main-color" onClick={() => setMoveType("reset")}>Reset</Button>
				<div className="turn-info-wrapper">
					<TurnInfo className="turn-info" p1color={p1color} p2color={p2color} p1name={p1name} p2name={p2name} p1possessive={p1possessive} p2possessive={p2possessive} turn={turn} boardState={boardState}/>
				</div>
			</div>

			<ScoreBoard
				isLeft={false} color={p2color} name={p2name} score={p2score} timer={timer}
				signalFinish={setPlayer2Finish} timeLimit={timeLimit} 
				startStopTimer={startStopP2Timer} resetTimer={resetP2Timer} setResetTimer={setResetP2Timer}
			/>

			{/* <div className={"custom-card small-border board_info-right text text-right " + p2color}>
				<div className="board_info-internal text header" id="player2-header"><strong>{p2name}</strong></div>
				{((timer) ? 
					<div className="board_info-internal text" id="player2-timer">
						<div className="timer-container-right">
						<strong><Timer signalFinish={setPlayer2Finish} startValue={timeLimit} startStopTimer={startStopP2Timer} resetTimer={resetP2Timer} setResetTimer={setResetP2Timer}/></strong><pre>{" "}</pre>- Time
						</div>
					</div>
					: <></>
				)}
				
				<div className="board_info-internal text" id="player2-score"><strong>{p2score}</strong> - Score</div>
			</div> */}
		</div>
		</div>
	)
}

export default BoardInfo
