const cells = Array.from(document.querySelectorAll('.cell'));
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board;
let currentPlayer;
let active;

function initGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  active = true;
  statusText.textContent = `Turno de: ${currentPlayer}`;

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
  });
}

function checkWinner() {
  return wins.some(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function isDraw() {
  return board.every((value) => value !== '');
}

function handleCellClick(event) {
  const index = Number(event.currentTarget.dataset.cell);

  if (!active || board[index]) {
    return;
  }

  board[index] = currentPlayer;
  event.currentTarget.textContent = currentPlayer;
  event.currentTarget.disabled = true;

  if (checkWinner()) {
    statusText.textContent = `¡Gana ${currentPlayer}!`;
    active = false;
    cells.forEach((cell) => {
      cell.disabled = true;
    });
    return;
  }

  if (isDraw()) {
    statusText.textContent = '¡Empate!';
    active = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Turno de: ${currentPlayer}`;
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', initGame);

initGame();
