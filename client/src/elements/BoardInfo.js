import React, {useState, useEffect} from 'react'

import TurnInfo from './TurnInfo';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';
import PopBox from './PopBox';
import Settings from './Settings';

import { UilSetting } from '@iconscout/react-unicons'
import { UilArrowLeft } from '@iconscout/react-unicons';
import { UilHome } from '@iconscout/react-unicons';
import { UilRedo } from '@iconscout/react-unicons';
import { UilCheck } from '@iconscout/react-unicons'

import "./BoardInfo.css"

function BoardInfo({p1score, p2score, 
		p1color, setP1color, p2color, setP2color,
		p1name, p2name, p1possessive, p2possessive,
		turn, boardState, pauseState, setMoveType, timer,
		setPlayer1Finish, startStopP1Timer, resetP1Timer, setResetP1Timer,
		setPlayer2Finish, startStopP2Timer, resetP2Timer, setResetP2Timer,
		gamemode, setState,
		winningPiece, setWinningPiece,
		difficulty, setDifficulty,
		timeLimit, setTimeLimit}) {

	const [viewState, setViewState] = useState(0);	// 0: normal, 1: settings

	function closeSettings() {
		if (pauseState !== "notStarted") {
			setMoveType("resume");
		}
		setViewState(0);
	}

	function openSettings() {
		setMoveType("pause");
		setViewState(1);
	}

	return (
		<div className={"board-info-wrapper" +  ((timer) ? " timer-board-info-wrapper" : "")}>
			<div className="board-info-inner">
				<div className="evenly-spaced game-menu-bar">
					<PopBox color="accent" onClick={() => setState(2)}>
						<div className="centered game-nav">
							<div><UilArrowLeft className="back-icon"/>Back</div>
						</div>
					</PopBox>
					<PopBox color="accent" onClick={() => setMoveType("reset")}>
						<div className="centered game-nav">
							<div><strong><UilRedo className="redo-icon"/>Reset</strong></div>
						</div>
					</PopBox>
					<PopBox color="accent" onClick={() => setState(0)}>
						<div className="centered game-nav">
							<div><UilHome className="home-icon"/>Home</div>
						</div>
					</PopBox>
				</div>
				<div className="custom-card long-container board-info">
					<div className={"centered-text settings-text text"} id="turn" onClick={() => openSettings()}>
						<UilSetting className="settings-icon"/>
						{((p1color === p2color) ? " Blind " : "") + 
						((gamemode.toLowerCase() == "solo") ? difficulty : gamemode) +
						((timer) ? " " + timeLimit + " sec " + timer : "") +
						", First to " + winningPiece}
					</div>
				</div>
				<div className="evenly-spaced board-info-container">
					<ScoreBoard
						isLeft={true} color={p1color} name={p1name} score={p1score} timer={timer}
						signalFinish={setPlayer1Finish} timeLimit={timeLimit} 
						startStopTimer={startStopP1Timer} resetTimer={resetP1Timer} setResetTimer={setResetP1Timer}
					/>
					<ScoreBoard
						isLeft={false} color={p2color} name={p2name} score={p2score} timer={timer}
						signalFinish={setPlayer2Finish} timeLimit={timeLimit} 
						startStopTimer={startStopP2Timer} resetTimer={resetP2Timer} setResetTimer={setResetP2Timer}
					/>
				</div>
				<TurnInfo className="turn-info" p1color={p1color} p2color={p2color} p1name={p1name} p2name={p2name} p1possessive={p1possessive} p2possessive={p2possessive} turn={turn} boardState={boardState}/>
			</div>

			{((viewState == 1) 
			?
				<div className="board-info-inner">
					<div className={"custom-card settings-container appear-animate" +  ((timer) ? " timer-settings-container" : "")}>
						<Settings gamemode={gamemode} timer={timer} setMoveType={setMoveType}
							winningPiece={winningPiece} setWinningPiece={setWinningPiece}
							difficulty={difficulty} setDifficulty={setDifficulty}
							timeLimit={timeLimit} setTimeLimit={setTimeLimit}
							p1color={p1color} setP1color={setP1color} p2color={p2color} setP2color={setP2color}
							p1possessive={p1possessive} p2possessive={p2possessive}
						/>
						<div className="bottom-right-button-container">
							<PopBox color="accent" onClick={() => closeSettings()}>
								<div className="centered done-button">
									<div><UilCheck className="check-icon"/>Done</div>
								</div>
							</PopBox>
						</div>
					</div>
					<div className="game-blocker"/>
				</div>
			: <></>
			)}
		</div>
	)
}

export default BoardInfo
