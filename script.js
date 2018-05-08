const columns = document.querySelectorAll("section"); //this accesses each column
const boardPositions = document.querySelectorAll("div"); //this is to access each grid position
const infoLine = document.getElementById("info"); //access to text below board
let currentPlayer = "RedPlayer";
let nextPlayer = "BlackPlayer";
let winner = "none";

/* This makes the board. value of 0 is empty. value of 1 is Red. Value of 2 is black */
let board = new Array(7);
for (let boardColumns = 0; boardColumns < 7; boardColumns++ ){
    board[boardColumns] = new Array(6);
    for (let boardRows = 0; boardRows < 6; boardRows++ ){
        board[boardColumns][boardRows] = 0;
    }
}


initialize(); //initializes all event listeners and data attributes

function piecePlace(event){
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
    winHorizontal();
    winVertical();
    winDiagnolRight();
    if(winner === "black"){
        infoLine.textContent = "Black is the winner"
    }else if(winner === "red"){
        infoLine.textContent = "Red is the winner"
    }else{
        infoLine.textContent = currentPlayer + "'s turn"
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
    }else{
        currentPlayer = next;
        nextPlayer = "BlackPlayer"
    }
}

function updateNumOfPiecesPlaced(column){
    columns[column].dataset.numofpiecesplaced = String(Number(columns[column].dataset.numofpiecesplaced) + 1);
}

function winning(){

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
    return winner = "none";
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
    return winner = "none";
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
    return winner = "none";
}

function winDiagnolLeft(){
    //from left to right, top to bottom
    for (let winColumns = 0; winColumns < 4; winColumns++ ){
        for (let winRows = 0; winRows < 3 ; winRows++){

            let pieceZero = board[ winColumns ][ winRows ];
            let pieceOne = board[ winColumns ][ winRows + 1 ];
            let pieceTwo = board[ winColumns ][ winRows + 2 ];
            let pieceThree = board[ winColumns ][ winRows + 3 ];

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
    return winner = "none";
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
}
