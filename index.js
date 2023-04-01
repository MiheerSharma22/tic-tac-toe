let playerInfo = document.querySelector('.playerInfo');
let boxes = document.querySelectorAll('.box');
let newGameButton = document.querySelector('.newGame');

let playerTurn;

// will be used to find whther any winningposition contains all same characters or not
let gameGrid;

// all combinations in which a user can be a winner
let winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let foundWinner;


// find if there's a winner or not or the game is still running
function checkWinner() {
    // checking each winning position's boxes' value
    winningPositions.forEach((positions)=> {
        if( (boxes[positions[0]].innerHTML !== "") && (boxes[positions[0]].innerHTML !== "") && (boxes[positions[0]].innerHTML!== "") &&
                (gameGrid[positions[0]] === gameGrid[positions[1]]) && (gameGrid[positions[0]] === gameGrid[positions[2]]) ) 
        {
            foundWinner = true;

            // change background color of all winning boxes to green
            boxes[positions[0]].classList.add("winnersBoxes");
            boxes[positions[1]].classList.add("winnersBoxes");
            boxes[positions[2]].classList.add("winnersBoxes");

            // make the button of new game visible
            newGameButton.classList.add('active');

            // show in the player turn para who won the game
            playerInfo.innerHTML = `Winner Player - ${playerTurn==='X' ? 'O' : 'X'}`;

            // disable clicking of rest of the boxes after we found the winner
            boxes.forEach((box)=> {
                if(box.innerHTML==="")
                {
                    box.style.cursor = 'default';
                    box.style.pointerEvents = 'none';
                }
            });
        }
    });

    // if found the winner return
    if(foundWinner)
        return;
    
    // if not found the winner , then check if its a tie or not (board is completely filled or not)
    let boardFilled = true;
    gameGrid.forEach((box)=>{
        if(box === "")
            boardFilled = false;
    });

    if(boardFilled){
        playerInfo.innerHTML = "It's a Tie !!";
        // make the button of new game visible
        newGameButton.classList.add('active');
        return;
    }
}


// handles everything when a box in game is clicked
function handleBoxClicks(index) {
    // storing the player's selection in gameGrid
    gameGrid[index] =`${playerTurn}`;

    // changing player turn
    boxes[index].innerHTML = `${playerTurn}`
    if(playerTurn === 'X')
        playerTurn = 'O';
    else
        playerTurn = 'X';

    // updating player turn on the UI
    playerInfo.textContent = `Current Player - ${playerTurn}`;
    
    // if a box is already clicked , a value is there already X/O so it shouldn't be clickable anymore
    boxes[index].style.cursor = 'default';
    boxes[index].style.pointerEvents = 'none';

    // check if there's a winner or not yet
    checkWinner();
}


// to initialise the game
function initialiseGame() {
    foundWinner = false

    newGameButton.classList.remove('active');

    // initally always player X is first to start the game
    playerTurn = 'X';

    // will be used to find whther any winningposition contains all same characters or not
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // setting the inner html for showing whose turn it is initially (X only)
    playerInfo.textContent = `Current Player - ${playerTurn}`;

    // after every game reset the value of every box
    boxes.forEach((box , index)=>{
        box.innerHTML = "";
        box.style.cursor = 'pointer';
        box.style.pointerEvents = 'all';
        box.classList = `box box${index + 1}`;
        // box.classList.remove('winnersBoxes');
    });
}


// adding event listeners on each box to handle what happens when it is clicked
boxes.forEach((box,index)=>{
    box.addEventListener('click' , ()=>{
        handleBoxClicks(index);
    })
})

// adding event listener on new game button
newGameButton.addEventListener('click' , ()=> {
    initialiseGame();
});

initialiseGame();