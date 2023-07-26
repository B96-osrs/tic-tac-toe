let startContainer = document.querySelector(".start-container");
let headerBox = document.querySelector(".header");
let container = document.querySelector(".container");
let popupWindow = document.querySelector(".popup");
let restartButton = document.getElementById("restart-button");
let winMessage = document.querySelector(".win-message");
let startButton = document.getElementById("start-button");
let playerTurn = 1;
let marksPlaced = 0;
let gameOngoing = false;

const Person = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};
}

const Player = (name, mark) => {
    const {sayName} = Person(name);
    const getMark = () => mark;
    const getName = () => name;

    return {sayName, getMark, getName, name};
}
const Gameboard = (function() {
    let gameArray = [];

    function addMark(position, playerMark) {
        if(!(gameArray[position] === "X" || gameArray[position] === "O")) {
            gameArray[position] = playerMark;
            marksPlaced++;
            console.log("mark placed is: " + playerMark);
            if(playerTurn === 1) {
                playerTurn = 2;
            }
            else {
                playerTurn = 1;
            }
        }
        console.log("current playerturn: " + playerTurn);

    }

    function checkForWin(mark) {
        if((Gameboard.gameArray[0] === mark &&
           Gameboard.gameArray[1] === mark &&       
           Gameboard.gameArray[2]=== mark) ||
           (Gameboard.gameArray[3] === mark &&
           Gameboard.gameArray[4] === mark &&          //check rows for win
           Gameboard.gameArray[5]=== mark) ||
           (Gameboard.gameArray[6] === mark &&          
           Gameboard.gameArray[7] === mark &&
           Gameboard.gameArray[8]=== mark) ||
           
           (Gameboard.gameArray[0] === mark &&
           Gameboard.gameArray[3] === mark &&       
           Gameboard.gameArray[6]=== mark) ||
           (Gameboard.gameArray[1] === mark &&
           Gameboard.gameArray[4] === mark &&          //check columns for win
           Gameboard.gameArray[7]=== mark) ||
           (Gameboard.gameArray[2] === mark &&          
           Gameboard.gameArray[5] === mark &&
           Gameboard.gameArray[8]=== mark) ||
    
           (Gameboard.gameArray[0] === mark &&
           Gameboard.gameArray[4] === mark &&       
           Gameboard.gameArray[8]=== mark) ||           //check for diagonals
           (Gameboard.gameArray[2] === mark &&
           Gameboard.gameArray[4] === mark &&       
           Gameboard.gameArray[6]=== mark)) {
           gameOngoing = false;
           displayController.showPopup();
           return "win";
        }
        else if(marksPlaced === 9) {
            displayController.showPopup();
            return "tie";
        }
        else {
                return false;
        }
    }

    console.log("Gameboard accessed");
    return {gameArray,addMark, checkForWin};
})();

const displayController = (function() {

    function updateDisplay() {
        console.log("updating display");
        let i = 0;
        let nodeList = document.querySelectorAll("[data-key]");
        nodeList.forEach(element => {
            element.textContent = Gameboard.gameArray[i];
            i = i+1;
        });
    }

    function showPopup() {
        popupWindow.style.visibility = "visible";
        container.style.webkitFilter = "blur(3px) brightness(0.40)";
    }

    function hidePopup() {
        popupWindow.style.visibility = "hidden";
        container.style.webkitFilter = "";
    }

    function showGame() {
        container.style.visibility = "visible";
        startContainer.style.visibility = "hidden";
        gameOngoing = true;
    }

    function resetGame() {
        marksPlaced = 0;
        Gameboard.gameArray.length = 0;
        displayController.updateDisplay();
        console.log("game was reset");
        console.log("marks placed: " + marksPlaced);
        console.log("current player turn: " + playerTurn);
    }

    return {updateDisplay,showPopup,hidePopup,showGame,resetGame};

})();

let player1 = Player("player1","X");
let player2 = Player("player2","O");

document.addEventListener("click", function (event) {
    if(gameOngoing === true) {
        if(event.target.matches(".tile")) {
            let num = parseInt(event.target.dataset.key);
            console.log(event.target);
            console.log("current player turn is: " + playerTurn);
            if(playerTurn === 1) {
                Gameboard.addMark(num-1,player1.getMark());
                displayController.updateDisplay();
                if(Gameboard.checkForWin(player1.getMark()) === "win") {
                    winMessage.textContent = "Winner: " + player1.getName();
                }
                if(Gameboard.checkForWin(player1.getMark()) === "tie") {
                    winMessage.textContent = "Tie";
                }
            }
            else {
                console.log("code that never runs");
                Gameboard.addMark(num-1,player2.getMark());
                displayController.updateDisplay();
                if(Gameboard.checkForWin(player2.getMark()) === "win") {
                    winMessage.textContent = "Winner: " + player2.getName();
                }
                if(Gameboard.checkForWin(player2.getMark()) === "tie") {
                    winMessage.textContent = "Tie";
                }
            }
        }
    }
});
restartButton.addEventListener("click", function (event) {
    displayController.resetGame();
    displayController.hidePopup();
    gameOngoing = true;
});

startButton.addEventListener("click",function(event) {
    let inputOne = document.getElementById("player1");
    let inputTwo = document.getElementById("player2");
    if(!(inputOne.value === "" || inputTwo.value ==="")) {
        player1 = Player(inputOne.value,"X");
        player2 = Player(inputTwo.value,"O");
        console.log(player1.getName());
        console.log(player2.getName());
        displayController.showGame();
    }
});




