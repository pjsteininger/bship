var config = {
    apiKey: "AIzaSyCcrKJgxnJp0SkukTc1HhI-dkxMfX3jT2s",
    authDomain: "battleship-167f9.firebaseapp.com",
    databaseURL: "https://battleship-167f9.firebaseio.com",
    projectId: "battleship-167f9",
    storageBucket: "battleship-167f9.appspot.com",
    messagingSenderId: "167042498206"
};
firebase.initializeApp(config);
var database = firebase.database();

var sendGuess = function(coord) {
    database.ref("player-guess").push({
        coord: coord,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}
