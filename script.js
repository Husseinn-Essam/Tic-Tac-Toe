const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
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
  const play = (spots, mark) => {
    for (var i = 0; i < 9; i++) {
      spots[i].addEventListener("click", (e) => {
        if (e.target.textContent == "") {
          e.target.textContent = mark;
          gameBoard.update(spots);
        }
      });
    }
  };
  return {
    mark,
    play: play,
  };
};

const controlFlow = (function () {
  gameBoard.drawBoard();
  let currentPlayer;
  const spots = document.querySelectorAll(".spot");
  currentPlayer = 1;
  const player1 = player("O");
  const player2 = player("X");
  for (var i = 0; i < 9; i++) {
    spots[i].addEventListener("click", () => {
      if (currentPlayer == 1) {
        console.log(player1.mark);
        //player1.play(spots, player1.mark);
        currentPlayer = 2;
      } else {
        console.log(player2.mark);
        //player2.play(spots, player2.mark);
        currentPlayer = 1;
      }
    });
  }
})();
