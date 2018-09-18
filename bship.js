var rows = 10;
var cols = 10;
var board = [];
for (var x = 1; x <= rows; x++) {
    board[x] = Array(rows);
    for (var y = 1; y <= cols; y++) {
        board[x][y] = " ";
    }
}
board.forEach((e, i) =>  {
    if(i<10) {
        e[0] = " " + i;
    } else {
        e[0] = "" + i;
    }
});
board[0] = ["  ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
//var board = Array(cols).fill(new Array(rows).fill(0));
var Boat = function (length, abbr, orientation) {
    this.length = length;
    this.abbr = abbr;
    if (orientation) {
        this.orientation = orientation;
    } else {
        this.orientation = 0;
    }

}
var aircraftCarrier = new Boat(5, "A");
var battleship = new Boat(4, "B");
var submarine = new Boat(3, "S");
var cruiser = new Boat(3, "C");
var destroyer = new Boat(2, "D");

var placeShip = function (x, y, ship, orientation) {
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
placeShip(5, 5, aircraftCarrier, 1);
console.log(board);

var makeGuess = function (x, y) {
    if (board[x][y] === " ") {
        board[x][y] = ".";
        return false;
    } else {
        board[x][y] = "X";
        return true;
    }
}

makeGuess(5,5);
console.log(board);