let playerTurn = 1;


const Person = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};
}

const Player = (name, mark) => {
    const {sayName} = Person(name);
    const getMark = () => mark;

    return {sayName, getMark};
}
const Gameboard = (function() {
    let gameArray = [];

    function addMark(position, playerMark) {
        if(!(gameArray[position] === "X" || gameArray[position] === "O")) {
            gameArray[position] = playerMark;
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
//     for(let i = 1; i <= Gameboard.gameArray.length; i++) {
//         let tile = document.querySelector("[data-key= `${i}`]")
//         console.log("current tile to update: " + tile);
//         tile.textContent = Gameboard.gameArray[i];
//     }

    let nodeList = document.querySelectorAll("[data-key]");
    console.log(nodeList);
    nodeList.forEach(element => {
        element.textContent = Gameboard.gameArray[i];
        i = i+1;
    });
}




const player1 = Player("B96","X");
const player2 = Player("Tunicolo","O");

player1.sayName();
console.log(player1.getMark());
player2.sayName();

console.log(Gameboard.gameArray);

document.addEventListener("click", function (event) {
    if(event.target.matches(".tile")) {
        let num = parseInt(event.target.dataset.key);
        console.log(event.target);
        if(playerTurn === 1) {
            console.log(num);
            Gameboard.addMark(num-1,player1.getMark());
            updateDisplay();
            console.log("playerturn 1: " + Gameboard.gameArray);
        }
        else {
            Gameboard.addMark(num-1,player2.getMark());
            updateDisplay();
            console.log("playerturn 2: " + Gameboard.gameArray);
        }
    }
});


