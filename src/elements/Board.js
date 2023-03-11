import React, { useState, useLayoutEffect} from 'react';
import "./Board.css"
import Tile from "./Tile"

function Board({p1color, p2color, board, owner, actions, turn}) {
    const [squares, setSquares] = useState([]);
    const [idCounter, setIdCounter] = useState(0);
    const [ids, setIds] = useState([
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1]]);


    // update the board after a move
    useLayoutEffect( () => {
        // store the new ids
        var tempIds = [
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
            [-1, -1, -1, -1]];
        var squareID = idCounter;

        // Determine the type of squares
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

                // new square
                if (val != 0){
                    newSquares[row + "," + col] = [row, col, val, color];
                }    
                
                // moved/deleted squares
                if (actions && actions[0][row][col]){
                    let drow = actions[0][row][col][1][0];
                    let dcol = actions[0][row][col][1][1];
                    let prevval = actions[0][row][col][0];
                    if (owner[drow][dcol] == 0)
                        color = p1color;
                    else
                        color = p2color;

                    movedSquares[drow + "," + dcol].push([row, col, drow, dcol, prevval, color]);
                }
            }
        }

        const tempSquares = [];
        // second run to actually build objects
        for (let row = 0; row < 4; ++row){
            for (let col = 0; col < 4; ++col){
                let loc = row + "," + col;
                if (loc in newSquares){

                    // new square, gets a new id
                    if (movedSquares[loc].length == 0){
                        tempIds[row][col] = squareID;
                        squareID++;
                        tempSquares.push([tempIds[row][col], newTile(...newSquares[loc], tempIds[row][col])]);
                    }

                    // moved square gets its previous id
                    else if (movedSquares[loc].length == 1){
                        let prevID = ids[movedSquares[loc][0][0]][movedSquares[loc][0][1]];
                        tempSquares.push([prevID, moveTile(...movedSquares[loc][0], false, prevID)]);
                        tempIds[row][col] = prevID;
                    }
                    
                    // merged square, new square gets a new id, previous squares get their old ids
                    else {
                        tempIds[row][col] = squareID;
                        squareID++;
                        tempSquares.push([tempIds[row][col], newTile(...newSquares[loc], tempIds[row][col])]);

                        for (let idx = 0; idx < movedSquares[loc].length; ++idx){
                            let prevID = ids[movedSquares[loc][idx][0]][movedSquares[loc][idx][1]];
                            tempSquares.push([prevID, moveTile(...movedSquares[loc][idx], true, prevID)]);
                        }
                    }
                }
            }
        }

        // sort squares to get animations to work
        tempSquares.sort();
        var finalSquares = tempSquares.map( x => x[1]);
        
        // debug statement to view the ids of each square
        // let nodeState = "";
        // for (let r = 0; r < tempIds.length; ++r){
        //     for (let c = 0; c < tempIds[0].length; ++c)
        //     nodeState += tempIds[r][c] + "\t";
        //     nodeState += "\n";
        // }
        // console.log("node ids:\n " + nodeState);

        setSquares(finalSquares);
        setIds(tempIds);
        setIdCounter(squareID);
    }, [turn, board, owner, actions]);


    // generate a new tile
    function newTile(row, col, val, color, id){
        return <Tile key={id} row={row} col={col} val={val} color={color} isNew={true}/>
    }

    // move a tile
    function moveTile(srow, scol, row, col, val, color, isDeleted, id){
        return <Tile key={id} row={row} col={col} val={val} color={color} isNew={false} isDeleted={isDeleted}/>
    }

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
