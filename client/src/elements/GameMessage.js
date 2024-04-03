import React from 'react'
import Button from 'react-bootstrap/Button';

import "./GameMessage.css"

import PopBox from './PopBox';

function GameMessage({color, text, isButton=false, onClick=null}) {
    return (
        <div>
            <div className="endgame-bkgd"/>
            <div className="endgame-msg">
                {(isButton)
                ? <div className="game-msg centered">
                    <PopBox color="accent" onClick={() => onClick()}>
                        <div className="centered game-msg-start">
                            <div>{text}</div>
                        </div>
                    </PopBox>
                </div>
                // <Button variant="outline-main-color" className="game-msg game-msg-button " onClick={() => onClick()}>{text}</Button>  
                : <div className={"game-msg text " + color}>{text}</div>}
            </div>
        </div>
    )
}

export default GameMessage
