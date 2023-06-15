import React, { useEffect, useState, useRef } from "react";
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

    // states used for loading react elements
    const [state, setState] = useState("menu");
    const [prevState, setPrevState] = useState(null);
    const [currState, setCurrState] = useState(state);
    const [animateDir, setAnimateDir] = useState("fade");
    const animateRef = useRef(null);
    
    // update previous state when state is changed
    useEffect (() => {
        setPrevState(currState);
        setCurrState(state);

    }, [state]);
    
    // when previous state is updated, change the fade direction based on current and previous state
    useEffect( () => {
        // decide which direction to animate
        if (state === "game"){
            setAnimateDir("fade-fr");
        }
        else if (state === "menu"){
            if (prevState === "game"){
                setAnimateDir("fade-rf");
            }
            else{
                setAnimateDir("fade");
            }
        }

        else if (state === "timer" || state === "online-lobby"){
            setAnimateDir("fade");
        }
    }, [prevState]);

    // setMode sets the gamemode and progresses to the next screen
    function setMode(newMode){
        setGamemode(newMode);
        if (newMode.toLowerCase() === "online") {
            setP1name("You");
            setP1possessive("Your");
            setP2name("Opponent");
            setP2possessive("Opponent's");
            setState("online-lobby");
            return;
        }
        else if (newMode.toLowerCase() === "solo"){
            setP1name("You");
            setP1possessive("Your");
            setP2name("CPU");
            setP2possessive("CPU's");
        }
        else {
            setP1name("Player 1");
            setP1possessive("Player 1's");
            setP2name("Player 2");
            setP2possessive("Player 2's");
        }
        setState("timer");
    }

    function setTimerStyle(newTimer){
        setTimer(newTimer);
        setState("game");
    }


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
                <Card className="cool-fill mode-select" border="secondary" onClick={() => setMode("Online")}>
                    <Card.Header className="text-center">Online</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        Play against a friend, or start a game with a stranger.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            )
        } 

        else if (state === "timer"){
            return (
            <div>
                <Title/>
                <Card className="cool-fill mode-select" border="secondary" onClick={() => setTimerStyle(null)}>
                <Card.Header className="text-center">No Timer</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        Classic 2048 Duel with no time limit
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="cool-fill mode-select" border="secondary" onClick={() => setTimerStyle("Timed")}>
                    <Card.Header className="text-center">Timed</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        A timer runs down during your turn. If it reaches 0, your opponent wins!
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="cool-fill mode-select" border="secondary" onClick={() => setTimerStyle("Speed")}>
                    <Card.Header className="text-center">Speed</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        Each turn, you have a few seconds to move before a random move is chosen for you!
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            )
        } 

        else if (state === "online-lobby") {
            return (
            <div>
                <h1>Waiting for Match...</h1>
                <p>people in lobby: 1</p>

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
                    nodeRef={animateRef}
                    addEndListener={(done) => {
                    animateRef.current.addEventListener("transitionend", done, false);
                    }}
                    classNames={animateDir}
                >
                    <div ref={animateRef} id="rendered-view-div">
                    {renderView(state)}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}

export default App;
