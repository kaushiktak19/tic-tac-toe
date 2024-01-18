 const boxes = document.querySelectorAll(".box");
 const gameInfo = document.querySelector(".game-info");
 const newGameBtn = document.querySelector(".btn");

 let currentPlayer;
 let gameGrid;

 const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// create fxn that initializes the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // ui pr bhi empty krna h
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // something more, (remove green too) initialize box with css properties again
        box.classList = `box box${index+1}`;
        });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

initGame();

function swapTurns() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.textContent = `Current Player : ${currentPlayer}`;
}

function checkGameOver() {
    let winner = "";
    // all 3 boxes non-empty and exacty same in value
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            
            winner = gameGrid[position[0]] === "X" ? "X" : "O";

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have awinner
    if (winner !== "") {
        gameInfo.innerText = `Winner is - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }


    // Here is not winner yet Check for tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) { // board filled
        gameInfo.innerHTML = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index] === "" ){
        boxes[index].innerText = currentPlayer; // ui pr upadte
        gameGrid[index] = currentPlayer; // our grid pr update
        boxes[index].style.pointerEvents = "none";
        swapTurns();
        checkGameOver();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
})

newGameBtn.addEventListener("click", initGame);
  

