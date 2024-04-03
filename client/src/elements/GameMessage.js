import React from 'react'
import Button from 'react-bootstrap/Button';

import "./GameMessage.css"

function GameMessage({color, text, isButton=false, onClick=null}) {
    return (
        <div>
            <div className="endgame-bkgd"/>
            <div className="endgame-msg">
                {(isButton)
                ? <Button variant="outline-main-color" className="game-msg game-msg-button " onClick={() => onClick()}>{text}</Button>  
                : <div className={"game-msg text " + color}>{text}</div>}
            </div>
        </div>
    )
}

export default GameMessage
