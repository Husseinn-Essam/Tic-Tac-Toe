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
  const play = (spot, mark) => {
    if (spot.textContent == "") {
      spot.textContent = mark;
    }
  };
  return {
    mark,
    play: play,
  };
};

const controlFlow = (function () {
  function win(mark) {
    let win = false;

    if (win == true) {
      if (mark == "O") {
        console.log("Player 1 wins");
      } else if (mark == "X") {
        console.log("Player 2 wins");
      }
    }
  }

  function game() {
    gameBoard.drawBoard();
    let currentPlayer = 1;
    const spots = document.querySelectorAll(".spot");
    const player1 = player("O");
    const player2 = player("X");
    for (var i = 0; i < 9; i++) {
      spots[i].addEventListener("click", (e) => {
        if (currentPlayer == 1) {
          console.log(player1.mark);
          player1.play(e.target, player1.mark);
          gameBoard.update(spots);
          currentPlayer = 2;
          win(player1.mark);
        } else {
          console.log(player2.mark);
          player2.play(e.target, player2.mark);
          gameBoard.update(spots);
          currentPlayer = 1;
        }
      });
    }
  }
  return {
    game: game,
  };
})();

controlFlow.game();
