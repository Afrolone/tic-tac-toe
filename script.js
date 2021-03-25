const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

MATRIX = [-1, -1, -1,-1, -1, -1,-1, -1, -1]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const resetButton = document.getElementById('resetDiv')
const winningMessageElement = document.getElementById('winnerMessage')
let circleTurn

startGame()

function startGame() {
    winningMessageElement.innerText = "Tic-Tac"
    resetButton.addEventListener('click', function() {
        startGame()
    })
    resetElements()
    circleTurn = false
    var i = 0
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
        cell.param = i
        i = i + 1
    })
}

function handleClick(e) {
    circleTurn = !circleTurn
    cell = e.target
    index = cell.param
    currentInheritValue = circleTurn ? cell.children[0] : cell.children[1]

    if (circleTurn) {
        cell.children[0].style.display = 'inherit'
        MATRIX[index] = 0
    } else {
        cell.children[1].style.display = 'inherit'
        MATRIX[index] = 1
    }
    checkGame()
}

function checkGame() {
    if(checkWin()){
        endGame()
    } else {
        if(checkIfFull()){
            endGame(true)
        }
    }
}

function checkWin() {
    isWin = false
    WINNING_COMBINATIONS.forEach(combo => {
        if ((MATRIX[combo[0]] !== -1) &&
            (MATRIX[combo[1]] !== -1) &&
            (MATRIX[combo[2]] !== -1) &&
            (MATRIX[combo[0]] === MATRIX[combo[1]]) &&
            (MATRIX[combo[0]] === MATRIX[combo[2]])
        ) {
            isWin = true
        }
    })
    return isWin
}

function checkIfFull() {
    isFull = true
    MATRIX.forEach(n => {
        if (n === -1) {
            isFull = false
        }
    })
    return isFull
}

function resetElements() {
    MATRIX = [-1, -1, -1,-1, -1, -1,-1, -1, -1]
    cellElements.forEach(cell => {
        cell.children[0].style.display = 'none'
        cell.children[1].style.display = 'none'
    })
}

function endGame(isdraw) {
    if(isdraw) {
        winningMessageElement.innerText = "DRAAAW!!!"
    } else {
        if(circleTurn){
            winningMessageElement.innerText = "THE WINNER IS O !!!!!"
        } else {
            winningMessageElement.innerText = "THE WINNER IS X !!!!!"
        }
    }
    
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    })
}
