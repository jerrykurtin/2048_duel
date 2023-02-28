import React, { useState, useRef, useEffect, useLayoutEffect} from 'react';
import "./Board.css"
import { CSSTransition } from 'react-transition-group';
import Example from "./Example.js";

const useMountTransition = (reset, setReset, delay) => {
    const [hasTransitionedIn, setHasTransitionedIn] = useState(false);
    const [var1, setVar1] = useState(true);

  
    useEffect(() => {
      let timeoutId;
  
      
      if (reset) {
        setHasTransitionedIn(false);
        setReset(false);
        console.log("transition reset!");
        // timeoutId = setTimeout(() => setHasTransitionedIn(false), delay);
      }
      else if (var1) {
        console.log("starting transition...");
        timeoutId = setTimeout(() => {
            console.log("Transition finished! setting transitionedIn to true");
            setHasTransitionedIn(true);
        }, delay);
      } 
  
      return () => {
        clearTimeout(timeoutId);
      }
    }, [delay, var1, setVar1, reset, setReset, hasTransitionedIn]);
  
    return hasTransitionedIn;
  }

function Board({p1color, p2color, board, owner, actions, moveTriggered, turn}) {
    const [showButton, setShowButton] = useState(true);
    const [isMounted, setIsMounted] = useState(true);
    const [reset, setReset] = useState(false);
    const hasTransitionedIn = useMountTransition(reset, setReset, 50);


    useEffect( () => {
        setReset(true);
        console.log("move triggered!");
    }, [turn]);

    function newTile(row, col, val, color, id){
        return <div key={id} className={"tile tile-new position-" + (row + 1) + "-" + (col + 1)}>
                <div className={"tile-inner background tile-" + val + " " + color}>{val}</div>
            </div>;
    }

    function moveTile(row, col, val, color, id){
        let start = 'position-3-2';
        let finish = 'position-' + (row + 1) + '-' + (col + 1);
        console.log("hasTransitionedIn:", hasTransitionedIn, "isMounted: ", isMounted);
        return <div key={id}
                // className = {"tile tile-new " + (hasTransitionedIn) ? "tile " : "tile-temp "}
                className={`tile tile-new ${hasTransitionedIn ? ("tile " + finish) : ("tile-temp " + start)}`}
                // className={`tile tile-new ${isMounted && "tile-temp " + start} ${hasTransitionedIn && "tile " + finish}`}
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
