import React, { useEffect, useState, useRef } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import './App.css';

import Title from './elements/Title.js';
import MenuOption from "./elements/MenuOption";
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

        else if (state === "timer"){
            setAnimateDir("fade");
        }
    }, [prevState]);

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
                <MenuOption 
                    title={"Solo"} 
                    contents={"Play against an AI to hone your skills."} 
                    onClick={() => setMode("Solo")}
                />
                <MenuOption 
                    title={"Multiplayer"} 
                    contents={"Play with your friend on the same device."} 
                    onClick={() => setMode("Multi")}
                />
                <MenuOption 
                    title={"Online (Coming Soon)"} 
                    contents={"Play against a friend, or start a game with a stranger."} 
                    onClick={() => null}
                    disabled={true}
                />
            </div>
            )
        } 

        else if (state === "timer"){
            return (
                <div>
                <Title/>
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
