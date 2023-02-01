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
  const winCond=[[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],];
  //array for player with O
  let inxs=[];
  //check if two arrays are equal
  function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}
// win condition
  function win() {
    //let win = false;
    for(var i=0;i<9;i++){
      
        if(gameBoard.board[i]=="O" && !(inxs.includes(i))){
          inxs.push(i);
          for(var j =0;j<winCond.length;j++){
            if(arrayEquals(inxs,winCond[j])){
              console.log("Winner found!");
            }
          }
        }
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
