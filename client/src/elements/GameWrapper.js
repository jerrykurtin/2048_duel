import React, { useEffect, useState, useRef } from "react";
import "./GameWrapper.css";

import BoardClass from "./BoardClass.js";

import BoardInfo from "./BoardInfo.js";
import Board from "./Board.js";

import { Preferences } from '@capacitor/preferences';

async function incrementGamesPlayed() {
    const { value: gamesPlayed } = await Preferences.get({ key: 'gamesPlayed' });
    console.log("[DEBUG increment] gamesPlayed: ", gamesPlayed);
    if (!gamesPlayed) {
        console.log("[DEBUG increment] gamesPlayed not retrieved, setting to 1")
        await Preferences.set({
            key: 'gamesPlayed',
            value: '1',
        }); 
    }
    console.log("[DEBUG increment] gamesPlayed retrieved: ", gamesPlayed);
    const newGamesPlayed = (parseInt(gamesPlayed) + 1).toString();
    console.log("[DEBUG increment] newGamesPlayed: ", newGamesPlayed);
    await Preferences.set({
        key: 'gamesPlayed',
        value: newGamesPlayed,
    }); 
  }

/* random number between min and max, inclusive */
function randint(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
/* random choice of values in a function */
function randchoice(arr){
    let idx = randint(0, arr.length - 1);
    return arr[idx];
}

function swappable(board_state) {
    return (["no_change", "win1", "win2"].indexOf(board_state) === -1);
}


function GameWrapper({p1color, p2color, setP1color, setP2color, p1name, p2name, p1possessive, p2possessive, state, setState, gamemode, timer, winningPiece, setWinningPiece}) {
    
    const cpuPlayer = 1;

    // screen / viewport
    const [actualWidth, setActualWidth] = useState(Math.min(window.innerWidth, window.screen.availWidth));
    
    // settings
    const [difficulty, setDifficulty] = useState("Easy");
    const [responseTime, setResponseTime] = useState(900);
    const [timeLimit, setTimeLimit] = useState(60);
    
    // board
    const [activeGame, setActiveGame] = useState(true);
    const [recordedGame, setRecordedGame] = useState(false);
    const [myBoard, setMyBoard] = useState(new BoardClass(winningPiece));
    const [moveType, setMoveType] = useState("reset");
    const [pauseState, setPauseState] = useState("notStarted"); // notStarted, paused, null
    var [awaitingCPU, setAwaitingCPU] = useState(false);
    
    // board values
    const [p1score, setP1score] = useState(myBoard.p1score);
    const [p2score, setP2score] = useState(myBoard.p2score);
    const [boardState, setBoardState] = useState(myBoard.board_state);
    const [actions, setActions] = useState(null);
    const [board, setBoard] = useState(myBoard.board);
    const [owner, setOwner] = useState(myBoard.owner);
    const [turn, setTurn] = useState(myBoard.player);
    const [boardRefresh, setBoardRefresh] = useState(false);
    const [boardTimeout, setBoardTimeout] = useState(false);
    const [newGame, setNewGame] = useState(true);

    // timer
    const [player1Finish, setPlayer1Finish] = useState(false);
    const [startStopP1Timer, setStartStopP1Timer] = useState(false);
    const [resetP1Timer, setResetP1Timer] = useState(false);
    const [player2Finish, setPlayer2Finish] = useState(false);
    const [startStopP2Timer, setStartStopP2Timer] = useState(false);
    const [resetP2Timer, setResetP2Timer] = useState(false);

    // Make sure board is reset when loaded
    useEffect(() => {
        resetBoard();
    }, [state]);

    // Make sure time is initialized properly
    useEffect (() => {
        setTimeLimit((timer && timer.toLowerCase() === "timed") ? 60 : 3);
        console.log("resetting to get ready for new board");
        resetBoard();

    }, [timer]);

    function stopAllTimers() {
        setStartStopP1Timer(false);
        setStartStopP2Timer(false);
    }

    function resetBoard() {
        myBoard.reset_board(winningPiece);
        stopAllTimers();
        setBoardRefresh(!boardRefresh);
        setBoardTimeout(false);
        
        setBoardInfo(null);
        setActiveGame(true);
        setMoveType(null);
        setNewGame(true);

        // In case pause triggered during cpu move
        setAwaitingCPU(false);
        
        // For metrics
        setRecordedGame(false);

        if (timer) {
            console.log("resetting timer");
            setResetP1Timer(true);
            setResetP2Timer(true);
            setPauseState("notStarted");
        }
    }

    function finishMove() {
        // stop clock on endgame
        if (timer !== null && (["continue", "no_change"].indexOf(myBoard.board_state) === -1)) {
            stopAllTimers();
        }

        // clear out moves
        console.log("Board:\n" + myBoard.build_grid());
        setMoveType(null);
    }

    // holds a reference to the Board element for swipe listeners
    const boardRef = useRef();

    // Input handlers
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        window.addEventListener("resize", handleResize);
        if (boardRef && boardRef.current){
            boardRef.current.addEventListener("touchstart", handleTouchStart);
            boardRef.current.addEventListener("touchmove", handleTouchMove);
            boardRef.current.addEventListener("touchend", handleTouchEnd);
        }
        
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            if (boardRef && boardRef.current){
                boardRef.current.removeEventListener("touchstart", handleTouchStart);
                boardRef.current.removeEventListener("touchmove", handleTouchMove);
                boardRef.current.removeEventListener("touchend", handleTouchEnd);
            }
        };
    }, []);

    // handle timeout
    useEffect(() => {
        console.log("player1finish or player2 finish triggered, player1finish: ", player1Finish, ", player2finish:", player2Finish);
        if (!timer || pauseState === "notStarted") {
            console.log("ignored, game not started");
            return;
        }
        if (player1Finish){
            console.log("player 1 timeout, turn is " + turn);
            if (timer.toLowerCase() === "speed"){
                setMoveType("random");
            }
            else if (timer.toLowerCase() === "timed"){
                forceBoardState("win2");
                setActiveGame(false);
                stopAllTimers();
            }
            setPlayer1Finish(false);
        }
        else if (player2Finish){
            console.log("player 2 timeout");
            // in case the cpu times out
            setAwaitingCPU(false);
            if (timer.toLowerCase() === "speed"){
                setMoveType("random");
            }
            else if (timer.toLowerCase() === "timed"){
                forceBoardState("win1");
                setActiveGame(false);
                stopAllTimers();
            }
            setPlayer2Finish(false);
        }
    }, [player1Finish, player2Finish]);

    // Calculate cpu's response time
    useEffect (() => {
        if (difficulty === null) {
            return;
        }
        switch (difficulty.toLowerCase()) {
            case "easy":
                setResponseTime(850);
                break;
            case "medium":
                setResponseTime(800);
                break;
            case "hard":
                setResponseTime(700);
                break;
            case "impossible":
                setResponseTime(600);
                break;
            default:
                console.log("ERROR: invalid difficulty when calculating response time");
                setResponseTime(null);
        }

    }, [difficulty]);

    
    // Process a move
    useEffect (() => {
        if (!moveType) {
            return;
        }

        if (newGame) {
            setNewGame(false);
        }

        if (moveType === "refresh") {
            setBoardRefresh(!boardRefresh);
            setMoveType(null);
        }

        else if (moveType === "reset"){
            resetBoard();
        }

        else if (moveType === "resume") {
            setPauseState(null);
            if (timer){
                console.log("starting or resuming timers");
                if (myBoard.player === 0) {
                    setStartStopP1Timer(true);
                    setStartStopP2Timer(false);
                }
                else {
                    setStartStopP1Timer(false);
                    setStartStopP2Timer(true);
                }
            }
        }

        else if (moveType === "pause") {
            setPauseState("paused")
            if (timer){
                console.log("pausing timers");
                setStartStopP1Timer(false);
                setStartStopP2Timer(false);
            }
        }

        else {
            if (activeGame && !pauseState && !awaitingCPU){
                if (["continue", "no_change"].indexOf(myBoard.board_state) > -1){
                    if (!recordedGame) {
                        setRecordedGame(true);
                        incrementGamesPlayed();
                    }
                    
                    console.log("Previous board:\n" + myBoard.build_grid());
                    var tempActions;
                    if (moveType === "random"){
                        console.log("random move");
                        do {
                            tempActions = myBoard.move(randchoice(["left", "up", "right", "down"]));
                        } while (myBoard.board_state === "no_change");
                    }
                    else{
                        tempActions = myBoard.move(moveType);
                    }
                    
                    console.log("new board state: " + myBoard.board_state);
                    setBoardInfo(tempActions);
                    
                    // update timer
                    if (timer && swappable(myBoard.board_state)){
                        if (myBoard.player == 0){
                            console.log("starting player 1 timer")
                            setStartStopP1Timer(true);
                            setStartStopP2Timer(false);
                            if (timer.toLowerCase() === "speed")
                                setResetP2Timer(true);
                        }
        
                        else {
                            console.log("starting player 2 timer");
                            setStartStopP2Timer(true);
                            setStartStopP1Timer(false);
                            if (timer.toLowerCase() === "speed")
                                setResetP1Timer(true);
                        }
                    }
                    // cpu moves after a delay
                    if (gamemode.toLowerCase() === "solo" && myBoard.board_state === "continue"  && myBoard.player === cpuPlayer){
                        // use awaitingCPU to prevent user from moving again (kinda like a mutex)
                        setAwaitingCPU(true);
                        
                        const cpuMove = setTimeout( () => {
                            if (player1Finish || player2Finish) {
                                console.log("cpu returning, game over. player1Finish: ", player1Finish, ", player2Finish:", player2Finish);
                                return;
                            }
                            // timeout catch
                            if (myBoard.player === 0) {
                                console.log("ERROR: cpu returning, timed out");
                                return;
                            }
    
                            let tempActions = myBoard.cpu_move(difficulty);
                            setBoardInfo(tempActions);
                            setAwaitingCPU(false);
    
                            // update timers
                            if (timer && swappable(myBoard.board_state)){
                                console.log("board state is " + myBoard.board_state + ",starting player 1 timer")
                                setStartStopP1Timer(true);
                                setStartStopP2Timer(false);
                                if (timer.toLowerCase() === "speed")
                                    setResetP2Timer(true);
                            }
    
                            finishMove();
                        // 11:11 :)
                        }, ((timer && timer.toLowerCase() === "speed") ? responseTime + randint(-50, 50) : responseTime + randint(200, 250)));
        
                    }
                }
                finishMove();
            }

        }
    
    }, [moveType]);
    
    // handle keypresses
    var arrowleftPressed = false;
    var arrowupPressed = false;
    var arrowrightPressed = false;
    var arrowdownPressed = false;
    
    var resetPressed = false;
    var touchPressed = false;
    var initialX = 0;
    var initialY = 0;
    var touchThreshold = .1;

    // keypress handlers
    function handleKeyDown(e) {
        if (e.keyCode > 36 && e.keyCode < 41)
            e.preventDefault();

        if (e.keyCode == 82 && !resetPressed){
            resetPressed = true;
            setMoveType("reset");
            console.log("reset pressed");
        }

        else if ((e.keyCode == 37 || e.keyCode == 65) && !arrowleftPressed){
            arrowleftPressed = true;
            setMoveType("left");
            console.log("left arrow pressed");
        }
        else if ((e.keyCode == 38 || e.keyCode == 87) && !arrowupPressed){
            arrowupPressed = true;
            setMoveType("up");
            console.log("up arrow pressed");
        }
        else if ((e.keyCode == 39 || e.keyCode == 68) && !arrowrightPressed){
            arrowrightPressed = true;
            setMoveType("right");
            console.log("right arrow pressed");
        }
        else if ((e.keyCode == 40 || e.keyCode == 83) && !arrowdownPressed){
            arrowdownPressed = true;
            setMoveType("down");
            console.log("down arrow pressed");
        }
    }
    
    function handleKeyUp(e) {
        if (e.keyCode == 82)
        resetPressed = false;
        
        else if (e.keyCode == 37 || e.keyCode == 65)
        arrowleftPressed = false;
        else if (e.keyCode == 38 || e.keyCode == 87)
        arrowupPressed = false;
        else if (e.keyCode == 39 || e.keyCode == 68)
        arrowrightPressed = false;
        else if (e.keyCode == 40 || e.keyCode == 83)
        arrowdownPressed = false;
    }
    
    function handleResize() {
        setActualWidth(Math.min(window.innerWidth, window.screen.availWidth));
    }
    
    function handleTouchStart(e) {
        touchPressed = true;
        initialX = e.touches[0].pageX;
        initialY = e.touches[0].pageY;
    }

    function handleTouchMove(e){
        let xdiff = e.touches[0].pageX - initialX;
        let ydiff = e.touches[0].pageY - initialY;
        let touchTriggered = false;

        if (touchPressed){
            e.preventDefault();
            // left or right move
            if (Math.abs(xdiff) / actualWidth > touchThreshold){
                if (xdiff < 0)
                    setMoveType("left");
                else
                    setMoveType("right");
                touchPressed = false;
                touchTriggered = true;
            }

            // up or down move
            else if (Math.abs(ydiff) / actualWidth > touchThreshold){
                if (ydiff < 0)
                    setMoveType("up");
                else
                    setMoveType("down");
                touchPressed = false;
                touchTriggered = true;
            }
        }
    }

    function handleTouchEnd(e) {
        touchPressed = false;
    }

    // Update hooks with the new information
    function setBoardInfo(tempActions){
        if (tempActions){
            setActions(tempActions);
        }
        if (myBoard.board_state !== "no_change"){
            setBoard(myBoard.board);
            setOwner(myBoard.owner);
            setTurn(myBoard.player);
            setP1score(myBoard.p1score);
            setP2score(myBoard.p2score);
        }
        setBoardState(myBoard.board_state);
    }

    // force a board state (for timer)
    function forceBoardState(state){
        myBoard.board_state = state;
        setBoardState(myBoard.board_state);
        setBoardTimeout(true);
    }


    return (
    <div>        
        <BoardInfo p1score={p1score} p2score={p2score}
            p1color={p1color} setP1color={setP1color} p2color={p2color} setP2color={setP2color}
            p1name={p1name} p2name={p2name} p1possessive={p1possessive} p2possessive={p2possessive}
            turn={turn} boardState={boardState} pauseState={pauseState} setMoveType={setMoveType} timer={timer}
            setPlayer1Finish={setPlayer1Finish} startStopP1Timer={startStopP1Timer} resetP1Timer={resetP1Timer} setResetP1Timer={setResetP1Timer}
            setPlayer2Finish={setPlayer2Finish} startStopP2Timer={startStopP2Timer} resetP2Timer={resetP2Timer} setResetP2Timer={setResetP2Timer}
            gamemode={gamemode} setState={setState}
            winningPiece={winningPiece} setWinningPiece={setWinningPiece}
            difficulty={difficulty} setDifficulty={setDifficulty}
            timeLimit={timeLimit} setTimeLimit={setTimeLimit}
        />
        <Board ref={boardRef}
            p1color={p1color} p2color={p2color} p1name={p1name} p2name={p2name}
            board={board} owner={owner} actions={actions} pauseState={pauseState} moveType={moveType} setMoveType={setMoveType}
            turn={turn} boardState={boardState} refresh={boardRefresh} setRefresh={setBoardRefresh}
            boardTimeout={boardTimeout} newGame={newGame}
        />
        
    </div>
    )
}

export default GameWrapper
