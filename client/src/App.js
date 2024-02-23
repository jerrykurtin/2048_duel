import React, { useEffect, useState, useRef } from "react";
import './App.css';
import './elements/Animation-Slide.css'

import MenuOption from "./elements/MenuOption";
import GameWrapper from "./elements/GameWrapper.js";
import PopBox from "./elements/PopBox.js";

import logo from './assets/big_logo.svg';

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
    // states: (0) home, (1) gamemode, (2) timer, (3) game
    const [state, setState] = useState(0);
    const [prevState, setPrevState] = useState(0);
    const [currState, setCurrState] = useState(0);
    const [page0Transition, setPage0Transition] = useState("enter-left");
    const [page1Transition, setPage1Transition] = useState("hidden");
    const [page2Transition, setPage2Transition] = useState("hidden");
    const [page3Transition, setPage3Transition] = useState("hidden");
    
    // update previous state when state is changed
    useEffect (() => {
        setPrevState(currState);
        setCurrState(state);

    }, [state]);

    // Use current and previous state to choose animations
    useEffect (() => {
        const stateSetters = [setPage0Transition, setPage1Transition, setPage2Transition, setPage3Transition];
        if (prevState > currState) {
            stateSetters[prevState]("exit-right");
            stateSetters[currState]("enter-left");
        }
        else {
            stateSetters[prevState]("exit-left");
            stateSetters[currState]("enter-right");
        }

    }, [currState]);
    

    // setMode sets the gamemode and progresses to the next screen
    function setMode(newMode){
        if (newMode.toLowerCase() === "solo"){
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
        setGamemode(newMode);
        setState(2);
    }

    function setTimerStyle(newTimer){
        setTimer(newTimer);
        setState(3);
    }

    return (
        <div className="App">
            <div className="slide-window-container">
                <div className={"horizontally-centered slide-window " + page0Transition}>
                    <img className="title" src={logo} alt="2048 Duel"/>
                    <div>
                        <PopBox color="accent" className="start-button" onClick={() => setState(1)}>
                            <div className="centered start-text">
                                <div>Start</div>
                            </div>
                        </PopBox>
                        <div className="evenly-spaced">
                            <PopBox color="accent">
                                <div className="centered small-text">
                                    <div>How-To</div>
                                </div>
                            </PopBox>
                            <PopBox color="accent">
                                <div className="centered small-text">
                                    <div>About</div>
                                </div>
                            </PopBox>
                        </div>
                    </div>
                </div>
                <div className={"horizontally-centered  slide-window " + page1Transition}>
                    <div className="evenly-spaced menu-bar">
                        <PopBox color="accent" onClick={() => setState(0)}>
                            <div className="centered menu-select">
                                <div>Back</div>
                            </div>
                        </PopBox>
                        <PopBox color="accent" onClick={() => setState(0)}>
                            <div className="centered menu-select">
                                <div>Home</div>
                            </div>
                        </PopBox>
                    </div>
                    <div className="choose-text">Choose Your</div>
                    <div className={"choose-text " + p2color}>Gamemode</div>
                    <div className="evenly-spaced">
                    </div>
                    <PopBox color={p1color} onClick={() => setMode("Solo")}>
                        <div>Solo</div>
                        <div>Play against an AI to hone your skills.</div>
                    </PopBox>
                    <PopBox color={p2color} onClick={() => setMode("Multi")}>
                        <div>Multiplayer</div>
                        <div>Play with your friend on the same device.</div>
                    </PopBox>
                    <PopBox color={p1color} className="disabled">
                        <div>Online (Coming Soon)</div>
                        <div>Play against a friend, or start a game with a stranger.</div>
                    </PopBox>
                </div>
                <div className={"horizontally-centered slide-window " + page2Transition}>
                    <MenuOption 
                        title={"Back"} 
                        onClick={() => setState(1)}
                    />
                    <MenuOption 
                        title={"Home"} 
                        onClick={() => setState(0)}
                    />
                    <MenuOption 
                        title={"No Timer (Beginner-Friendly)"} 
                        contents={"Play classic 2048 Duel."} 
                        onClick={() => setTimerStyle(null)}
                    />
                    <MenuOption 
                        title={"Timed"} 
                        contents={"A timer runs down during your turn. If it reaches 0, your opponent wins!"} 
                        onClick={() => setTimerStyle("Timed")}
                    />
                    <MenuOption 
                        title={"Speed"} 
                        contents={"Each turn, you have a few seconds to move before a random move is chosen for you."} 
                        onClick={() => setTimerStyle("Speed")}
                    />
                </div>
                <div className={"slide-window " + page3Transition}>
                    <GameWrapper
                        p1color={p1color} p2color={p2color}
                        setP1color={setP1color} setP2color={setP2color}
                        p1name={p1name} p2name={p2name}
                        p1possessive={p1possessive} p2possessive={p2possessive}
                        state={state} setState={setState}
                        gamemode={gamemode} timer={timer}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
