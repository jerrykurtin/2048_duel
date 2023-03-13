import React, { useEffect, useState, useRef } from "react";
import "./GameWrapper.css";

import BoardClass from "./BoardClass.js";

import BoardInfo from "./BoardInfo.js";
import Board from "./Board.js";
import TurnInfo from "./TurnInfo.js";
import Settings from "./Settings";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { UilArrowLeft } from '@iconscout/react-unicons';


function GameWrapper({p1color, p2color, setP1color, setP2color, p1name, p2name, p1possessive, p2possessive, setState, gamemode, timer}) {

    // screen / viewport
    const [actualWidth, setActualWidth] = useState(Math.min(window.innerWidth, window.screen.availWidth));

    // settings
    const [winningPiece, setWinningPiece] = useState(64);
    const [difficulty, setDifficulty] = useState("easy");
    const [timeLimit, setTimeLimit] = useState(60);
    
    // board
    var activeGame = true;
    const [myBoard, setMyBoard] = useState(new BoardClass(winningPiece));

    // board values
    const [p1score, setP1score] = useState(myBoard.p1score);
    const [p2score, setP2score] = useState(myBoard.p2score);
    const [boardState, setBoardState] = useState(myBoard.board_state);
    const [actions, setActions] = useState(null);
    const [board, setBoard] = useState(myBoard.board);
    const [owner, setOwner] = useState(myBoard.owner);
    const [turn, setTurn] = useState(myBoard.player);

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
    // holds a reference to the Board element for swipe listeners
    const boardRef = useRef();

    var moveTriggered = false;
    var moveType = "";

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.keyCode > 36 && e.keyCode < 41)
                e.preventDefault();

            if (e.keyCode == 82 && !resetPressed){
                resetPressed = true;
                moveTriggered = true;
                moveType = "reset";
                console.log("reset pressed");
            }

            else if (e.keyCode == 37 && !arrowleftPressed){
                arrowleftPressed = true;
                moveTriggered = true;
                moveType = "left";
                console.log("left arrow pressed");
            }
            else if (e.keyCode == 38 && !arrowupPressed){
                arrowupPressed = true;
                moveTriggered = true;
                moveType = "up";
                console.log("up arrow pressed");
            }
            else if (e.keyCode == 39 && !arrowrightPressed){
                arrowrightPressed = true;
                moveTriggered = true;
                moveType = "right";
                console.log("right arrow pressed");
            }
            else if (e.keyCode == 40 && !arrowdownPressed){
                arrowdownPressed = true;
                moveTriggered = true;
                moveType = "down";
                console.log("down arrow pressed");
            }

            if (moveTriggered){
                updateBoard(moveType);
                moveTriggered = false;
            }

        }

    function handleKeyUp(e) {
        if (e.keyCode == 82)
            resetPressed = false;

        else if (e.keyCode == 37)
            arrowleftPressed = false;
        else if (e.keyCode == 38)
            arrowupPressed = false;
        else if (e.keyCode == 39)
            arrowrightPressed = false;
        else if (e.keyCode == 40)
            arrowdownPressed = false;
    }

    function handleResize() {
        setActualWidth(Math.min(window.innerWidth, window.screen.availWidth));
    }

    
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
                    moveType = "left";
                else
                    moveType = "right";
                touchPressed = false;
                touchTriggered = true;
            }

            // up or down move
            else if (Math.abs(ydiff) / actualWidth > touchThreshold){
                if (ydiff < 0)
                    moveType = "up";
                else
                    moveType = "down";
                touchPressed = false;
                touchTriggered = true;
            }
        }

        if (touchTriggered)
            updateBoard(moveType);
    }

    function handleTouchEnd(e) {
        touchPressed = false;
    }


    // update or reset the board
    function updateBoard(move, wp=winningPiece){
        if (!activeGame)
            return;
        if (move == "reset"){
            myBoard.reset_board(wp);
            // myBoard = new BoardClass();
            setActions(null);
            setBoard(myBoard.board);
            setOwner(myBoard.owner);
            setTurn(myBoard.player);
        }

        else if (["continue", "no_change"].indexOf(myBoard.board_state) > -1){
            console.log("Previous board:\n" + myBoard.build_grid());
            let tempActions = myBoard.move(move);
            if (tempActions){
                setBoard(myBoard.board);
                setOwner(myBoard.owner);
                setActions(tempActions);
                setTurn(myBoard.player);
            }
        }
        console.log("Board:\n" + myBoard.build_grid());

        setP1score(myBoard.p1score);
        setP2score(myBoard.p2score);
        setBoardState(myBoard.board_state);
    }

    return (
    <div>
        <Navbar variant="light">
            <Container>
                <Navbar.Brand><strong>{"2048 Duel: " + gamemode + " " + ((timer) ? timer : "")}</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    {/* <Nav className="me-auto"> */}
                        <Nav.Link onClick={() => setState("menu")}><UilArrowLeft/>Return Home</Nav.Link>
                    {/* </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <BoardInfo p1color={p1color} p2color={p2color} p1score={p1score} p2score={p2score}
            p1name={p1name} p2name={p2name} p1possessive={p1possessive} p2possessive={p2possessive}
             turn={turn} boardState={boardState} updateBoard={updateBoard}
        />
        <Board ref={boardRef}
            p1color={p1color} p2color={p2color} p1name={p1name} p2name={p2name}
            board={board} owner={owner} actions={actions}
            turn={turn} boardState={boardState}
        />
        <Settings gamemode={gamemode} timer={timer} updateBoard={updateBoard}
            winningPiece={winningPiece} setWinningPiece={setWinningPiece}
            difficulty={difficulty} setDifficulty={setDifficulty}
            timeLimit={timeLimit} setTimeLimit={setTimeLimit}
            p1color={p1color} setP1color={setP1color} p2color={p2color} setP2color={setP2color}
            p1possessive={p1possessive} p2possessive={p2possessive}
        />
        
    </div>
    )
}

export default GameWrapper
