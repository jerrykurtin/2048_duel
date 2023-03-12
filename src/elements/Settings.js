import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import "./Settings.css";


function Settings({gamemode, timer, resetBoard, winningPiece, setWinningPiece, difficulty, setDifficulty, timeLimit, setTimeLimit, p1Color, setP1Color, p2Color, setP2Color}) {

    // update a setting and reset the board.
    function updateSettings(type, event){
        if (event.target.value){
            let newValue = event.target.value;

            if (type === "winningPiece"){
                setWinningPiece(newValue);
            }

            else {
                console.log("ERROR: unknown updateSettings type: " + type);
            }
        }

        resetBoard();
    }


    return (
        <div>
            <Tabs
                defaultActiveKey="settings"
                justify
                >
                <Tab eventKey="settings" title="Settings">
                    <div className="tab-contents">
                        <ButtonGroup>
                            <Button variant="secondary" disabled>Winning Piece</Button>
                            <Button variant="outline-secondary">32</Button>
                            <Button variant="outline-secondary">64</Button>
                            <Button variant="outline-secondary">128</Button>
                        </ButtonGroup>

                        <hr />

                        <ButtonGroup>
                            <Button variant="secondary" disabled>Difficulty</Button>
                            <Button variant="outline-secondary">Easy</Button>
                            <Button variant="outline-secondary">Medium</Button>
                            <Button variant="outline-secondary">Hard</Button>
                            <Button variant="outline-secondary">Impossible</Button>
                        </ButtonGroup>

                        <hr />

                        <ButtonGroup>
                            <Button variant="secondary" disabled>Turn Time Limit</Button>
                            <Button variant="outline-secondary">1s</Button>
                            <Button variant="outline-secondary">2s</Button>
                            <Button variant="outline-secondary">5s</Button>
                            <Button variant="outline-secondary">10s</Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button variant="secondary" disabled>Game Time Limit</Button>
                            <Button variant="outline-secondary">30s</Button>
                            <Button variant="outline-secondary">60s</Button>
                        </ButtonGroup>

                        <hr />
                        <ToggleButtonGroup  type="radio" name="winning-piece" defaultValue={winningPiece} onClick={(e) => {updateSettings("winningPiece", e)}}>
                            <ToggleButton variant="outline-main-color" id="winning-piece-title" value={-1} disabled>Winning Piece: </ToggleButton>
                            <ToggleButton variant="outline-main-color" id="winning-piece-32" value={32}>32</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="winning-piece-64" value={64}>64</ToggleButton>
                            <ToggleButton variant="outline-main-color" id="winning-piece-128" value={128}>128</ToggleButton>
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
