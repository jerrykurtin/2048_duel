import React, { useState, useRef } from 'react';
import "./Board.css"
import { CSSTransition } from 'react-transition-group';
import Example from "./Example.js";



function Board({p1color, p2color, board, owner, actions}) {
    const [showButton, setShowButton] = useState(true);

    function dummyCallback(){
        console.log("CALLBACK REACHED");
    }

    function buttonPress(){
        setShowButton(true);
        console.log("show button: ", showButton);
    }

    function newTile(row, col, val, color, id){
        return <div key={id} className={"tile tile-new position-" + (row + 1) + "-" + (col + 1)}>
                <div className={"tile-inner background tile-" + val + " " + color}>{val}</div>
            </div>;
    }

    function moveTile(row, col, val, color, id){
        return <Example/>;
        // return <CSSTransition 
        //         in={true} key={id} timeout={300} 
        //         classNames={{
        //             enter: "position-3-2",
        //             enterActive: "position-" + (row + 1) + "-" + (col + 1),
        //         }}
                
        //         onEntered={() => dummyCallback()}
        //         onEntering={() => dummyCallback()}
        //         onExited={() => dummyCallback()}
        //     >
        //     <div key={id} className={"tile"}>
        //             <div className={"tile-inner background tile-" + val + " " + color}>{val}</div>
        //     </div>
        // </CSSTransition>;
    }

    // NOTE: use keyframes to delete object
    const squares = [];
    console.log("board: ", board);
    for (let row = 0; row < 4; ++row){
        for (let col = 0; col < 4; ++col){
            var val = board[row][col].toString();
            var color;
            if (owner[row][col] == 0)
                    color = p1color;
                else
                    color = p2color;

            if (val != 0){
                squares.push(newTile(row, col, val, color, row * 10 + col));
            }
        }
    }
    console.log(squares.length + " squares on board");

    return (
        <div>
        <div className="game-container" id="game-container">
                <div className="endgame-msg text hidden" id="endgame-msg"></div>
                <div className="endgame-msg text hidden" id="start-msg">
                    <button id="start-button">Start game (g)</button>
                </div>
                <div className="grid-container">
                    <div className="grid-row">
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell final-cell"></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell final-cell"></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell final-cell"></div>
                    </div>
                    <div className="grid-row final-row">
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell final-cell"></div>
                    </div>
                </div>
                <div className="tile-container" id="tile-container">
                {squares}
                </div>
            </div>
        </div>
    )
}

export default Board
