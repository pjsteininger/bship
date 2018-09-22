/**
 * @desc executes the jQuery append function multiple times with a single jQuery object.
 * @param {object} appThis jQuery object with content to append
 * @param {object} appTo jQuery object to which the content is appended
 * @param {number} num number of times the content is appended
 */
function appendMultiple(appThis, appTo, num) {
    for (var i = 0; i < num; i++) {
        appThis.append(appTo.clone());
    }
}
/**
 * @desc creates and returns an array of numbers as strings, starting with "1"
 * @param {number} num length of the array
 */
function numArr(num) {
    var arr = Array(num).fill("");
    arr.forEach((e, i, a) => a[i] += 1 + i);
    return arr
}
/**
 * creates and returns an array of letters as strings, starting with "a"
 * @param {number} num length of the array
 */
function alphArr(num) {
    return "abcdefghijklmnopqrstuvwxyz".slice(0, num).split("");
}
/**
 * @description Generates a game board in the form of a div. Works in conjunction with css file and uses the CSS Grid Layout. Coordines are applied to each play area square as data-coord.
 * @param {number} rows number of rows on the game board play area
 * @param {number} cols number of columnss on the game board play area
 */
function generateBoard(rows, cols) {
    var colArr = numArr(cols);
    var rowArr = alphArr(rows);
    var board = $("<div>").addClass("board");
    var square = $("<div>").addClass("square");
    var colLabelSqure = square.clone().addClass("col-label");
    var rowLabelSquare = square.clone().addClass("row-label");
    var playSquare = square.clone().addClass("play-square");
    board.append(square.clone());
    appendMultiple(board, colLabelSqure, 10);
    for (var i = 0; i < 10; i++) {
        board.append(rowLabelSquare.clone());
        appendMultiple(board, playSquare, 10);
    }
    board.find(".col-label").each(function (index) {
        $(this).append($("<p>").text(colArr[index]));
    });
    board.find(".row-label").each(function (index) {
        $(this).append($("<p>").text(rowArr[index]));
    });
    board.find(".play-square").each(function (index, element) {
        var numCoord = colArr[Math.floor(index / 10)];
        var abcCoord = rowArr[index % 10];
        this.setAttribute("data-coord", abcCoord + numCoord);
        $(this).on("click", function () {
            // $.post("/api/"+this.dataset.coord, function(res) {
            //     console.log(res);
            // });
        });
    });
    return board;
}