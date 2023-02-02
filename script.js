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

  const winConditions=[[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]];
  const banner= document.querySelector(".banner");
  const startGame = document.querySelector(".start");  
  let endGame=false;
  let mode= "ai";
  let bestMove;
// win condition
  function win(mark) {
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
        else if(!(gameBoard.board.includes(""))&& win==false){
          banner.textContent="Draw!";
          endGame=true;
        }
      }
      if(win ==true){
        if(mark=="O"){
          banner.textContent="Player 1 Wins!";
          endGame=true;
        }
        else{
          banner.textContent="Player 2 Wins!";
          endGame=true;
        }
      }
    }
    function minimax(){
      return 1;
    }
    // restarting the game
  function gameOver(){
    startGame.addEventListener('click',()=>{
      for(var i = 0 ;i <9;i++){
        gameBoard.board[i]="";
        document.querySelectorAll(".spot")[i].textContent="";
      }
      banner.textContent="BATTLE";
      endGame=false;
    })
  }
// game flow
  function game() {
    let currentPlayer = 1;
    const spots = document.querySelectorAll(".spot");
    const player1 = player("O");
    const player2 = player("X");
    for (var i = 0; i < 9; i++) {
      spots[i].addEventListener("click", (e) => {
        if (endGame==false){
          if (currentPlayer == 1) {
            player1.play(e.target, player1.mark);
            gameBoard.update(spots);
            win(player1.mark);
            currentPlayer = 2;
            
          } else {
            if(mode=="multi"){
              player2.play(e.target, player2.mark);
              gameBoard.update(spots);
              win(player2.mark);
              currentPlayer = 1;
            }else{
              let bestScore = -Infinity;
              
              for(var i=0 ; i<9;i++){
                if(spots[i].textContent==""){
                  gameBoard.board[i]="X";
                  let score = minimax();
                  gameBoard.board[i]="";
                  
                  if(score > bestScore ){
                    bestScore=score;
                    bestMove =i;
                  }
                }
              }
              spots[bestMove].textContent="X";
              gameBoard.update(spots)
              currentPlayer=1;
            }
           
          }
        }
      });
    }
  }
  return {
    game: game,
    gameOver:gameOver,
  };
})();
gameBoard.drawBoard();
controlFlow.game();
controlFlow.gameOver();