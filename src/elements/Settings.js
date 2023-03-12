import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Alert from 'react-bootstrap/Alert';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import "./Settings.css";


function Settings() {
    const [inst, setInst] = useState(false);
    const [controls, setControls] = useState(false);
    const [settings, setSettings] = useState(false);

    function setVisibleElements(element){
        if (element === "instructions"){
            if (inst)
                setInst(false);
            else {
                setInst(true);
                setControls(false);
                setSettings(false);
            }
        }
        else if (element === "controls"){
            if (controls)
                setControls(false);
            else {
                setInst(false);
                setControls(true);
                setSettings(false);
            }
        }
        else if (element === "settings"){
            if (settings)
                setSettings(false);
            else {
                setInst(false);
                setControls(false);
                setSettings(true);
            }
        }
    }


    return (
        <div>
            <Tabs
                defaultActiveKey="controls"
                justify
                >
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
                            The winner is the first to create the winning piece (64)
                            or the one with the highest score when there are no available moves.
                        </p>
                    </div>
                </Tab>
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
                            <Button variant="secondary" disabled>Gamemode</Button>
                            <Button variant="outline-secondary">Solo</Button>
                            <Button variant="outline-secondary">Multiplayer</Button>
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
                            <Button variant="secondary" disabled>Timer</Button>
                            <Button variant="outline-secondary">None</Button>
                            <Button variant="outline-secondary">Speed</Button>
                            <Button variant="outline-secondary">Chess</Button>
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

                        <ToggleButtonGroup  type="radio" name="options" defaultValue={1}>
                            <ToggleButton variant="outlined-secondary" id="tbg-radio-1" value={1}>Radio 1 (pre-checked)</ToggleButton>
                            <ToggleButton variant="outlined-secondary" id="tbg-radio-2" value={2}>
                            Radio 2
                            </ToggleButton>
                            <ToggleButton variant="outlined-secondary" id="tbg-radio-3" value={3}>
                            Radio 3
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </Tab>
            </Tabs>

        <div className="bottom-buffer"/>
            
        </div>
    )
}

export default Settings
