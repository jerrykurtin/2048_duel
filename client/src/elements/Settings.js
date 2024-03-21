import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import "./Settings.css";
import HowToPlay from './HowToPlay';


function Settings({gamemode, timer, setMoveType, winningPiece, setWinningPiece, difficulty, setDifficulty, timeLimit, setTimeLimit, p1color, setP1color, p2color, setP2color, p1possessive, p2possessive}) {

    // update a setting and reset the board.
    function updateSettings(type, event){
        // ToggleButtonGroup sends a null signal before actual signal
        if (event.target.value){
            let newValue = event.target.value;

            if (type === "winningPiece"){
                setWinningPiece(newValue);
            }

            else if (type === "difficulty"){
                console.log("setting difficulty to " + newValue);
                setDifficulty(newValue);
            }
            else if (type === "timeLimit"){
                console.log("setting timer to " + newValue);
                setTimeLimit(parseInt(newValue));
            }
            else if (type === "p1color"){
                console.log("setting p1 color: " + newValue);
                setP1color(newValue);
                setMoveType("refresh");
                return;
            }
            else if (type === "p2color"){
                console.log("setting p2 color: " + newValue);
                setP2color(newValue);
                setMoveType("refresh");
                return;
            }

            else {
                console.log("ERROR: unknown updateSettings type: " + type);
            }
            setMoveType("reset");
        }
    }

    function createDifficultySetting(gamemode){

        if (!gamemode){
            console.log("ERROR: no gamemode given");
            return null;
        }

        else if (gamemode.toLowerCase() === "solo"){
            return (<>
                <ToggleButtonGroup className="settings-toggle" type="radio" name="difficulty" defaultValue={difficulty} onClick={(e) => {updateSettings("difficulty", e)}}>
                    <ToggleButton variant="outline-main-color" className="toggle-name" id="difficulty-title" value={-1} disabled>Difficulty: </ToggleButton>
                    <ToggleButton variant="outline-main-color" id="difficulty-easy" value={"Easy"}>Easy</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="difficulty-medium" value={"Medium"}>Medium</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="difficulty-hard" value={"Hard"}>Hard</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="difficulty-impossible" value={"Impossible"}>Impossible</ToggleButton>
                </ToggleButtonGroup>
            
            </>)
        }

        else if (gamemode.toLowerCase() === "multi"){
            return null;
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
                <ToggleButtonGroup className="settings-toggle" type="radio" name="speed-limit" defaultValue={timeLimit} onClick={(e) => {updateSettings("timeLimit", e)}}>
                    <ToggleButton variant="outline-main-color" className="toggle-name" id="speed-limit-title" value={-1} disabled>Turn Time Limit (sec): </ToggleButton>
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
                <ToggleButtonGroup className="settings-toggle" type="radio" name="timed-limit" defaultValue={timeLimit} onClick={(e) => {updateSettings("timeLimit", e)}}>
                    <ToggleButton variant="outline-main-color" className="toggle-name" id="timed-limit-title" value={-1} disabled>Game Time Limit (sec): </ToggleButton>
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
            <div className="tab-contents">
                <ToggleButtonGroup className="settings-toggle" type="radio" name="winning-piece" defaultValue={winningPiece.toString()} onClick={(e) => {updateSettings("winningPiece", e)}}>
                    <ToggleButton variant="outline-main-color" className="toggle-name" id="winning-piece-title" value={-1} disabled>Winning Piece: </ToggleButton>
                    <ToggleButton variant="outline-main-color" id="winning-piece-32" value={"32"}>32</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="winning-piece-64" value={"64"}>64</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="winning-piece-128" value={"128"}>128</ToggleButton>
                </ToggleButtonGroup>

                {createDifficultySetting(gamemode)}

                {createTimeLimitSetting(timer)}

                <ToggleButtonGroup className="settings-toggle" type="radio" name="p1color" defaultValue={p1color} onClick={(e) => {updateSettings("p1color", e)}}>
                    <ToggleButton variant="outline-main-color" className="toggle-name" id="p1color-title" value={-1} disabled>{ p1possessive + " color: "}</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="p1color-green" value={"green"}>Green</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="p1color-blue" value={"blue"}>Blue</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="p1color-orange" value={"orange"}>Orange</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="p1color-purple" value={"purple"}>Purple</ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup className="settings-toggle" type="radio" name="p2color" defaultValue={p2color} onClick={(e) => {updateSettings("p2color", e)}}>
                    <ToggleButton variant="outline-main-color" className="toggle-name" id="p2color-title" value={-1} disabled>{ p2possessive + " color: "}</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="p2color-green" value={"green"}>Green</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="p2color-blue" value={"blue"}>Blue</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="p2color-orange" value={"orange"}>Orange</ToggleButton>
                    <ToggleButton variant="outline-main-color" id="p2color-purple" value={"purple"}>Purple</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    )
}

export default Settings
