import React from 'react'
import Button from 'react-bootstrap/Button';

import "./GameMessage.css"

function GameMessage({color, text, isButton=false, onClick=null}) {
    return (
        <div>
            {(isButton)
            ? <div className="endgame-msg">
                <Button variant="outline-main-color" className="game-msg-button " onClick={() => onClick()}>{text}</Button>
            </div>
            : <div className={"endgame-msg text " + color}>{text}</div>}
        </div>
    )
}

export default GameMessage
