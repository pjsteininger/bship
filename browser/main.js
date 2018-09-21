$(document).ready(function () {
    var numRows = 10;
    var numCols = 10;
    var rowSize = 48;
    var colSize = 48;

    var colArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    var rowArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    var board1 = $("<div>").css({
        position: "absolute",
        left: "100px",
        top: "100px "
    });
    var board = $("<div>").css({
        position: "absolute",
        left: "100px",
        top: "100px"
    })
    var colLabels = $("<div>").css({
        position: "relative",
        height: "50px",
        width: "500px"
    });
    var rowLabels = $("<div>").css({
        position: "relative",
        height: "500px",
        width: "50px"
    });
    var playArea = $("<div>").css({
        position: "relative",
        height: "500px",
        width: "500px"
    });
    var playRow = $("<div>").css({
        position: "relative",
        height: "50px",
        width: "500px"
    });
    var square = $("<div>").attr("class", "square");
    square.css({
        height: "48px",
        width: "48px",
        background: "gray",
        position: "relative",
        border: "1px solid black",
        display: "inline-block"
    });
    var labelSquare = $("<div>").attr("class", "label-square");
    labelSquare.css({
        height: "48px",
        width: "48px",
        background: "lightgray",
        position: "relative",
        border: "1px solid black",
        float: "left",
        margin: "0"
    });
    for (var i = 0; i < 10; i++) {
        playRow.append(square.clone());
    }
    for (var i = 0; i < 10; i++) {
        playArea.append(playRow.clone());
    }
    for (var i = 0; i < 10; i++) {
        rowLabels.append(labelSquare.clone());
    }
    for (var i = 0; i < 10; i++) {
        colLabels.append(labelSquare.clone());
    }
    board.append(rowLabels, colLabels);
    board.append(playArea.clone());
    $("body").append(board.clone());





    // var rowLabels = $("<div>").css({
    //     position: "relative"
    // });
    // board1.append(rowLabels);
    // for (var i = 0; i < 10; i++) {
    //     var labelText = $("<p>").text(rowArr[i]);
    //     var labelDiv = $("<div>");
    //     labelDiv.append(labelText);
    //     labelDiv.css({
    //         height: rowSize + "px",
    //         width: colSize + "px",
    //         background: "lightgray",
    //         border: "1px solid black",
    //         "text-align": "center",
    //         position: "relative",
    //     })
    //     rowLabels.append(labelDiv);
    // }

    
    // var colLabels = $("<div>").css({
    //     position: "relative"
    // });
    // for (var i = 0; i < 10; i++) {
    //     var label = $("<div>");
    //     var labelText = $("<p>").text(colArr[i]);
    //     label.append(labelText);
    //     label.css({
    //         height: rowSize + "px",
    //         width: colSize + "px",
    //         background: "lightgray",
    //         position: "relative",
    //         border: "1px solid black",
    //         left: "50px",
    //         "text-align": "center",
    //         display: "inline-block"
    //     })
    //     colLabels.append(label);
    // }
    // board1.prepend(colLabels);

    // $("body").append(board1);
    // for (var i = 1; i <= numRows; i++) {
    //     for (var j = 1; j <= numCols; j++) {
    //         var square = $("<div>").attr("class", "square");
    //         square.css({
    //             height: rowSize + "px",
    //             width: colSize + "px",
    //             background: "gray",
    //             position: "absolute",
    //             border: "1px solid black",
    //             left: (100 + 50 * i) + "px",
    //             top: (50 + 50 * j) + "px",
    //             cursor: "pointer"
    //         });
    //         square.attr("data-coords", rowArr[j - 1] + colArr[i - 1]);
    //         $("body").append(square);
    //     }
    // }
    // for (var i = 1; i <= numRows; i++) {
    //     for (var j = 1; j <= numCols; j++) {
    //         var square = $("<div>");
    //         square.css({
    //             height: rowSize + "px",
    //             width: colSize + "px",
    //             background: "gray",
    //             position: "absolute",
    //             border: "1px solid black",
    //             left: (700 + 50 * i) + "px",
    //             top: (50 + 50 * j) + "px",
    //             cursor: "pointer"
    //         });
    //         $("body").append(square);
    //     }
    // }
    $(".square").mouseenter(function () {
        $(this).css("background", "red");
    });
    $(".square").mouseleave(function () {
        $(this).css("background", "gray");
    });
    $(".square").on("click", function () {
        console.log(this.dataset.coords);
    });


});