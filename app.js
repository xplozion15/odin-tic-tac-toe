const createPlayer = function (name, marker) {
    return { name, marker };
};

let playerOneName, playerTwoName, playerOne, playerTwo, currentPlayer, winner;





document.querySelector("#new-game-btn").addEventListener("click", () => {
    playerOneName = document.querySelector("#player-one-input").value;
    playerTwoName = document.querySelector("#player-two-input").value;

    playerOne = createPlayer(playerOneName, marker = "🔥");
    playerTwo = createPlayer(playerTwoName, marker = "🧊");

    currentPlayer = playerOne;
    winner = null;
    gameboardObject.resetGameBoard();

});







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

            if (gameboard[zeroIndex] == "🔥" && gameboard[firstIndex] == "🔥" && gameboard[secondIndex] == "🔥") {
                document.querySelector("#result-heading").textContent = `${playerOne.name} is the winner! `;
                
                winner = playerOne;
                return;
            } else if (gameboard[zeroIndex] == "🧊" && gameboard[firstIndex] == "🧊" && gameboard[secondIndex] == "🧊") {
                document.querySelector("#result-heading").textContent = `${playerTwo.name} is the winner! `;
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



    const resetGameBoard = () => {
        // gameboardObject.updateGameBoard("")
        for (let i = 0; i < 9; i++) {
            gameboard[i] = "";
        }

        document.querySelectorAll(".gameboard-grid-cell").forEach(cell => {
            cell.textContent = "";
        });


        winner = null;
        currentPlayer = playerOne;
        
        document.querySelector("#result-heading").textContent = "GOODLUCK!";

    }



    return { getGameBoard, updateGameBoard, gameFlow, resetGameBoard };
})();




document.querySelectorAll(".gameboard-grid-cell").forEach(cell => {
    cell.addEventListener("click", () => {
        gameboardObject.updateGameBoard(cell.dataset.index);
       
        if (cell.textContent != "🔥" && cell.textContent != "🧊") {
            cell.textContent = currentPlayer.marker;
        }
        toggleCurrentPlayer();
    });
});



