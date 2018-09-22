

//***************
//              *
// CONSTRUCTORS *
//              *
//***************/

/**
 * @description Creates a new player with name, board, and boats
 * @param {string} name 
 * @param {array} boats 
 * @param {array} board
 * @param {array} guesses
 */
var Player = function (name, boats, board, guesses) {
    this.name = name || "player";
    this.boats = boats || defaultBoats();
    this.allBoatCoords = [];
    this.board = board || createBoard(10, 10);
    this.guesses = guesses || [];
    this.validGuessCoords = [];
    this.placeBoat = function (boat, index) {
        var board = this.board;
        var row = index.row;
        var col = index.col;
        if (!boat.orientation) {
            for (var i = 0; i < boat.length; i++) {
                if (board[row][col + i] === undefined) {
                    console.log("out of bounds");
                    return false
                } else if (board[row][col + i]) {
                    console.log("something is in the way");
                    return false
                }
            }
            for (var i = 0; i < boat.length; i++) {
                board[row][col + i] = boat.abbr;
                boat.coord[i] = indexToCoord({ row, col: col + i });
                this.allBoatCoords.push(boat.coord[i]);
            }
            return true
        } else if (boat.orientation) {
            for (var i = 0; i < boat.length; i++) {
                if (board[row + i] === undefined) {
                    console.log("out of bounds");
                    return false
                } else if (board[row + i][col]) {
                    console.log("something is in the way");
                    return false
                }
            }
            for (var i = 0; i < boat.length; i++) {
                board[row + i][col] = boat.abbr;
                boat.coord[i] = indexToCoord({ row: row + i, col });
                this.allBoatCoords.push(boat.coord[i]);
            }
            return true
        }
    }
    this.checkGuess = function (index, board) {
        var row = index.row;
        var col = index.col;
        var hit = false;
        var invalid = false;
        var coord = indexToCoord(index);
        if (board[row] === undefined) {
            //checks for out of bounds guess
            hit = false;
            invalid = true;
            this.guesses.push({ hit, invalid, coord });
            return false;
        } else if (board[row][col] === "O" || board[row][col] === "X") {
            //checks for already guessed space
            hit = false;
            invalid = true;
            this.guesses.push({ hit, invalid, coord });
            return false;
        } else if (board[row][col] === null) {
            //checks for miss
            hit = false;
            invalid = false;
            this.guesses.push({ hit, invalid, coord });
            return this.makeGuess(index, board, hit);
        } else if (board[row][col]) {
            //checks for hits
            hit = true;
            invalid = false;
            this.guesses.push({ hit, invalid, coord });
            return this.makeGuess(index, board, hit);
        } else {
            //anything else
            hit = false;
            invalid = true;
            this.guesses.push({ hit, invalid, coord });
            return false;
        }
    }

    this.makeGuess = function (index, board, hit) {
        var row = index.row;
        var col = index.col;
        var coord = indexToCoord(index);
        this.validGuessCoords.push(coord);
        if (hit) {
            board[row][col] = "X";
            return { hit, coord };
        } else {
            board[row][col] = "O";
            return { hit, coord };
        }
    }
}

/**
 * 
 * @param {number} length 
 * @param {string} name 
 * @param {string} abbr 
 * @param {boolean} orientation 
 * @param {string} coord
 */
var Boat = function (length, name, abbr, orientation, coord) {
    this.length = length;
    this.name = name;
    this.abbr = abbr;
    this.orientation = orientation || 0;
    this.coord = coord || Array(length);
    this.isSunk = false;
}

// ********************
// *                  *
// *  GAME FUNCTIONS  *
// *                  *
// ********************

/**
 * 
 * @param {number} rows 
 * @param {number} cols 
 */
var createBoard = function (rows, cols) {
    var board = Array(rows);
    for (var col = 0; col < cols; col++) {
        board[col] = Array(cols).fill(null);
    }
    return board;
}

/**
 * 
 * @param {string} coord 
 */
var coordToIndex = function (coord) {
    if (coord) {
        var rowArr = "abcdefghijklmnopqrstuvwxyz".split("");
        var alpha = coord.charAt(0);
        var num = coord.slice(1) - 1;
        return {
            row: rowArr.indexOf(alpha),
            col: num
        }
    }
}
/**
 * 
 * @param {object} index {row, col} 
 */
var indexToCoord = function (index) {
    var rowArr = "abcdefghijklmnopqrstuvwxyz".split("");
    var alpha = rowArr[index.row];
    var num = parseInt(index.col) + 1;
    return alpha + num;
}



/**
 * random numerical coordinates
 * @returns {object} {row, col}
 */
var rngIndex = function () {
    var row = Math.floor(Math.random() * 10);
    var col = Math.floor(Math.random() * 10);
    return { row, col }
}

var defaultBoats = function () {
    return [
        new Boat(5, "Aircraft Carrier", "A", Math.floor(Math.random() * 2)),
        new Boat(4, "Battleship", "B", Math.floor(Math.random() * 2)),
        new Boat(3, "Submarine", "S", Math.floor(Math.random() * 2)),
        new Boat(3, "Cruiser", "C", Math.floor(Math.random() * 2)),
        new Boat(2, "Destroyer", "D", Math.floor(Math.random() * 2))
    ]
}

//player creation
var player1 = new Player("phil");
var player2 = new Player("cpu");

//placing boats pregame
player1.boats.forEach(function (boat) {
    while (!player1.placeBoat(boat, rngIndex()));
});
player2.boats.forEach(function (boat) {
    while (!player2.placeBoat(boat, rngIndex()));
});
// console.log(player1);
//making guesses
var winner = false;
var playTurn = function (input) {
    if (winner) {
        return
    }
    //console.log(winCondition1, winCondition2);
    var guess = player1.checkGuess(input, player2.board);
    if (!guess) {
        playTurn(rngIndex());
    } else if (guess.hit) {
        var winCondition1 = player2.allBoatCoords.every(elem => { return player1.validGuessCoords.indexOf(elem) > -1 });
        if (winCondition1) {
            winner = player1;
            return
        }
    }
    var cpuGuess = rngGuess();
    if (cpuGuess.hit) {
        var winCondition2 = player1.allBoatCoords.every(elem => { return player2.validGuessCoords.indexOf(elem) > -1 });
        if (winCondition2) {
            winner = player2;
            return
        }
    }
}
var rngGuess = function () {
    var guess = player2.checkGuess(rngIndex(), player1.board);
    if (guess.invalid) {
        guess = rngGuess();
    } else {
        return guess;
    }
}

var i = 0;
while (i < 100) {
    playTurn(rngIndex());
    i++;
}
console.log(player1.board, player2.board, winner.name);