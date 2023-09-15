import React from 'react'
import "./TurnInfo.css"

import Card from 'react-bootstrap/Card';

function TurnInfo({p1color, p2color, p1name, p1possessive, p2name, p2possessive, turn, boardState}) {

    var msgColor = "";
    var msg = "Setting Up...";
    if (boardState == "tie")
        msg = "It's a tie!";

    else if (boardState == "win1"){
        msgColor = p1color;
        if (p1name == "You")
            msg = p1name + " win!";
        else
            msg = p1name + " wins!";
    }

    else if (boardState == "win2"){
        msgColor = p2color;
        if (p2name == "CPU")
            msg = p2name + " wins :(";
        else
            msg = p2name + " wins!";
    }

    else if (boardState == "no_change"){
        if (turn == 0)
            msgColor = p1color;
        else
            msgColor = p2color;
        msg = "Move again"
    }

    // normal turn
    else {
        if (turn == 0){
            msg = p1possessive + " turn";
            msgColor = p1color;
        }
        else {
            msg = p2possessive + " turn";
            msgColor = p2color;
        }
    }


    return (
        <>
            <Card className="turn-container">
                <div className={"turn text " + msgColor} id="turn">{msg}</div>
            </Card>
        </>
    )
}

export default TurnInfo
