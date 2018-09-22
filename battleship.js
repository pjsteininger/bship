

//***************
//              *
// CONSTRUCTORS *
//              *
//***************/

/**
 * @description Creates a new player with name, board, and boats
 * @param {string} name 
 * @param {object} board 
 * @param {array} boats 
 */
var Player = function (name, board, boats) {
    this.name = name || "player";
    this.board = board || createBoard(10, 10);
    this.boats = boats;
}

/**
 * 
 * @param {number} length 
 * @param {string} name 
 * @param {string} abbr 
 * @param {boolean} orientation 
 * @param {string} coords 
 */
var Boat = function (length, name, abbr, orientation, coord) {
    this.length = length;
    this.name = name;
    this.abbr = abbr;
    this.orientation = orientation || "0";
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
 * @param {number} row 
 * @param {number} col 
 */
var indexToCoord = function (row, col) {
    var rowArr = "abcdefghijklmnopqrstuvwxyz".split("");
    var alpha = rowArr[row - 1];
    var num = parseInt(col) + 1;
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

var placeBoat = function (board, boat, index) {
    var row = index.row;
    var col = index.col;
    if (boat.orientation === "0") {
        for (var i = 0; i < boat.length; i++) {
            if (board[row][col + i]) {
                console.log("something is in the way");
                return
            } else if (board[row][col + i] === undefined) {
                console.log("out of bounds");
                return
            }
        }
        for (var i = 0; i < boat.length; i++) {
            board[row][col + i] = boat.abbr;
        }
    } else if (boat.orientation === "1") {
        for (var i = 0; i < boat.length; i++) {
            if (board[row + i] === undefined) {
                console.log("out of bounds");
                return
            } else if (board[row + i][col]) {
                console.log("something is in the way");
                return
            }
        }
        for (var i = 0; i < boat.length; i++) {
            board[row + i][col] = boat.abbr;
        }
    }
}

var makeGuess = function (board, index) {
    var row = index.row;
    var col = index.col;
    var hit = false;
    var invalid = false;
    var coord = indexToCoord(index.row, index.col);
    if (board[row] === undefined) {
        console.log("out of bounds");
        hit = false;
        invalid = true;
        return {hit, invalid, coord};
    } else if (board[row][col] === null) {
        console.log("miss");
        board[row][col] = "miss";
        hit = false;
        invalid = false;
        return {hit, invalid, coord};
    } else if (board[row][col] === "miss") {
        console.log("already guessed");
        hit = false;
        invalid = false;
        return {hit, invalid, coord};
    } else if (board[row][col]) {
        console.log("that's a hit");
        hit = true;
        invalid = false;
        board[row][col] = "X";
        return {hit, invalid, coord};
    } else {
        console.log("invalid guess");
        hit = false;
        invalid = true;
        return {hit, invalid, coord};
    }
}

var board = createBoard(10, 10);
var boat = new Boat(5, "carrier", "C", "1");
placeBoat(board, boat, coordToIndex("a3"));
console.log(board);
makeGuess(board, coordToIndex("a6"));
makeGuess(board, coordToIndex("a11"));
makeGuess(board, coordToIndex("a3"));
console.log(board);