import React from 'react'

var cardinal_moves = ["up", "down", "left", "right"];

class BoardClass {
    constructor(win_condition=64, copy_board=null) {
        /**
         * @param {int} win_condition - The number to win at. Default: 64 (ignored if copy_board is defined)
         * @param {Board} copy_board - The board to copy, default: null
         */

        // board variables
        this.board_size = 4;
        this.win_condition = win_condition;
        this.squares_added = 1;

         // my workaround for a copy constructor
         if (copy_board){
            this.board = deepCopy(copy_board.board);
            this.owner = deepCopy(copy_board.owner);
            this.p1score = copy_board.p1score;
            this.p2score = copy_board.p2score;
            this.win_condition = copy_board.win_condition;

            this.board_state = copy_board.board_state;
            this.player = copy_board.player;
            this.first_round = copy_board.first_round;

            return;
         }


        this.board_state = "continue";  // "continue", "no_change", "win1", "win2", "tie"
        this.player = 0;
        this.first_round = true;

        // create board
        this.board = new Array(this.board_size);
        for (let r = 0; r < this.board.length; ++r){
            this.board[r] = new Array(this.board_size).fill(0);
        }
        this.owner = new Array(this.board_size);
        for (let r = 0; r < this.owner.length; ++r){
            this.owner[r] = new Array(this.board_size).fill(-1);
        }

        // initialize the first numbers
        var st1 = [randint(0, this.board_size - 1), randint(0, this.board_size - 1)]
        var st2 = [randint(0, this.board_size - 1), randint(0, this.board_size - 1)]
        while (st1[0] == st2[0] || st1[1] == st2[1])
            st2 = [randint(0, this.board_size - 1), randint(0, this.board_size - 1)]

        this.board[st1[0]][st1[1]] = 2
        this.owner[st1[0]][st1[1]] = 0

        this.board[st2[0]][st2[1]] = 2
        this.owner[st2[0]][st2[1]] = 1


        this.p1score = 2;
        this.p2score = 2;
    }

    move(dir, add_squares=true){
        /* Moves in the direction specified, returning the array of actions for each block */
        
        // endgame: grid is full
        if (!this.move_exists()){
            if (this.p1score > this.p2score)
                this.board_state = "win1";
            else if (this.p1score < this.p2score)
                this.board_state = "win2";
            else
                this.board_state = "tie";
            return null;
        }

        if (this.board_state != "continue" && this.board_state != "no_change"){
            console.log("ERROR: cannot move in endgame!");
            return null;
        }
        var prev_state = deepCopy(this.board);

        // make the move
        var actions = null;
        if (dir == "up")
            actions = this.up();
        else if (dir == "down")
            actions = this.down();
        else if (dir == "left")
            actions = this.left();
        else if (dir == "right")
            actions = this.right();
        else{
            console.log("ERROR: invalid direction (" + dir + ")");
            return null;
        }

        // check for no change
        if (deepCompare(this.board, prev_state)){
            this.board_state = "no_change";
            return null;
        }
        else{
            this.board_state = "continue";
        }

        // check for win condition and add squares
        var cands = new Array();
        this.p1score = 0;
        this.p2score = 0;
        for (let row = 0; row < this.board.length; ++row){
            for (let col = 0; col < this.board[0].length; ++col){

                // win!
                if (this.board[row][col] == this.win_condition){
                    if (this.owner[row][col] == 0){
                        this.board_state = "win1";
                        this.p1score += this.board[row][col];
                    }
                    else{
                        this.board_state = "win2";
                        this.p2score += this.board[row][col];
                    }
                }

                // empty square
                else if (this.board[row][col] == 0){
                    cands.push([row, col]);
                }

                // number square, add to score
                else {
                    if (this.owner[row][col] == 0)
                        this.p1score += this.board[row][col];
                    else
                        this.p2score += this.board[row][col];
                }
            }
        }

        // elimination win
        if (this.p1score == 0 || this.board_state == "win2"){
            this.board_state = "win2";
            return actions;
        }
        else if (this.p2score == 0 || this.board_state == "win1"){
            this.board_state = "win1";
            return actions;
        }

        // endgame: grid can't add any values
        if (cands.length < this.squares_added){
            if (this.p1score > this.p2score)
                this.board_state = "win1";
            else if (this.p1score < this.p2score)
                this.board_state = "win2";
            else
                this.board_state = "tie";
            return actions;
        }

        // add squares
        if (add_squares){
            // select new value(s) to add
            var new_squares = new Array();
            if (this.first_round && this.squares_added == 1){
                new_squares.push(4);
                this.first_round = false;
            }
            else{
                var choices = new Array();
                for (let twos = 0; twos < 3; ++twos)
                choices.push(2);
                for (let fours = 0; fours < 1; ++fours)
                choices.push(4);
                
                for (let ch = 0; ch < this.squares_added; ++ch)
                new_squares.push(choices[randint(0, choices.length - 1)]);
            }
            
            // add the new value(s) to random location(s)
            var locations = new Array();
            for (let ch = 0; ch < this.squares_added; ++ch)
            locations.push(cands[randint(0, cands.length - 1)]);
            
            for (let square = 0; square < new_squares.length; ++square){
                this.board[locations[square][0]][locations[square][1]] = new_squares[square];
                this.owner[locations[square][0]][locations[square][1]] = this.player;
                if (actions) actions[2][locations[square][0]][locations[square][1]] = true;

                if (this.player == 0)
                    this.p1score += new_squares[square];
                else
                    this.p2score += new_squares[square];
            }
        }

        // endgame: after adding squares, no move exists
        if (!this.move_exists()){
            if (this.p1score > this.p2score)
                this.board_state = "win1";
            else if (this.p1score < this.p2score)
                this.board_state = "win2";
            else
                this.board_state = "tie";
            return actions;
        }
            
        // switch to the next player
        this.player = (this.player + 1) % 2;

        return actions;
    }

    move_exists(){
        /* Test if available move exists */
        var temp_board = new BoardClass(-1, this);
        var prev_state = temp_board.board;
        
        temp_board.up();
        if (!deepCompare(prev_state, temp_board.board))
            return true;
        temp_board.down();
        if (!deepCompare(prev_state, temp_board.board))
            return true;
        temp_board.left();
        if (!deepCompare(prev_state, temp_board.board))
            return true;
        temp_board.right();
        if (!deepCompare(prev_state, temp_board.board))
            return true;

        return false;
    }
    
    left(){
        /* make a left movement */

        // store the movement information
        var actions = [];
        var deleted = [];
        var created = [];

        for (let row = 0; row < this.board.length; ++row){
            // store the new row
            var newrow = Array(this.board.length).fill(0);
            var newowner = Array(this.board.length).fill(-1);
            // stores [action, [end_row, end_col]] -> null, "move", "delete", "create"
            var actionrow = Array(this.board.length).fill(null);
            var deleterow = Array(this.board.length).fill(false);
            var createrow = Array(this.board.length).fill(false);
            // stores start_col for each position with a piece
            var newidx = 0;

            for (let col = 0; col < this.board[0].length; ++col){
                if (this.board[row][col] != 0){

                    // merge
                    if (newidx > 0 && this.board[row][col] == newrow[newidx - 1]){
                        newrow[newidx - 1] = newrow[newidx - 1] * -2; // negative prevents double merging

                        // determine ownership of square
                        if (newowner[newidx - 1] != this.owner[row][col]){
                            newowner[newidx - 1] = this.player;
                        }

                        // update destination for delete and move
                        actionrow[col] = [this.board[row][col], [row, newidx - 1]];

                        // update actions for 2 deleted and 1 created square
                        deleterow[newidx - 1] = true;
                        createrow[newidx - 1] = true;
                    }

                    // move without merging
                    else{
                        newrow[newidx] = this.board[row][col];
                        newowner[newidx] = this.owner[row][col];
                        newidx += 1;

                        // update actionrow
                        actionrow[col] = [this.board[row][col], [row, newidx - 1]];
                    }
                }
            }

            // update the board
            for (let col = 0; col < this.board[0].length; ++col)
                newrow[col] = Math.abs(newrow[col]);
            this.board[row] = newrow;

            actions.push(actionrow);
            deleted.push(deleterow);
            created.push(createrow);

            // update the owner
            this.owner[row] = newowner;

        }
        return [actions, deleted, created];
    }

    up(){
        /* make an up movement */
        this.board = rotateCounter(this.board);
        this.owner = rotateCounter(this.owner);

        var actions = this.left();

        
        this.board = rotateClock(this.board);
        this.owner = rotateClock(this.owner);
        actions = rotateActionsClock(actions);

        return actions;
    }

    right(){
        /* make a right movement */
        this.board = rotateCounter(this.board);
        this.owner = rotateCounter(this.owner);

        this.board = rotateCounter(this.board);
        this.owner = rotateCounter(this.owner);

        var actions = this.left();

        this.board = rotateClock(this.board);
        this.owner = rotateClock(this.owner);

        this.board = rotateClock(this.board);
        this.owner = rotateClock(this.owner);

        actions = rotateActionsClock(actions);
        actions = rotateActionsClock(actions);
        return actions;
    }

    down(){
        /* make a downward movement */
        this.board = rotateClock(this.board);
        this.owner = rotateClock(this.owner);

        var actions = this.left();

        this.board = rotateCounter(this.board);
        this.owner = rotateCounter(this.owner);
        actions = rotateActionsCounter(actions);
        return actions;
    }

    find_move_value(){
        /* finds the maximum and minimum next-turn move values for a board (p1score - p2score) */
        // TO-DO: add depth argument for recursion

        var scores = [];
        for (let dir = 0; dir < 4; ++dir){
            var temp_board = new BoardClass(-1, this);
            temp_board.move(cardinal_moves[dir], false);
            if (temp_board.board_state == "no_change")
                continue;

            // promote wins/ don't promote losses
            else if (temp_board.board_state == "win1"){
                if (temp_board.player == 1)
                    scores.push(-10000)
                else
                    scores.push(10000)
            }
            else if (temp_board.board_state == "win2"){
                if (temp_board.player == 0)
                    scores.push(-10000)
                else
                    scores.push(10000)
            }

            else 
                scores.push(temp_board.p1score - temp_board.p2score);
        }

        if (!scores){
            return null;
        }
        // console.log("all possible move differentials for player2: " + scores);

        return [Math.min(...scores), Math.max(...scores)];
    }

    explore_moves() {

        /* const function to explore the best moves. Returns the moves in order of their average 2-turn payout */
        var dirs = [[0, cardinal_moves[0]], [0, cardinal_moves[1]], [0, cardinal_moves[2]], [0, cardinal_moves[3]]];
        var player = this.player;
        // var initial_diff = this.p1score - this.p2score;
        console.log("received board:\n" + this.build_grid() + " as player " + (player + 1));
        // console.log("initial differential (p1score - p2score): " + initial_diff);

        // search the moves in every direction
        for (let dir = 0; dir < 4; ++dir){
            var temp_board = new BoardClass(-1, this);
            temp_board.move(cardinal_moves[dir], false);
            // var move_diff = temp_board.p1score - temp_board.p2score - initial_diff;
            // move_diff = 0;

            console.log("exploring move " + cardinal_moves[dir] + ", has board\n" + temp_board.build_grid());

            // don't promote no_change
            if (temp_board.board_state == "no_change"){
                dirs[dir][0] = -Number.MAX_VALUE;
            }

            // promote win, don't promote loss
            else if (temp_board.board_state == "win1"){
                if (player == 0)
                    dirs[dir][0] = Number.MAX_VALUE;
                else
                    dirs[dir][0] = -Number.MAX_VALUE;
            }
            else if (temp_board.board_state == "win2"){
                if (player == 1)
                    dirs[dir][0] = Number.MAX_VALUE;
                else
                    dirs[dir][0] = -Number.MAX_VALUE;
            }

            // calculate the best next move based on minimum oponnent's score
            else{
                let min_max = temp_board.find_move_value();
                if (player == 0)
                    var added = min_max[0];
                else
                    var added = min_max[1];
                // console.log("choosing opponent move with differential " + added);
                dirs[dir][0] =  added;  // + move_diff;
                console.log("if the opponent plays optimally, the max score differential they can reach is " + dirs[dir][0]);
                if (player == 1){
                    dirs[dir][0] = -1 * dirs[dir][0];
                }
            }

            if (dirs[dir][0] == Number.MAX_VALUE){
                console.log("prioritizing this move!");
            }
            else if (dirs[dir][0] == -Number.MAX_VALUE){
                console.log("avoiding this move at all costs!");
            }
        }

        // sorts in reverse order
        dirs.sort(function(a,b){return b[0] - a[0]})
        // remove all -infinity values
        while (dirs.length > 0 && dirs[dirs.length - 1][0] == -Number.MAX_VALUE)
            dirs.pop();
        return dirs;
    }

    build_grid(){
        var board = deepCopy(this.board);
        for (let r = 0; r < board.length; ++r){
            for (let c = 0; c < board[0].length; ++c){
                if (this.owner[r][c] == 1)
                    board[r][c] *= -1;
            }
        }

        var ans = "";
        for (let row = 0; row < board.length; ++row){
            for (let col = 0; col < board[0].length; ++col){
                ans += board[row][col] + "\t";
            }
            ans += "\n";
        }

        return ans;
    }
};


// helper functions ---------------------------
function randint(min, max){
    /* random number between min and max, inclusive */
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randchoice(arr){
    let idx = randint(0, arr.length - 1);
    return arr[idx];
}

const deepCopy = (items) => items.map(item => Array.isArray(item) ? deepCopy(item) : item);


function deepCopy3d(arr){
    var copy = [];
    for (let row = 0; row < arr.length; ++row){
        var temprow = [];
        for (let col = 0; col < arr[0].length; ++col){
            var tempcol = [];
            for (let thrd = 0; thrd < arr[0][0].length; ++thrd){
                tempcol.push(arr[row][col][thrd]);
            }
            temprow.push(tempcol);
        }
        copy.push(temprow);
    }
    return copy;
}

function deepCompare(arr1, arr2){
    /* determines equality between two arrays */
    if (arr1.length != arr2.length || arr1[0].length != arr2[0].length)
        return false;

    for (let r = 0; r < arr1.length; ++r){
        for (let c = 0; c < arr1[0].length; ++c){
            if (arr1[r][c] != arr2[r][c])
                return false;
        }
    }

    return true;
}

function rotateCounter(arr){
    /* rotate a square array 90 degrees counterclockwise */
    var newarr = deepCopy(arr);

    for (let row = 0; row < arr.length; ++row){
        for (let col = 0; col < arr[0].length; ++col){
            newarr[newarr.length - col - 1][row] = arr[row][col];
        }
    }

    return newarr;
}

function rotateCoordsCounter(coords, length=4){
    return [length - coords[1] - 1, coords[0]];
}

function rotateActionsCounter(actions){
    // actions = [actions, val, deleted, created]

    // rotate the coordinates in actions[0]
    for (let row = 0; row < actions[0].length; ++row){
        for (let col = 0; col < actions[0][0].length; ++col){
            if (actions[0][row][col]){
                let coords = actions[0][row][col][1];
                coords = rotateCoordsCounter(coords);
                actions[0][row][col][1] = coords;
            }
        }
    }

    for (let action = 0; action < actions.length; ++action){
        actions[action] = rotateCounter(actions[action]);
    }
    
    return actions;
}

function rotateClock(arr){
    /* rotate a square array 90 degrees clockwise */
    var newarr = deepCopy(arr);

    for (let row = 0; row < arr.length; ++row){
        for (let col = 0; col < arr[0].length; ++col){
            newarr[col][arr.length - row - 1] = arr[row][col];
        }
    }

    return newarr
}

function rotateCoordsClock(coords, length=4){
    return [coords[1], length - [coords[0]] - 1];
}

function rotateActionsClock(actions){
    // actions = [actions, deleted, created]

    // rotate the coordinates in actions[0]
    for (let row = 0; row < actions[0].length; ++row){
        for (let col = 0; col < actions[0][0].length; ++col){
            if (actions[0][row][col]){
                let coords = actions[0][row][col][1];
                coords = rotateCoordsClock(coords);
                actions[0][row][col][1] = coords;
            }
        }
    }

    for (let action = 0; action < actions.length; ++action){
        actions[action] = rotateClock(actions[action]);
    }
    
    return actions;
}

function selectrand(options, weight) {
    /* select from array with given weights */
    var choices = new Array();
    for (let idx = 0; idx < options.length; ++idx){
        for (let count = 0; count < weight[idx]; ++count){
            choices.push(options[idx]);
        }
    }

    return randchoice(choices);
}


export default BoardClass