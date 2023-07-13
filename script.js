const Gameboard = (function() {
    let gameArray = [];
    let currentMark = "X";

    function addMark(position) {
        gameArray[position] = currentMark;
        if(currentMark === "X") {
            currentMark = "O";
        }
        else {
            currentMark = "X";
        }
    }
    console.log("Gameboard accessed");
    return gameArray;
})();



let array1 = Gameboard.addMark(5);
console.log(array1);
