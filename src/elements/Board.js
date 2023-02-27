import React, { useState, useRef, useEffect } from 'react';
import "./Board.css"
import { CSSTransition } from 'react-transition-group';
import Example from "./Example.js";

const useMountTransition = (isMounted, unmountDelay) => {
    const [hasTransitionedIn, setHasTransitionedIn] = useState(false);
  
    useEffect(() => {
      let timeoutId;
  
      if (isMounted && !hasTransitionedIn) {
        setHasTransitionedIn(true);
      } else if (!isMounted && hasTransitionedIn) {
        timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
      }
  
      return () => {
        clearTimeout(timeoutId);
      }
    }, [unmountDelay, isMounted, hasTransitionedIn]);
  
    return hasTransitionedIn;
  }

function Board({p1color, p2color, board, owner, actions}) {
    const [showButton, setShowButton] = useState(true);
    const [isMounted, setIsMounted] = useState(true);
    const hasTransitionedIn = useMountTransition(isMounted, 1000);

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
        let start = 'position-3-2';
        let finish = 'position-' + (row + 1) + '-' + (col + 1);
        return <div key={id}
                className={`tile tile-new ${hasTransitionedIn && finish} ${isMounted && start}`}
                >
                <div className={"tile-inner background tile-" + val + " " + color}>{val}</div>
            </div>;
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
                squares.push(moveTile(row, col, val, color, row * 10 + col));
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
