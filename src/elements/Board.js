import React, { useState, useLayoutEffect} from 'react';
import "./Board.css";
import Tile from "./Tile";
import GameMessage from './GameMessage';

function winMsg(playerName){
    if (playerName === "You")
        return "You win!";
    else if (playerName === "CPU")
        return "CPU wins :(";
    else
        return playerName + " wins!";
}

function Board({p1color, p2color, p1name, p2name, board, owner, actions, turn, boardState}) {
    const [squares, setSquares] = useState([]);
    const [endgame, setEndgame] = useState(null);
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
        const newSquares = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
        ]
        const movedSquares = [
            [[], [], [], []],
            [[], [], [], []],
            [[], [], [], []],
            [[], [], [], []],
        ]

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
                    newSquares[row][col] = [row, col, val, color];
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

                    movedSquares[drow][dcol].push([row, col, drow, dcol, prevval, color]);
                }
            }
        }

        const tempSquares = [];
        // second run to actually build objects
        for (let row = 0; row < 4; ++row){
            for (let col = 0; col < 4; ++col){
                if (newSquares[row][col]){

                    // new square, gets a new id
                    if (movedSquares[row][col].length == 0){
                        tempIds[row][col] = squareID;
                        squareID++;
                        tempSquares.push([tempIds[row][col], newTile(...newSquares[row][col], tempIds[row][col])]);
                    }

                    // moved square gets its previous id
                    else if (movedSquares[row][col].length == 1){
                        let prevID = ids[movedSquares[row][col][0][0]][movedSquares[row][col][0][1]];
                        tempSquares.push([prevID, moveTile(...movedSquares[row][col][0], false, prevID)]);
                        tempIds[row][col] = prevID;
                    }
                    
                    // merged square, new square gets a new id, previous squares get their old ids
                    else {
                        tempIds[row][col] = squareID;
                        squareID++;
                        tempSquares.push([tempIds[row][col], newTile(...newSquares[row][col], tempIds[row][col])]);

                        for (let idx = 0; idx < movedSquares[row][col].length; ++idx){
                            let prevID = ids[movedSquares[row][col][idx][0]][movedSquares[row][col][idx][1]];
                            tempSquares.push([prevID, moveTile(...movedSquares[row][col][idx], true, prevID)]);
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

        // endgame message
        if (boardState === "tie"){
            setEndgame(<GameMessage text="It's a tie!"/>);
        }
        else if (boardState === "win1"){
            setEndgame(<GameMessage color={p1color} text={winMsg(p1name)}/>);
        }
        else if (boardState === "win2"){
            setEndgame(<GameMessage color={p2color} text={winMsg(p2name)}/>);
        }
        else {
            setEndgame(null);
        }

        setSquares(finalSquares);
        setIds(tempIds);
        setIdCounter(squareID);
    }, [turn, board, owner, actions]);

    console.log("board state: " + boardState);

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
                {endgame}
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
