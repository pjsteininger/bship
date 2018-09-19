const inquirer = require("inquirer");
var colArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
var rowArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
/****************
 *              *
 * CONSTRUCTORS *
 *              *
 * *************/
var Player = function (name, board, boats) {
    this.name = name,
        this.board = board.board,
        this.boats = boats
}

var Board = function (rows, cols) {
    this.board = [];
    for (var row = 1; row <= rows; row++) {
        this.board[row] = Array(rows);
        for (var col = 1; col <= cols; col++) {
            this.board[row][col] = "  ";
        }
    }
    this.board.forEach((e, i) => {
        e[0] = " " + rowArr[i - 1];
    });
    this.board[0] = ["  ", " 1", " 2", " 3", " 4", " 5", " 6", " 7", " 8", " 9", "10"];
}

var Boat = function (length, name, abbr, orientation, coords) {
    this.length = length;
    this.name = name;
    this.abbr = abbr;
    if (orientation) {
        this.orientation = orientation;
    } else {
        this.orientation = "0";
    }
    if (coords) {
        this.coords = coords;
    } else {
        this.coords = {
            row: null,
            col: null
        };
    }
    this.isSunk = false;

}

/********************
 *                  *
 *  GAME FUNCTIONS  *
 *                  *
 * *****************/
var checkSpace = function (board, row, col, boat, orientation) {
    if ((orientation !== "1") && (orientation !== "0")) {
        return false;
    }
    if (colArr.indexOf(col) === -1) {
        return false;
    } else {
        col = colArr.indexOf(col) + 1;
    }
    if (rowArr.indexOf(row) === -1) {
        return false;
    } else {
        row = rowArr.indexOf(row) + 1;
    }
    if (orientation === "0") {
        if (col + boat.length > 11) {
            return false;
        }
    } else {
        if (row + boat.length > 11) {
            return false;
        }
    }

    if (board[row][col] === "  ") {
        if (orientation === "1") {
            for (var l = 1; l < boat.length; l++) {
                if (board[row + l][col] === "  ") {
                    continue
                } else {
                    return false;
                }
            }
        } else {
            for (var l = 1; l < boat.length; l++) {
                if (board[row][col + l] === "  ") {
                    continue
                } else {
                    return false;
                }
            }
        }

    } else {
        return false;
    }
    return true;
}

var rollCoords = function () {
    var row = rowArr[Math.floor(Math.random() * 10)];
    var col = colArr[Math.floor(Math.random() * 10)];
    var orientation = Math.floor(Math.random() * 2).toString();
    return { row, col, orientation }
}

var placeBoat = function (board, row, col, boat, orientation) {
    col = colArr.indexOf(col) + 1;
    row = rowArr.indexOf(row) + 1;
    if (orientation === "1") {
        for (var j = row; j < row + boat.length; j++) {
            board[j][col] = boat.abbr;
        }
    } else {
        for (var i = col; i < col + boat.length; i++) {
            board[row][i] = boat.abbr;
        }
    }
}

var cpuBoat = function (cpuBoard, boat, coords) {
    console.log(coords);
    if (checkSpace(cpuBoard, coords.row, coords.col, boat, coords.orientation)) {
        placeBoat(cpuBoard, coords.row, coords.col, boat, coords.orientation);
    } else {
        cpuBoat(cpuBoard, boat, rollCoords());
    }
}

var makeGuess = function (board, x, y) {
    // if (board[x][y] === " ") {
    //     board[x][y] = " .";
    //     return false;
    // } else {
    //     board[x][y] = "X";
    //     return true;
    // }
}

var newGame = function (name) {
    var boats = [
        new Boat(5, "Aircraft Carrier", " A"),
        new Boat(4, "Battleship", " B"),
        new Boat(3, "Submarine", " S"),
        new Boat(3, "Cruiser", " C"),
        new Boat(2, "Destroyer", " D")
    ]
    var player = new Player(name, new Board(10, 10), boats);
    var cpu = new Player("cpu", new Board(10, 10), boats);
    console.log(rollCoords());
    boats.forEach(e => cpuBoat(cpu.board, e, rollCoords()));
    console.log(cpu.board);
    promptBoat(player, boats, 0);


    //TODO: Place cpu boats randomly
    //TODO: inquire where they want to put their ships
    //TODO: while all players or all cpu boats isSunk : false, {playerTurn(); cpuTurn()}
}

var promptBoat = function (player, boats, i) {
    if (i < boats.length) {
        console.log(player.board);
        inquirer.prompt([{
            type: "input",
            name: "row",
            message: "Pick a row a-j for your " + boats[i].name + "?",
        }, {
            type: "input",
            name: "col",
            message: "Pick a column 1-10 for your " + boats[i].name + "?",
        }, {
            type: "input",
            name: "orientation",
            message: "Place the ship horizontally (0) or vertically (1)?"
        }]).then(function (answer) {
            console.log(player.board);
            if (checkSpace(player.board, answer.row, answer.col, boats[i], answer.orientation)) {
                placeBoat(player.board, answer.row, answer.col, boats[i], answer.orientation);
                i++;
                promptBoat(player, boats, i);
            } else {
                console.log("Please input valid values");
                promptBoat(player, boats, i);
            }
        });
    } else {
        console.log(player.board);

    }
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


// placeBoat(philBoard.board, 5, 5, aircraftCarrier, 1);
// console.log(philBoard);



// makeGuess(philBoard.board, 5, 5);
// console.log(philBoard);

//var board = Array(cols).fill(new Array(rows).fill(0));

inquirer.prompt([{
    type: "input",
    name: "response",
    message: "What is your name?"
}]).then(answer => newGame(answer.response));