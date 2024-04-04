import React, { useEffect, useState, useRef } from "react";
import { Capacitor } from '@capacitor/core';
import useScreenHeight from "./UseScreenHeight.js";

import './MainRunner.css';
import './elements/Animation-Slide.css'
import './elements/Animation-Select.css'

import GameWrapper from "./elements/GameWrapper.js";
import PopBox from "./elements/PopBox.js";

import logo from './assets/big_logo.svg';

import profile from './assets/profile-photo.jpg';

import { UilArrowLeft } from '@iconscout/react-unicons';
import { UilHome } from '@iconscout/react-unicons'
import HowToPlay from "./elements/HowToPlay.js";

import { Preferences } from '@capacitor/preferences';

async function getGamesPlayed() {
    const { value: gamesPlayed } = await Preferences.get({ key: 'gamesPlayed' });
    if (!gamesPlayed) {
        await Preferences.set({
            key: 'gamesPlayed',
            value: '0',
        }); 
        return 0;
    }
    return parseInt(gamesPlayed);
}

function App() {
    // useScreenHeight();

    const platform = Capacitor.getPlatform();

    // determine colors
    const [p1color, setP1color] = useState("green");
    const [p2color, setP2color] = useState("purple");
    
    const [p1name, setP1name] = useState("Player 1");
    const [p1possessive, setP1possessive] = useState("Player 1's");
    const [p2name, setP2name] = useState("Player 2");
    const [p2possessive, setP2possessive] = useState("Player 2's");
    
    const [gamemode, setGamemode] = useState("Solo");
    const [timer, setTimer] = useState(null);
    const [winningPiece, setWinningPiece] = useState(64);

    // states used for loading react elements
    // states: (0) home, (1) gamemode, (2) timer, (3) game
    const [state, setState] = useState(0);
    const [prevState, setPrevState] = useState(0);
    const [currState, setCurrState] = useState(0);
    const [page0Transition, setPage0Transition] = useState("enter-left");
    const [page1Transition, setPage1Transition] = useState("hidden");
    const [page2Transition, setPage2Transition] = useState("hidden");
    const [page3Transition, setPage3Transition] = useState("hidden");

    const [gamesPlayed, setGamesPlayed] = useState(null);

    useEffect(() => {
        const fetchGamesPlayed = async () => {
            const response = await getGamesPlayed();
            setGamesPlayed(response);
        }
        fetchGamesPlayed();
    }, [currState]);

    // update previous state when state is changed
    useEffect (() => {
        setPrevState(currState);
        setCurrState(state);

    }, [state]);

    const [startMenuState, setStartMenuState] = useState(0);    // 0: start menu, 1: how-to, 2: about

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

    function loadStartScreen() {
        if (startMenuState === 0) {
            return (<>
                <img className="title" src={logo} alt="2048 Duel"/>
                <div>
                    <PopBox color="accent" className="start-button" onClick={() => setState(1)} large={true}>
                        <div className="centered start-text nav-box">
                            <div>Start</div>
                        </div>
                    </PopBox>
                    <div className="evenly-spaced">
                        <PopBox color="accent" onClick={() => setStartMenuState(1)}>
                            <div className="centered small-box small-text expanded">
                                <div>How-To</div>
                            </div>
                        </PopBox>
                        <PopBox color="accent" onClick={() => setStartMenuState(2)}>
                            <div className="centered small-box small-text">
                                <div>About</div>
                            </div>
                        </PopBox>
                    </div>
                </div>
            </>)
        }
        else if (startMenuState === 1) {
            return (<div className="how-to-window appear-animate">
                <PopBox color="accent" darkBackground={true} disabled={true} large={true}>
                    <div className={"how-to-box" + (platform === "ios" ? " how-to-box-ios" : "")}>
                        <div className="how-to-container">
                            <HowToPlay winningPiece={winningPiece}/>
                        </div>
                        <div className="align-right how-to-close">
                            <div className="centered">
                                <PopBox color="accent" onClick={() => setStartMenuState(0)}>
                                    <div className="centered done-box small-text">
                                        <div>Done</div>
                                    </div>
                                </PopBox>
                            </div>
                        </div>
                    </div>
                </PopBox>
            </div>)
        }
        else if (startMenuState === 2) {
            return (<div className="how-to-window appear-animate">
                <PopBox color="accent" darkBackground={true} disabled={true} large={true}>
                    <div className={"how-to-box" + (platform === "ios" ? " how-to-box-ios" : "")}>
                        <div className="how-to-container">
                        <div className="tab-contents">
                            <h5>Stats</h5>
                            <p>{"Games played: " + gamesPlayed}</p>
                            <h5>About</h5>
                            <p>2048 Duel started as a text-based demo that I made in a few hours in late 2022. It was too much fun not to share, so I decided to make it into a real app. It's inspired by Gabriele Cirulli's <a href="https://play2048.co">2048</a>, and all of the code is public <a href="https://github.com/jerrykurtin/2048_duel">here</a>.</p>
                            <h5>Feedback</h5>
                            <p>Email me <a href = "mailto: visual-fetch-0h@icloud.com">here</a> with feedback or bugs. I don't plan on running any ads here, but if you want to support the app, you can venmo me <strong>@Jerry-Kurtin-1</strong>. Thank you for playing!</p>
                            <div className="horizontally-centered">
                                <div>This is how I smile when you play my game</div>
                                <img className="profile-img" src={profile} alt="photo of Jerry"/>
                            </div>
                        </div>
                        </div>
                        <div className="align-right how-to-close">
                            <div className="centered">
                                <PopBox color="accent" onClick={() => setStartMenuState(0)}>
                                    <div className="centered done-box small-text">
                                        <div>Done</div>
                                    </div>
                                </PopBox>
                            </div>
                        </div>
                    </div>
                </PopBox>
            </div>)
        }
    }

    return (
        <div className="App">
            <div className={"slide-window-container" + (platform === "ios" ? " slide-window-container-ios" : "")}>
                <div className={"horizontally-centered slide-window " + page0Transition}>
                    {loadStartScreen()}
                </div>
                <div className={"horizontally-centered  slide-window " + page1Transition}>
                    <div className="evenly-spaced menu-bar">
                        <PopBox color="accent" onClick={() => setState(0)}>
                            <div className="centered menu-nav">
                                <div><UilArrowLeft className="back-icon"/>Back</div>
                            </div>
                        </PopBox>
                        <PopBox color="accent" onClick={() => setState(0)}>
                            <div className="centered menu-nav">
                                <div><UilHome className="home-icon"/>Home</div>
                            </div>
                        </PopBox>
                    </div>
                    <div className="choose-text">Choose Your</div>
                    <div className={"choose-text " + p2color}>Gamemode</div>
                    <div className="gap"/>
                    <PopBox className="menu-spacer" color={p1color} onClick={() => setMode("Solo")} large={true}>
                        <div className="centered nav-box">
                            <div className="select-header">Solo</div>
                            <div className="select-body">Play against an AI to hone your skills.</div>
                        </div>
                    </PopBox>
                    <PopBox className="menu-spacer" color={p2color} onClick={() => setMode("Multi")} large={true}>
                        <div className="centered nav-box">
                            <div className="select-header">Multiplayer</div>
                            <div className="select-body">Play with your friend on the same device.</div>
                        </div>
                    </PopBox>
                    <PopBox className="menu-spacer disabled" color={p1color} large={true}>
                        <div className="centered nav-box">
                            <div className="select-header">Online</div>
                            <div className="select-body">Play against a friend, or start a game with a stranger.</div>
                        </div>
                    </PopBox>
                </div>
                <div className={"horizontally-centered slide-window " + page2Transition}>
                <div className="evenly-spaced menu-bar">
                        <PopBox color="accent" onClick={() => setState(1)}>
                            <div className="centered menu-nav">
                                <div><UilArrowLeft className="back-icon"/>Back</div>
                            </div>
                        </PopBox>
                        <PopBox color="accent" onClick={() => setState(0)}>
                            <div className="centered menu-nav">
                                <div><UilHome className="home-icon"/>Home</div>
                            </div>
                        </PopBox>
                    </div>
                    <div className="choose-text">Choose Your</div>
                    <div className={"choose-text " + p1color}>Timer</div>
                    <div className="gap"/>
                    <PopBox className="menu-spacer" color={p2color} onClick={() => setTimerStyle(null)} large={true}>
                        <div className="centered nav-box">
                            <div className="select-header">No Timer</div>
                            <div className="select-body">Play classic 2048 Duel.</div>
                        </div>
                    </PopBox>
                    <PopBox className="menu-spacer" color={p1color} onClick={() => setTimerStyle("Speed")} large={true}>
                        <div className="centered nav-box">
                            <div className="select-header">Speed</div>
                            <div className="select-body">Move quickly - if the time runs out a random move is chosen for you!</div>
                        </div>
                    </PopBox>
                    <PopBox className="menu-spacer" color={p2color} onClick={() => setTimerStyle("Timed")} large={true}>
                        <div className="centered nav-box">
                            <div className="select-header">Timed</div>
                            <div className="select-body">A timer runs down whenever it's your turn. If it reaches 0, you lose!</div>
                        </div>
                    </PopBox>
                </div>
                <div className={"slide-window " + page3Transition}>
                    <GameWrapper
                        p1color={p1color} p2color={p2color}
                        setP1color={setP1color} setP2color={setP2color}
                        p1name={p1name} p2name={p2name}
                        p1possessive={p1possessive} p2possessive={p2possessive}
                        state={state} setState={setState}
                        gamemode={gamemode} timer={timer}
                        winningPiece={winningPiece} setWinningPiece={setWinningPiece}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
