const createPlayer = function (name, marker) {
    return { name, marker };
};


let playerOneName, playerTwoName, playerOne, playerTwo, currentPlayer, winner;
const PLAYER_ONE_MARKER = "🔥";
const PLAYER_TWO_MARKER = "🧊";


document.querySelector("#new-game-btn").addEventListener("click", () => {
    playerOneName = document.querySelector("#player-one-input").value;
    playerTwoName = document.querySelector("#player-two-input").value;

    playerOne = createPlayer(playerOneName, PLAYER_ONE_MARKER);
    playerTwo = createPlayer(playerTwoName, PLAYER_TWO_MARKER);

    currentPlayer = playerOne;

    winner = null;
    document.querySelector(".gameboard-grid").style.visibility = "visible";
    document.querySelector(".gameboard-grid").style.position = "relative";

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
        if (winner == null) {
            if (gameboard[index] === "") {
                gameboard[index] = marker;
            }
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

            if (gameboard[zeroIndex] == PLAYER_ONE_MARKER && gameboard[firstIndex] == PLAYER_ONE_MARKER && gameboard[secondIndex] == PLAYER_ONE_MARKER) {
                document.querySelector("#result-heading").textContent = `${playerOne.name} is the winner!`;
                winner = playerOne;
                return;
            } else if (gameboard[zeroIndex] == PLAYER_TWO_MARKER && gameboard[firstIndex] == PLAYER_TWO_MARKER && gameboard[secondIndex] == PLAYER_TWO_MARKER) {
                document.querySelector("#result-heading").textContent = `${playerTwo.name} is the winner!`;
                winner = playerTwo;
                return;
            }

            if (winner === null && !gameboard.includes("")) {
                document.querySelector("#result-heading").textContent = `ITS A DRAW!`;
                winner = null;
                return;
            }
        }

        return { gameFlow };
    };


    const resetGameBoard = () => {
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
        if (winner == null) {
            gameboardObject.updateGameBoard(cell.dataset.index);

            if (cell.textContent != PLAYER_ONE_MARKER && cell.textContent != PLAYER_TWO_MARKER) {
                cell.textContent = currentPlayer.marker;
            }
        }

        toggleCurrentPlayer();
    });
});
