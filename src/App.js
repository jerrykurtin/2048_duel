import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import './App.css';

import Title from './elements/Title.js'
import GameWrapper from "./elements/GameWrapper.js"
import BoardClass from "./elements/BoardClass.js"
import Example from "./elements/Example.js";

function App() {

    // determine colors
    var p1color = "blue";
    var p2color = "salmon";

    const [p1name, setP1name] = useState("Player 1");
    const [p1possessive, setP1possessive] = useState("Player 1's");
    const [p2name, setP2name] = useState("Player 2");
    const [p2possessive, setP2possessive] = useState("Player 2's");

    // board
    var activeGame = true;
    var myBoard = new BoardClass();

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
        console.log("actions:\n", actions);

        setP1score(myBoard.p1score);
        setP2score(myBoard.p2score);
        setBoardState(myBoard.board_state);
    }


    return (
        <div className="App">
            <Title/>
            <GameWrapper p1color={p1color} p2color={p2color}
            board={board} owner={owner}
            p1score={p1score} p2score={p2score}
            boardState={boardState} actions={actions}
            p1name={p1name} p2name={p2name} p1possessive={p1possessive} p2possessive={p2possessive}
            turn={turn}
            />
        </div>
    );
}

export default App;
