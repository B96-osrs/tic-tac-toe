let playerTurn = 1;
let headerBox = document.querySelector(".header");
let gameOngoing = false;
let marksPlaced = 0;
let popupWindow = document.querySelector(".popup");
let container = document.querySelector(".container");
let restartButton = document.getElementById("restart-button");
let winMessage = document.querySelector(".win-message");
let startButton = document.getElementById("start-button");
let startContainer = document.querySelector(".start-container");


const Person = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};
}

const Player = (name, mark) => {
    const {sayName} = Person(name);
    const getMark = () => mark;
    const getName = () => name;

    return {sayName, getMark, getName};
}
const Gameboard = (function() {
    let gameArray = [];

    function addMark(position, playerMark) {
        if(!(gameArray[position] === "X" || gameArray[position] === "O")) {
            gameArray[position] = playerMark;
            marksPlaced++;
            if(playerTurn === 1) {
                playerTurn = 2;
            }
            else {
                playerTurn = 1;
            }
        }

    }

    console.log("Gameboard accessed");
    return {gameArray, addMark};
})();

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
    console.log("star game button was clicked");
}


function resetGame() {
    marksPlaced = 0;
    Gameboard.gameArray.length = 0;
    updateDisplay();
    console.log(Gameboard.gameArray);
}

function checkForWin(mark) {
    console.log("marks placed: " + marksPlaced);
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
       showPopup();
       return "win";
    }
    else if(marksPlaced === 9) {
        showPopup();
        return "tie";
    }
    else {
            return false;
    }
}


const player1 = Player("B96","X");
const player2 = Player("Tunicolo","O");

player1.sayName();
console.log(player1.getMark());
player2.sayName();

console.log(Gameboard.gameArray);

document.addEventListener("click", function (event) {
    if(gameOngoing === true) {
        if(event.target.matches(".tile")) {
            let num = parseInt(event.target.dataset.key);
            console.log(event.target);
            if(playerTurn === 1) {
                console.log(num);
                Gameboard.addMark(num-1,player1.getMark());
                updateDisplay();
                console.log("playerturn 1: " + Gameboard.gameArray);
                if(checkForWin(player1.getMark()) === "win") {
                    winMessage.textContent = "Winner: " + player1.getName();
                }
                if(checkForWin(player1.getMark()) === "tie") {
                    winMessage.textContent = "Tie";
                }
            }
            else {
                Gameboard.addMark(num-1,player2.getMark());
                updateDisplay();
                console.log("playerturn 2: " + Gameboard.gameArray);
                if(checkForWin(player2.getMark()) === "win") {
                    winMessage.textContent = "Winner: " + player2.getName();
                }
                if(checkForWin(player2.getMark()) === "tie") {
                    winMessage.textContent = "Tie";
                }
            }
        }
    }
});
restartButton.addEventListener("click", function (event) {
    resetGame();
    hidePopup();
    gameOngoing = true;
});

startButton.addEventListener("click",function(event) {
    showGame();
});




