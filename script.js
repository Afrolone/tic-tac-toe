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
//const winningMessageElement = document.getElementById('winningMessage')
//const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
//const restartButton = document.getElementById('restartButton')
let circleTurn

startGame()

function startGame() {
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
    console.log(index)
    currentInheritValue = circleTurn ? cell.children[0] : cell.children[1]

    if (circleTurn) {
        cell.children[0].style.display = 'inherit'
        MATRIX[index] = 0
    } else {
        cell.children[1].style.display = 'inherit'
        MATRIX[index] = 1
    }
    checkGame()
    console.log("WIN: " + checkWin())
    console.log("FULL: " + checkIfFull())
}

function checkGame() {
    if (checkIfFull()) {
        startGame()
    } else {
        if (checkWin()) {
            startGame()
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
    console.log(MATRIX)
}
