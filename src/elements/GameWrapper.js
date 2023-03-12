import React, { useEffect, useState } from "react";
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


function GameWrapper({p1color, p2color, p1name, p2name, p1possessive, p2possessive, setState, mode}) {

    // board
    var activeGame = true;
    var myBoard = new BoardClass();

    // settings
    const [winningPiece, setWinningPiece] = useState(64);
    const [difficulty, setDifficulty] = useState("Easy");
    const [timeLimit, setTimeLimit] = useState("null");
    const [p1Color, setP1Color] = useState("green");
    const [p2Color, setP2Color] = useState("purple");

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

    var localMoveTriggered = false;
    // var moveTriggered = false;
    var moveType = "";

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.keyCode > 36 && e.keyCode < 41)
                e.preventDefault();

            if (e.keyCode == 82 && !resetPressed){
                resetPressed = true;
                localMoveTriggered = true;
                // moveTriggered = true;
                moveType = "reset";
                console.log("reset pressed");
            }

            else if (e.keyCode == 37 && !arrowleftPressed){
                arrowleftPressed = true;
                localMoveTriggered = true;
                // moveTriggered = true;
                moveType = "left";
                console.log("left arrow pressed");
            }
            else if (e.keyCode == 38 && !arrowupPressed){
                arrowupPressed = true;
                localMoveTriggered = true;
                // moveTriggered = true;
                moveType = "up";
                console.log("up arrow pressed");
            }
            else if (e.keyCode == 39 && !arrowrightPressed){
                arrowrightPressed = true;
                localMoveTriggered = true;
                // moveTriggered = true;
                moveType = "right";
                console.log("right arrow pressed");
            }
            else if (e.keyCode == 40 && !arrowdownPressed){
                arrowdownPressed = true;
                localMoveTriggered = true;
                // moveTriggered = true;
                moveType = "down";
                console.log("down arrow pressed");
            }

            if (localMoveTriggered){
                updateBoard(moveType);
                localMoveTriggered = false;
                // moveTriggered = false;
            }

            // console.log("keydown:", e.keyCode); // code of keydown
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

        // console.log("keyup:", e.keyCode); // code of keydown
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);


    return function cleanup() {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
    };
    }, []);

    // update or reset the board
    function updateBoard(move){
        if (!activeGame)
            return;
        if (move == "reset"){
            myBoard = new BoardClass();
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

    function resetBoard(){
        updateBoard("reset");
    }


    return (
    <div>
        <Navbar variant="light">
            <Container>
                <Navbar.Brand><strong>{"2048 Duel: " + mode}</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    {/* <Nav className="me-auto"> */}
                        <Nav.Link onClick={() => setState("menu")}><UilArrowLeft/>Return Home</Nav.Link>
                    {/* </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <BoardInfo p1color={p1color} p2color={p2color} p1score={p1score} p2score={p2score} p1name={p1name} p2name={p2name} p1possessive={p1possessive} p2possessive={p2possessive} turn={turn} boardState={boardState}/>
        <Board p1color={p1color} p2color={p2color} p1name={p1name} p2name={p2name} board={board} owner={owner} actions={actions} turn={turn} boardState={boardState}/>
        <Settings gamemode={null} timer={null} resetBoard={resetBoard}
            winningPiece={winningPiece} setWinningPiece={setWinningPiece}
            difficulty={difficulty} setDifficulty={setDifficulty}
            timeLimit={timeLimit} setTimeLimit={setTimeLimit}
            p1Color={p1Color} setP1Color={setP1Color} p2Color={p2Color} setP2Color={setP2Color}
        />
        
    </div>
    )
}

export default GameWrapper
