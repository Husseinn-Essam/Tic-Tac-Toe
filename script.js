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
  //all win conditions
  const winConditions=[[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]];
  

// win condition
  function win() {
      let win = false;
      for(let i=0;i<winConditions.length;i++){
        const winCond = winConditions[i];
        let a = gameBoard.board[winCond[0]];
        let b = gameBoard.board[winCond[1]];
        let c = gameBoard.board[winCond[2]];
        if((a==b && b==c) && a!=""){
          win=true;
          break;
        }
      }
      if(win ==true){
        console.log("win");
      }
    }
  
//game flow
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
          win();
        } else {
          console.log(player2.mark);
          player2.play(e.target, player2.mark);
          gameBoard.update(spots);
          //win(player2.mark);
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
