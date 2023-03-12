import React, { useEffect, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import './App.css';

import Title from './elements/Title.js';
import GameWrapper from "./elements/GameWrapper.js";
import Card from "react-bootstrap/Card";

function App() {

    // determine colors

    const [p1color, setP1color] = useState("green");
    const [p2color, setP2color] = useState("purple");

    const [p1name, setP1name] = useState("Player 1");
    const [p1possessive, setP1possessive] = useState("Player 1's");
    const [p2name, setP2name] = useState("Player 2");
    const [p2possessive, setP2possessive] = useState("Player 2's");

    const [gamemode, setGamemode] = useState("Solo");
    const [timer, setTimer] = useState(null);

    // setMode sets the gamemode and progresses to the next screen
    function setMode(newMode){
        setGamemode(newMode);
        setState("game");
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
                <Card className="cool-fill mode-select" border="secondary" onClick={() => setMode("Solo")}>
                <Card.Header className="text-center">Solo</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        Play against an AI to hone your skills.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="cool-fill mode-select" border="secondary" onClick={() => setMode("Multiplayer")}>
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
                <GameWrapper
                    p1color={p1color} p2color={p2color}
                    setP1color={setP1color} setP2color={setP2color}
                    p1name={p1name} p2name={p2name}
                    p1possessive={p1possessive} p2possessive={p2possessive}
                    setState={setState} gamemode={gamemode} timer={timer}
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
