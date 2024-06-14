const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
const playerXNameElement = document.getElementById('playerXName');
const playerXScoreElement = document.getElementById('playerXScore');
const playerONameElement = document.getElementById('playerOName');
const playerOScoreElement = document.getElementById('playerOScore');

let xTurn = true;
let xScore = 0;
let oScore = 0;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  xTurn = true;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.textContent = ''; // Clear text content
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  status.innerText = `${playerXNameElement.value || 'Player X'}'s turn`; // Set initial player name
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
  xTurn = !xTurn;
  if (xTurn) {
    status.innerText = `${playerXNameElement.value || 'Player X'}'s turn`;
  } else {
    status.innerText = `${playerONameElement.value || 'Player O'}'s turn`;
  }
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (xTurn) {
    board.classList.add(X_CLASS);
  } else {
    board.classList.add(O_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    status.innerText = "It's a draw!";
  } else {
    const winner = xTurn ? playerXNameElement.value || 'Player X' : playerONameElement.value || 'Player O';
    status.innerText = `${winner} wins!`;
    updateScore(winner);
  }
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function updateScore(winner) {
  if (winner === (playerXNameElement.value || 'Player X')) {
    xScore++;
    playerXScoreElement.textContent = xScore;
  } else {
    oScore++;
    playerOScoreElement.textContent = oScore;
  }
}