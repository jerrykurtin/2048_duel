import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import "./Settings.css";


function Settings({gamemode, timer, updateBoard, winningPiece, setWinningPiece, difficulty, setDifficulty, timeLimit, setTimeLimit, p1color, setP1color, p2color, setP2color, p1possessive, p2possessive}) {

    // update a setting and reset the board.
    function updateSettings(type, event){
        // ToggleButtonGroup sends a null signal before actual signal
        if (event.target.value){
            let newValue = event.target.value;

            if (type === "winningPiece"){
                setWinningPiece(newValue);
                // calling updateBoard with new value prevents updateBoard from running with stale winningPiece
                updateBoard("reset", newValue, gamemode, difficulty);
                return;
            }

            else if (type === "difficulty"){
                console.log("setting difficulty to " + newValue);
                setDifficulty(newValue);
            }
            else if (type === "timeLimit"){
                console.log("setting timer to " + newValue);
                setTimeLimit(newValue);
            }
            else if (type === "p1color"){
                console.log("setting p1 color: " + newValue);
                setP1color(newValue);
            }
            else if (type === "p2color"){
                console.log("setting p2 color: " + newValue);
                setP2color(newValue);
            }

            else {
                console.log("ERROR: unknown updateSettings type: " + type);
            }
            updateBoard("reset", winningPiece, gamemode, difficulty);
        }
    }

    function createDifficultySetting(gamemode){

        if (!gamemode){
            console.log("ERROR: no gamemode given");
            return null;
        }

        else if (gamemode.toLowerCase() === "solo"){
            return (<>
                <hr />
                <ToggleButtonGroup  type="radio" name="difficulty" defaultValue={difficulty} onClick={(e) => {updateSettings("difficulty", e)}}>
                    <ToggleButton variant="outline-main-color" id="difficulty-title" value={-1} disabled>Difficulty: </ToggleButton>
                    <ToggleButton variant="outline-main-color" id="difficulty-easy" value={"easy"}>Easy</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="difficulty-medium" value={"medium"}>Medium</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="difficulty-hard" value={"hard"}>Hard</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="difficulty-impossible" value={"impossible"}>Impossible</ToggleButton>
                </ToggleButtonGroup>
            
            </>)
        }

        else {
            console.log("ERROR: gamemode " + gamemode + " not recognized");
            return null;
        }
    }

    // create the time limit settings
    function createTimeLimitSetting(timer){
        if (!timer){
            return null;
        }

        else if (timer.toLowerCase() === "speed"){
            return (<>
                <hr />
                <ToggleButtonGroup  type="radio" name="speed-limit" defaultValue={timeLimit} onClick={(e) => {updateSettings("timeLimit", e)}}>
                    <ToggleButton variant="outline-main-color" id="speed-limit-title" value={-1} disabled>Turn Time Limit (sec): </ToggleButton>
                    <ToggleButton variant="outline-main-color" id="speed-limit-1" value={1}>1</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="speed-limit-2" value={2}>2</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="speed-limit-3" value={3}>3</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="speed-limit-5" value={5}>5</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="speed-limit-10" value={10}>10</ToggleButton>
                </ToggleButtonGroup>
            </>)
        }

        else if (timer.toLowerCase() === "timed"){
            return (<>
                <hr />
                <ToggleButtonGroup  type="radio" name="timed-limit" defaultValue={timeLimit} onClick={(e) => {updateSettings("timeLimit", e)}}>
                    <ToggleButton variant="outline-main-color" id="timed-limit-title" value={-1} disabled>Game Time Limit (sec): </ToggleButton>
                    <ToggleButton variant="outline-main-color" id="timed-limit-30" value={30}>30</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="timed-limit-60" value={60}>60</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="timed-limit-90" value={90}>90</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="timed-limit-120" value={120}>120</ToggleButton>
                </ToggleButtonGroup>
            </>)
        }
        
        else {
            console.log("ERROR: invalid timer: " + timer);
            return null;
        }
    }


    return (
        <div>
            <Tabs
                defaultActiveKey="settings"
                justify
                >
                <Tab eventKey="settings" title="Settings">
                    <div className="tab-contents">
                        <ToggleButtonGroup  type="radio" name="winning-piece" defaultValue={winningPiece} onClick={(e) => {updateSettings("winningPiece", e)}}>
                            <ToggleButton variant="outline-main-color" id="winning-piece-title" value={-1} disabled>Winning Piece: </ToggleButton>
                            <ToggleButton variant="outline-main-color" id="winning-piece-32" value={32}>32</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="winning-piece-64" value={64}>64</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="winning-piece-128" value={128}>128</ToggleButton>
                        </ToggleButtonGroup>

                        {createDifficultySetting(gamemode)}

                        {createTimeLimitSetting(timer)}

                        <hr/>
                        <ToggleButtonGroup  type="radio" name="p1color" defaultValue={p1color} onClick={(e) => {updateSettings("p1color", e)}}>
                            <ToggleButton variant="outline-main-color" id="p1color-title" value={-1} disabled>{ p1possessive + " color: "}</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="p1color-green" value={"green"}>Green</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="p1color-blue" value={"blue"}>Blue</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="p1color-salmon" value={"salmon"}>Salmon</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="p1color-purple" value={"purple"}>Purple</ToggleButton>
                        </ToggleButtonGroup>

                        <hr/>
                        <ToggleButtonGroup  type="radio" name="p2color" defaultValue={p2color} onClick={(e) => {updateSettings("p2color", e)}}>
                            <ToggleButton variant="outline-main-color" id="p2color-title" value={-1} disabled>{ p2possessive + " color: "}</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="p2color-green" value={"green"}>Green</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="p2color-blue" value={"blue"}>Blue</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="p2color-salmon" value={"salmon"}>Salmon</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="p2color-purple" value={"purple"}>Purple</ToggleButton>
                        </ToggleButtonGroup>
                        
                    </div>
                </Tab>
                <Tab eventKey="controls" title="Controls">
                    <div className="tab-contents">
                        <p>
                            Use the arrow keys (swipe for mobile) to move the pieces.
                        </p>
                        <hr />
                        <p>
                            For desktop multiplayer, player 1 moves with the arrow keys, and player 2 uses WASD.
                        </p>
                    </div>
                </Tab>
                <Tab eventKey="how-to" title="How to Play">
                    <div className="tab-contents">
                        <p>
                            On your turn, choose which direction to move all pieces.
                            When pieces with the same number move into each other, the
                            pieces merge and double.  
                        </p>
                        <hr />
                        <p>
                            Merge one of your pieces with one of your opponents to steal the piece.
                            Merging two of your pieces (or your opponents') doesn't change the ownership.
                        </p>
                        <hr />
                        <p id="goal-inst">
                            {"The winner is the first to create the winning piece or the one with the highest score when there are no available moves."}
                        </p>
                    </div>
                </Tab>
            </Tabs>

        <div className="bottom-buffer"/>
            
        </div>
    )
}

export default Settings
