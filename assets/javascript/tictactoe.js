(function () {
    let player1 = document.querySelector('#player1').value
    let player2 = document.querySelector('#player2').value

    let currentPlayer = player1;
    let currentPlayerHTML = document.querySelector('#currentPlayer')
    let player1Selections = [];
    let player2Selections = [];

    let player1Wins = document.querySelector('#player1Wins')
    let player1WinCount = parseInt(player1Wins.innerHTML)
    let player2Wins = document.querySelector('#player2Wins')
    let player2WinCount = parseInt(player2Wins.innerHTML)

    let draws = document.querySelector('#draws')
    let drawCount = parseInt(draws.innerHTML)

    const winningCombinations = [
        //horizontal
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],

        //vertical
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],

        //diagonal
        [1, 5, 9],
        [3, 5, 7]
    ];

    // get all td elements from the DOM and store in cellElementArray
    const cellElementArray = document.querySelectorAll('td');
    // write for loop to iterate over cellElementArray
    for (let i = 0; i < cellElementArray.length; i++) {
        // set cellElementArray[i] to currentCell variable
        let currentCell = cellElementArray[i]
        // add an event listener to the currentCell
        currentCell.addEventListener('click', function (event) {
            const clickedCellElement = event.target;

            //make sure the cell is empty
            if (clickedCellElement.innerHTML === '') {
                //if it's player X's turn
                if (currentPlayer === player1) {
                    //add the cell id to playerXSelections array
                    player1Selections.push( parseInt(clickedCellElement.id) )

                    checkForWin(player1Selections, player1);
                }
                //otherwise (if it's player O's turn)
                else {
                    //add the cell id to playerOSelections array
                    player2Selections.push( parseInt(clickedCellElement.id) )

                    checkForWin(player2Selections, player2);
                }
                
                //print X/O to page
                clickedCellElement.innerHTML = currentPlayer;
                checkDraw();

                switchPlayers();
            }
        });


    }

    function checkForWin(playerSelections, currentPlayer) {
        for (let i = 0; i < winningCombinations.length; i++) {
            let matches = 0;
            for (let j = 0; j < playerSelections.length; j++) {

                if (winningCombinations[i].includes(playerSelections[j])) {
                    matches++;
                }

                if (matches === 3) {

                    playerWinIncrease();
                    setTimeout(function() {
                        alert(currentPlayer + " wins");
                        resetBoard();
                    }, 1) ;
                    return true;
                }
            }
        }

        
        return false;
    }

    function playerWinIncrease () {
        if (currentPlayer == player1) {
            player1WinCount++;
            player1Wins.innerHTML = player1WinCount;
        }
        else {
            player2WinCount++;
            player2Wins.innerHTML = player2WinCount;
        }
    }

    function checkDraw () {
        let count = 0;
        for (let i = 0; i < cellElementArray.length; i++) {
            if (cellElementArray[i].innerHTML != '') {
                count++;
                console.log(count);
            }
            if (count === 9) {
                drawCount++;
                draws.innerHTML = drawCount;

                setTimeout(function() {
                    alert("Draw!");
                    resetBoard();
                }, 1) ;
                return true;
            }
        }
    }

    function switchPlayers() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
            currentPlayerHTML.innerHTML = "Player 2"
        }
        else if (currentPlayer === player2) {
            currentPlayer = player1;
            currentPlayerHTML.innerHTML = "Player 1"
        }
    }

    let buttonElements = document.querySelector('button')
    buttonElements.addEventListener('click', changeCharacter)

    function changeCharacter () {
        if (currentPlayer === player1) {
            player1 = document.querySelector('#player1').value
            player2 = document.querySelector('#player2').value
            currentPlayer = player1;
        }
        else if (currentPlayer === player2) {
            player1 = document.querySelector('#player1').value
            player2 = document.querySelector('#player2').value
            currentPlayer = player2;
        }
    }

    function resetBoard () {
        player1Selections = [];
        player2Selections = [];
        for (let i = 0; i < cellElementArray.length; i++) {
            cellElementArray[i].innerHTML = '';
        }
        currentPlayer = player1;
    }
})()