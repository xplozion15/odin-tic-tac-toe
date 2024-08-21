const gameboardObject = (function () {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    const getGameBoard = () => gameboard;



    const updateGameBoard = (index, marker) => {

        if (gameboard[index] === "") {
            gameboard[index] = marker;
        }
        return {updateGameBoard};
    }

    return { getGameBoard,updateGameBoard };
})();






const createPlayer = function(name, marker) {
    return { name, marker };
};



const gameFlow = {
    
   
};
