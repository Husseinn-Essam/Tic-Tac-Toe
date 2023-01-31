const gameBoard = (function () {
  let board = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];
  function drawBoard() {
    const bod = document.querySelector(".board");
    for (let i = 0; i < 9; i++) {
      const spot = document.createElement("div");
      spot.classList.add("spot");
      bod.appendChild(spot);
      spot.textContent = board[i];
    }
  }
  function update(spots) {
    for (var i = 0; i < spots.length; i++) {
      board[i] = spots[i].textContent;
    }
  }
  return {
    board,
    drawBoard: drawBoard,
    update: update,
  };
})();

const player = (mark) => {
  const win = () => true;
  const lose = () => true;
  const play = (spots) => {
    for (var i = 0; i < gameBoard.board.length; i++) {
      spots[i].addEventListener("click", (e) => {
        e.target.textContent = mark;
        gameBoard.update(spots);
      });
    }
  };
  return {
    play: play,
  };
};
const player1 = player("O");

const controlFlow = (function () {
  gameBoard.drawBoard();
  const spots = document.querySelectorAll(".spot");
  player1.play(spots);
})();
