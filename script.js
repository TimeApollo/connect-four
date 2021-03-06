const columns = document.querySelectorAll("section"); //this accesses each column
const boardPositions = document.querySelectorAll(".piece"); //this is to access each grid position
const infoLine = document.getElementById("info"); //access to text below board
infoLine.textContent = "Red Player's Turn First"
const initialPiece = document.getElementById("topPiece");
const resetButton = document.getElementById("resetButton");
let currentPlayer = "RedPlayer";
let nextPlayer = "BlackPlayer";
let winner = "none";
let mouse = {x:0}
let notGameTie = 0;

/* This makes the board. value of 0 is empty. value of 1 is Red. Value of 2 is black */
let board = new Array(7);
for (let boardColumns = 0; boardColumns < 7; boardColumns++ ){
    board[boardColumns] = new Array(6);
    for (let boardRows = 0; boardRows < 6; boardRows++ ){
        board[boardColumns][boardRows] = 0;
    }
}


initialize(); //initializes all event listeners and data attributes
setInterval(followMouse, 50); //calls the followmouse event every 50 ms. updates the mouse position

function piecePlace(event){
    console.log(board)
    let columnClicked = event.currentTarget;
    let column = columnClicked.dataset.column;
    //pieces placed equal rowtobefilled due to starting board at index 0 for rows and columns
    let rowToBeFilled = Number(columnClicked.dataset.numofpiecesplaced)
    
    //only 6 rows. prevents all functionality working if the column has the max pieces in it.
    if (rowToBeFilled > 5){
        return;
    }
    if( winner === "red" || winner === "black" ){
        return
    }
    if(currentPlayer === "RedPlayer"){
        placeRedPiece(column , rowToBeFilled );
    }else{
        placeBlackPiece(column , rowToBeFilled );
    }
    //updates to the logic after the piece is placed
    updateBoardArray( column , rowToBeFilled , currentPlayer );
    updateCurrentPlayer( currentPlayer , nextPlayer );
    updateNumOfPiecesPlaced(column);
    winning();
    tieGame();
    if(winner === "black"){
        infoLine.textContent = "Black is the winner!!!"
        blackWinner();
    }else if(winner === "red"){
        infoLine.textContent = "Red is the winner!!!"
        redWinner();
    }else if (notGameTie === 0){
        infoLine.textContent = "Game is a Draw!"
        initialPiece.setAttribute( "class" , "" );
    }
    else{
        infoLine.textContent = currentPlayer + "'s turn"
        notGameTie = 0;
    }

}

function placeRedPiece(column , rowToBeFilled){
    for (const position of boardPositions) {
        if(position.dataset.column == column && position.dataset.row == rowToBeFilled){
            position.dataset.positionfilled = 'red';
        }
    }
}

function placeBlackPiece(column , rowToBeFilled){
    for (const position of boardPositions) {
        if(position.dataset.column == column && position.dataset.row == rowToBeFilled){
            position.dataset.positionfilled = 'black';
        }
    }
}

function updateBoardArray( column , rowToBeFilled , currentPlayer){
    if( currentPlayer === "RedPlayer"){
        board[column][rowToBeFilled] = 1;
    }else{
        board[column][rowToBeFilled] = 2;
    }
}

function updateCurrentPlayer( current , next ){
    if( current === "RedPlayer"){
        currentPlayer = next;
        nextPlayer = "RedPlayer"
        initialPiece.setAttribute( "class" , "black" );
    }else{
        currentPlayer = next;
        nextPlayer = "BlackPlayer"
        initialPiece.setAttribute( "class" , "red" )
    }
}

function updateNumOfPiecesPlaced(column){
    columns[column].dataset.numofpiecesplaced = String(Number(columns[column].dataset.numofpiecesplaced) + 1);
}

function winning(){
    winHorizontal();
    winVertical();
    winDiagnolRight();
    winDiagnolLeft();
}

function tieGame(){
    board.forEach(column => {
        column.forEach((row , index , column) => {
            if (column[index]===0){
                notGameTie += 1;
            }
        })
    })
}

function winHorizontal(){
    //checking to see if four pieces horizontally are all the same for a winner
    for (let winColumns = 0; winColumns < 4; winColumns++ ){
        for (let winRows = 0; winRows < 6 ; winRows++){

            let pieceZero = board[ winColumns ][ winRows ];
            let pieceOne = board[ winColumns + 1][ winRows ];
            let pieceTwo = board[ winColumns + 2][ winRows ];
            let pieceThree = board[ winColumns + 3][ winRows ];

            if( pieceZero === 2 ){
                if( pieceZero === pieceOne && pieceZero === pieceTwo && pieceZero === pieceThree){
                        return winner = "black";
                    }
            }else if( pieceZero === 1 ){
                if( pieceZero === pieceOne && pieceZero === pieceTwo && pieceZero === pieceThree){
                        return winner = "red";
                    }
            }else{
                continue
            }
            
        }
    }
}

function winVertical(){
    for (let winColumns = 0; winColumns < 7; winColumns++ ){
        for (let winRows = 0; winRows < 3 ; winRows++){

            let pieceZero = board[ winColumns ][ winRows ];
            let pieceOne = board[ winColumns ][ winRows + 1 ];
            let pieceTwo = board[ winColumns ][ winRows + 2 ];
            let pieceThree = board[ winColumns ][ winRows +3 ];

            if( pieceZero === 2 ){
                if( pieceZero === pieceOne && pieceZero === pieceTwo && pieceZero === pieceThree){
                        return winner = "black";
                    }
            }else if( pieceZero === 1 ){
                if( pieceZero === pieceOne && pieceZero === pieceTwo && pieceZero === pieceThree){
                        return winner = "red";
                    }
            }else{
                continue
            }
            
        }
    }
}

function winDiagnolRight(){
    //from left to right, bottom to top
    for (let winColumns = 0; winColumns < 4; winColumns++ ){
        for (let winRows = 0; winRows < 3 ; winRows++){

            let pieceZero = board[ winColumns ][ winRows ];
            let pieceOne = board[ winColumns + 1 ][ winRows + 1 ];
            let pieceTwo = board[ winColumns + 2 ][ winRows + 2 ];
            let pieceThree = board[ winColumns + 3 ][ winRows +3 ];

            if( pieceZero === 2 ){
                if( pieceZero === pieceOne && pieceZero === pieceTwo && pieceZero === pieceThree){
                        return winner = "black";
                    }
            }else if( pieceZero === 1 ){
                if( pieceZero === pieceOne && pieceZero === pieceTwo && pieceZero === pieceThree){
                        return winner = "red";
                    }
            }else{
                continue
            }
            
        }
    }
}

function winDiagnolLeft(){
    //from left to right, top to bottom
    for (let winColumns = 0; winColumns < 4; winColumns++ ){
        for (let winRows = 3; winRows < 6 ; winRows++){

            let pieceZero = board[ winColumns ][ winRows ];
            let pieceOne = board[ winColumns + 1 ][ winRows - 1 ];
            let pieceTwo = board[ winColumns + 2 ][ winRows - 2 ];
            let pieceThree = board[ winColumns + 3 ][ winRows - 3 ];

            if( pieceZero === 2 ){
                if( pieceZero === pieceOne && pieceZero === pieceTwo && pieceZero === pieceThree){
                        return winner = "black";
                    }
            }else if( pieceZero === 1 ){
                if( pieceZero === pieceOne && pieceZero === pieceTwo && pieceZero === pieceThree){
                        return winner = "red";
                    }
            }else{
                continue
            }
            
        }
    }
}

function initialize(){
    for (let numOfColumns = 0; numOfColumns < columns.length; numOfColumns++) {
        columns[numOfColumns].addEventListener('click', piecePlace);
        columns[numOfColumns].setAttribute("data-numofpiecesplaced","0");
    }
    
    for (let numOfBoardPositions = 0; numOfBoardPositions < boardPositions.length; numOfBoardPositions++){
        boardPositions[numOfBoardPositions].setAttribute("data-positionfilled" , "empty");
        boardPositions[numOfBoardPositions].setAttribute("data-row","" + 5 - numOfBoardPositions%6 + "");
        boardPositions[numOfBoardPositions].setAttribute("data-column" , "" + Math.floor(numOfBoardPositions/6) + "");
    }

    document.addEventListener("mousemove", getMouse);
    resetButton.addEventListener("click" , resetBoard);
}

function getMouse(event){
    mouse.x = event.pageX
}

function followMouse(){
    let minDist = 60;
    let maxDist = 660;
    let distX = minDist;
    if(mouse.x < maxDist && mouse.x > minDist){
        distX = mouse.x - minDist;
    }else if (mouse.x >= maxDist){
        distX = maxDist - minDist;
    }else{
        distX = 0;
    }
    initialPiece.style.transform =  "translate(" + distX + "px)";
}

function resetBoard(){
    columns.forEach((column, index, columns )=> columns[index].dataset.numofpiecesplaced = 0);
    console.log(columns)
    initialPiece.setAttribute( "class" , "red" );
    board.forEach(column => {
        column.forEach((row , index , column) =>  column[index]=0)
    });
    boardPositions.forEach((piece, index) => boardPositions[index].dataset.positionfilled = "empty");
    infoLine.textContent = "Red Player's Turn First";
    winner = "none";
    initialPiece.setAttribute( "class" , "red" );
    currentPlayer = "RedPlayer";
    nextPlayer = "BlackPlayer";
    notGameTie = 0;
}

function redWinner(){
    boardPositions.forEach((piece, index) => boardPositions[index].dataset.positionfilled = "red");
    initialPiece.setAttribute( "class" , "" );
    setTimeout(redWinnerAnimation, 125);
}

function blackWinner(){
    boardPositions.forEach((piece, index) => boardPositions[index].dataset.positionfilled = "black");
    initialPiece.setAttribute( "class" , "" );
    setTimeout(blackWinnerAnimation, 125);
}

function redWinnerAnimation(){
    boardPositions.forEach((piece, index) => boardPositions[index].dataset.positionfilled = "redToWhiteAnimation");
}

function blackWinnerAnimation(){
    boardPositions.forEach((piece, index) => boardPositions[index].dataset.positionfilled = "blackToWhiteAnimation");
}
