const gameBoard = (function () {
  const board = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];
  function drawBoard() {
    const bod = document.querySelector(".board");
    for (let i = 0; i < 9; i++) {
      const spot = document.createElement("div");
      spot.classList.add("spot");
      bod.appendChild(spot);
      spot.textContent = board[i];
    }
  }
  return {
    board,
    drawBoard: drawBoard,
  };
})();

const player = (mark) => {
  const win = () => true;
  const lose = () => true;
  const play = () => {
    const spots = document.querySelectorAll(".spot");
    for (var i = 0; i < spots.length; i++) {
      spots[i].addEventListener("click", (e) => {
        e.target.textContent = mark;
      });

      //spots[i] = gameBoard.board[i];
    }
  };
  return {
    play: play,
  };
};
const player1 = player("O");

const controlFlow = (function () {
  gameBoard.drawBoard();
  player1.play();
})();
