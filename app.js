// Game Board
const arr = [...Array(3)].map((_) => Array(3).fill(0));
let matchGoing = true;

(function () {
  // init array of 3x3, filled with zeros

  // init players
  const player1 = player("player1", "X", true);
  const player2 = player("player2", "O", false);
  const name1 = document.getElementById("player1");
  const name2 = document.getElementById("player2");

  name1.addEventListener("input", (e) => {
    player1.setName(e.target.value);
  });

  name2.addEventListener("input", (e) => {
    player2.setName(e.target.value);
  });

  let totalMoves = 0;

  const gameboard = document.getElementById("gameboard");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const newCell = document.createElement("div");
      newCell.id = `${i}${j}`;
      newCell.style.border = "solid black 2px";
      gameboard.appendChild(newCell);

      const objCell = cellBlock(i, j, newCell);
      arr[i][j] = objCell;

      newCell.addEventListener("click", (e) => {
        if (arr[i][j].getState() === 0 && matchGoing === true) {
          player1.getTurn()
            ? player1.move(i, j, player2)
            : player2.move(i, j, player1);
          totalMoves++;
        }
        if (totalMoves >= 9 && matchGoing === true) {
          showResult("", "DRAW");
        }
      });
    }
  }
})();

function player(name, symbol, turn) {
  const moves = [];

  const getTurn = () => turn;
  const toggleTurn = () => (turn = !turn);
  const setName = (newName) => (name = newName);

  const move = (x, y, otherPlayer) => {
    moves.push(x * 3 + y);
    arr[x][y].changeState(symbol);
    toggleTurn();
    otherPlayer.toggleTurn();

    if (checkWinState(moves)) {
      showResult(name, "WIN");
    }
  };
  return { name, symbol, turn, moves, move, getTurn, toggleTurn, setName };
}

function cellBlock(i, j, nodeElement) {
  let state = 0;

  const getState = () => state;
  const changeState = (newState) => {
    state = newState;
    nodeElement.textContent = newState;
  };
  return { i, j, state, changeState, getState, nodeElement };
}

function checkWinState(moves) {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winCondition.some((condition) => {
    return condition.every((val) => moves.includes(val));
  });
}

function showResult(winner, condition) {
  const mainContainer = document.querySelector("main");
  const resultBox = document.createElement("div");
  resultBox.classList.add("result-box");

  if (condition === "DRAW") {
    resultBox.textContent = "Its a Draw";
  } else {
    resultBox.textContent = `${winner} is the Winner!`;
  }
  matchGoing = false;
  mainContainer.appendChild(resultBox);
}

const resetGame = () => location.reload();
