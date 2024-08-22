const createPlayer = function (name, marker) {
    return { name, marker };
};

const playerOneName = prompt("What is the name of P1?");
const playerTwoName = prompt("What is the name of P2?");

const playerOne = createPlayer(playerOneName, marker = "X");
const playerTwo = createPlayer(playerTwoName, marker = "O");
let currentPlayer = playerOne;
let winner = null;

function toggleCurrentPlayer() {
    if (currentPlayer == playerOne) {
        currentPlayer = playerTwo;
    } else if (currentPlayer == playerTwo) {
        currentPlayer = playerOne;
    }
}

const gameboardObject = (function () {
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    


    const getGameBoard = () => gameboard;

    const updateGameBoard = (index, marker = currentPlayer.marker) => {
        if (gameboard[index] === "") {
            gameboard[index] = marker;
           
        }

        
        gameFlow();
       
        
    };





    const gameFlow = () => {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (let condition of winningConditions) {
            const zeroIndex = condition[0];
            const firstIndex = condition[1];
            const secondIndex = condition[2];

            if (gameboard[zeroIndex] == "X" && gameboard[firstIndex] == "X" && gameboard[secondIndex] == "X") {
                alert(`${playerOne.name} is the winner!`);
                winner = playerOne;
                return;
            } else if (gameboard[zeroIndex] == "O" && gameboard[firstIndex] == "O" && gameboard[secondIndex] == "O") {
                alert(`${playerTwo.name} is the winner!`);
                winner = playerTwo;
                return;
            }

            if (winner === null && !gameboard.includes("")) {
                alert("Its a draw");
                winner = null;
                return;
            }
        }

        return { gameFlow };
    };

    return { getGameBoard, updateGameBoard, gameFlow};
})();




document.querySelectorAll(".gameboard-grid-cell").forEach(cell => {
    cell.addEventListener("click", ()=> {      
        gameboardObject.updateGameBoard(cell.dataset.index);
        if(cell.textContent != "X" && cell.textContent != "O") {
            cell.textContent = currentPlayer.marker;
        }
       
        toggleCurrentPlayer();
    });  
});



