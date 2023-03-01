import React, { useState, useRef, useEffect, useLayoutEffect} from 'react';
import "./Board.css"
import useDelayedSignal from './useDelayedSignal';

function Board({p1color, p2color, board, owner, actions, turn}) {
    const [isMounted, setIsMounted] = useState(true);
    const [reset, setReset] = useState(false);
    const delayedSignal = useDelayedSignal(reset, setReset, 25000);
    const [squares, setSquares] = useState([]);


    // used in conjunction with delayedSignal to trigger motion
    useLayoutEffect( () => {
        setReset(true);
        console.log("move triggered!");

        console.log("actions: ", actions);
        const newSquares = {};
        const movedSquares = {};
        for (let row = 0; row < 4; ++row){
            for (let col = 0; col < 4; ++col){
                movedSquares[row + "," + col] = [];
            }
        }


        for (let row = 0; row < 4; ++row){
            for (let col = 0; col < 4; ++col){
                var val = board[row][col].toString();
                var color;
                if (owner[row][col] == 0)
                        color = p1color;
                    else
                        color = p2color;

                if (val != 0){
                    newSquares[row + "," + col] = [row, col, val, color]; // newTile(row, col, val, color, row * 10 + col);
                }    
                
                // moved/deleted tiles
                if (actions && actions[0][row][col]){
                    let drow = actions[0][row][col][1][0];
                    let dcol = actions[0][row][col][1][1];
                    let prevval = actions[0][row][col][0];
                    if (owner[drow][dcol] == 0)
                        color = p1color;
                    else
                        color = p2color;

                    // console.log("moved tile starts at " + row + "," +  col + " and ends at " + drow + "," + dcol);
                    movedSquares[drow + "," + dcol].push([row, col, drow, dcol, prevval, color]); // moveTile(actions[0][row][col][1], actions[0][row][col][2], row, col, val, color, row * 10 + col));
                    // squares.push(moveTile(actions[0][row][col][1], actions[0][row][col][2], row, col, val, color, row * 10 + col));
                }
            }
        }

        // console.log("new squares: ", newSquares);
        // console.log("moved squares: ", movedSquares);
        const tempSquares = [];
        var squareID = 0;
        // second run to actually build objects
        for (let row = 0; row < 4; ++row){
            for (let col = 0; col < 4; ++col){
                let loc = row + "," + col;
                if (loc in newSquares){
                    // new square
                    if (movedSquares[loc].length == 0){
                        // console.log("new square at " + row + "," + col);
                        tempSquares.push(newTile(...newSquares[loc], squareID));
                        squareID++;
                    }
                    // moved square
                    else if (movedSquares[loc].length == 1){
                        // console.log("moved square at " + row + "," + col);
                        // console.log("variables: " + movedSquares[loc][0]);
                        tempSquares.push(moveTile(...movedSquares[loc][0], false, squareID));
                        squareID++;
                    }
                    
                    // merged square
                    else {
                        // console.log("merged square at " + row + "," + col);
                        tempSquares.push(newTile(...newSquares[loc], squareID));
                        squareID++;
                        for (let idx = 0; idx < movedSquares[loc].length; ++idx){
                            // console.log("variables: " + movedSquares[loc][0]);
                            tempSquares.push(moveTile(...movedSquares[loc][idx], true, squareID));
                            squareID++;
                        }
                    }
                }
            }
        }
        
        setSquares(tempSquares);
    }, [turn]);

    // generate a new tile
    function newTile(row, col, val, color, id){
        return <div key={id} className={"tile tile-new position-" + (row + 1) + "-" + (col + 1)}>
                <div className={"tile-inner background tile-" + val + " " + color}>{val}</div>
            </div>;
    }

    // move a tile
    function moveTile(srow, scol, row, col, val, color, isDeleted, id){
        // console.log("moving square from " + srow + "," + scol + " to " + row + "," + col);
        let start = 'position-' + (srow + 1) + '-' + (scol + 1);
        let finish = 'position-' + (row + 1) + '-' + (col + 1);
        return <div key={id}
                className={`tile ${delayedSignal ? ("tile-temp " + start) : ("tile " + finish)} ${(isDeleted) ? "deleted" : ""}`}
                >
                <div className={"tile-inner background tile-" + val + " " + color}>{val}</div>
            </div>;
    }

    


    // console.log(squares.length + " squares on board");

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
