import React, { useEffect, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import './App.css';

import Title from './elements/Title.js';
import GameWrapper from "./elements/GameWrapper.js";
import BoardClass from "./elements/BoardClass.js";
import Settings from "./elements/Settings";
import { Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function App() {

    // determine colors
    var p1color = "green";
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

        setP1score(myBoard.p1score);
        setP2score(myBoard.p2score);
        setBoardState(myBoard.board_state);
    }

    const [state, setState] = React.useState("menu");
    const helloRef = React.useRef(null);
    const goodbyeRef = React.useRef(null);
    const nodeRef = state ? helloRef : goodbyeRef;

    function renderView(state){
        console.log("rendering component " + state);
        if (state === "menu"){
            return (
            <div>
                <Title/>
                <Card className="cool-fill mode-select" border="secondary" onClick={() => setState("game")}>
                <Card.Header className="text-center">Solo</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        Play against an AI to hone your skills.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="cool-fill mode-select" border="secondary" onClick={() => setState("game")}>
                    <Card.Header className="text-center">Multiplayer</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        Play with your friend on the same device
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="mode-select coming-soon">
                    <Card.Header className="text-center">Online (Coming soon)</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        Play against a friend, or start a game with a stranger.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            )
        } 

        else if (state === "game") {
            return (
            <div>
                <Button onClick={() => setState("menu")}>Return Home</Button>
                <Settings/>
                <GameWrapper p1color={p1color} p2color={p2color}
                board={board} owner={owner}
                p1score={p1score} p2score={p2score}
                boardState={boardState} actions={actions}
                p1name={p1name} p2name={p2name} p1possessive={p1possessive} p2possessive={p2possessive}
                turn={turn}
                />
            </div>
            )
        }
    }

    

    return (
        <div className="App">
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={state}
                    nodeRef={nodeRef}
                    addEndListener={(done) => {
                    nodeRef.current.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade"
                >
                    <div ref={nodeRef} className="button-container">
                    {renderView(state)}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}

export default App;
