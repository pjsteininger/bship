const inquirer = require("inquirer");
var col = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
var row = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
/****************
 *              *
 * CONSTRUCTORS *
 *              *
 * *************/
var Player = function (name, board, boats) {
    this.name = name,
        this.board = board,
        this.boats = boats
}

var Board = function (rows, cols) {
    this.board = [];
    for (var x = 1; x <= rows; x++) {
        this.board[x] = Array(rows);
        for (var y = 1; y <= cols; y++) {
            this.board[x][y] = "  ";
        }
    }
    this.board.forEach((e, i) => {
        e[0] = " " + row[i - 1];
    });
    this.board[0] = ["  ", " 1", " 2", " 3", " 4", " 5", " 6", " 7", " 8", " 9", "10"];
}

var Boat = function (length, name, abbr, orientation) {
    this.length = length;
    this.name = name;
    this.abbr = abbr;
    if (orientation) {
        this.orientation = orientation;
    } else {
        this.orientation = 0;
    }
    this.isSunk = false;

}

/********************
 *                  *
 *  GAME FUNCTIONS  *
 *                  *
 * *****************/

var placeShip = function (board, x, y, ship, orientation) {
    if (orientation) {
        for (var j = y; j < y + ship.length; j++) {
            board[x][j] = ship.abbr;
        }
    } else {
        for (var i = x; i < x + ship.length; i++) {
            board[i][y] = ship.abbr;
        }
    }
}

var makeGuess = function (board, x, y) {
    if (board[x][y] === " ") {
        board[x][y] = " .";
        return false;
    } else {
        board[x][y] = "X";
        return true;
    }
}

var newGame = function (name) {
    var boats = {
        aircraftCarrier: new Boat(5, "Aircraft Carrier", "A"),
        battleship: new Boat(4, "Battleship", "B"),
        submarine: new Boat(3, "Submarine", "S"),
        cruiser: new Boat(3, "Cruiser", "C"),
        destroyer: new Boat(2, "Destroyer", "D")
    }
    var player = new Player(name, new Board(10, 10), boats);
    var cpu = new Player("cpu", new Board(10, 10), boats);
    console.log(player.board);
    console.log("player.boats[1]", player.boats[Object.keys(player.boats)[1]]);
    for (boat in player.boats) {
        placeABoat(player, boat);
    }
    //TODO: Place cpu boats randomly
    //TODO: inquire where they want to put their ships
    //TODO: while all players or all cpu boats isSunk : false, {playerTurn(); cpuTurn()}
}

var placeABoat = function (player, boat) {
    //for (boat in player.boats) {
    console.log(player.board);
    inquirer.prompt([{
        type: "input",
        name: "xcoords",
        message: "Pick a row a-j for your " + boat.name + "?",
    }, {
        type: "input",
        name: "ycoords",
        message: "Pick a column 1-10 for your " + boat.name + "?",
    }, {
        type: "input",
        name: "orientation",
        message: "Place the ship horizontally (0) or vertically (1)?"
    }]).then(answer => {
        if ((row.includes(answer.xcoords)) && (col.includes(answer.ycoords)) && ((answer.orientation == 1) || answer.orientation == 0)) {
            //TODO: place the boat on the board
            console.log(answer);
            //placeABoat(player, **nextBoat**)
        } else {
            console.log("Please input valid values");
            placeABoat(player, boat);
        }

    });


    // {


    // },
    // {

    // },
    // {

    // },
    //}
}

var playerTurn = function () {
    //TODO: inquire move
    //TODO: record move on cpu gameboard
    //TODO: show cpu gameboard
    //TODO: send message saying miss or hit and what got hit
    //TODO: end function
}

var cpuTurn = function () {
    //TODO: make random move
    //TODO: record move on player gameboard
    //TODO: show player gameboard
    //TODO: send message saying miss or hit and what got hit
    //TODO: end function
}

var continueGame = function () {

}


// placeShip(philBoard.board, 5, 5, aircraftCarrier, 1);
// console.log(philBoard);



// makeGuess(philBoard.board, 5, 5);
// console.log(philBoard);

//var board = Array(cols).fill(new Array(rows).fill(0));

inquirer.prompt([{
    type: "input",
    name: "response",
    message: "What is your name?"
}]).then(answer => newGame(answer.response));